const { Reservacion, Huesped, Habitacion } = require('../models');

// GET todas las reservaciones
const getAll = async (req, res, next) => {
    try {
        const reservaciones = await Reservacion.findAll({
            include: [
                { model: Huesped, as: 'huesped' },
                { model: Habitacion, as: 'habitacion' },
            ],
            order: [['fecha_entrada', 'DESC']],
        });
        res.json(reservaciones);
    } catch (err) { next(err); }
};

// GET por id
const getById = async (req, res, next) => {
    try {
        const reservacion = await Reservacion.findByPk(req.params.id, {
            include: [
                { model: Huesped, as: 'huesped' },
                { model: Habitacion, as: 'habitacion' },
            ],
        });
        if (!reservacion) return res.status(404).json({ mensaje: 'Reservación no encontrada' });
        res.json(reservacion);
    } catch (err) { next(err); }
};

// POST crear reservación
const create = async (req, res, next) => {
    try {
        const { huesped, ...reservacionData } = req.body;

        // Si viene información del huésped, lo buscamos por email o lo creamos
        let huespedId = reservacionData.id_huesped;

        if (huesped && huesped.email) {
            const [huespedRecord] = await Huesped.findOrCreate({
                where: { email: huesped.email },
                defaults: huesped
            });
            huespedId = huespedRecord.id_huesped;
        }

        if (!huespedId) {
            return res.status(400).json({ mensaje: 'Se requiere un huésped para la reservación' });
        }

        const reservacion = await Reservacion.create({
            ...reservacionData,
            id_huesped: huespedId
        });

        // Retornar la reservación completa con sus asociaciones
        const fullReservacion = await Reservacion.findByPk(reservacion.id_reservacion, {
            include: [
                { model: Huesped, as: 'huesped' },
                { model: Habitacion, as: 'habitacion' },
            ]
        });

        res.status(201).json(fullReservacion);
    } catch (err) { next(err); }
};

// PUT actualizar reservación
const update = async (req, res, next) => {
    try {
        const { huesped, ...reservacionData } = req.body;

        const reservacion = await Reservacion.findByPk(req.params.id);
        if (!reservacion) return res.status(404).json({ mensaje: 'Reservación no encontrada' });

        // Actualizar reservación
        await reservacion.update(reservacionData);

        // Si viene información del huésped, actualizarlo también
        if (huesped && reservacion.id_huesped) {
            await Huesped.update(huesped, {
                where: { id_huesped: reservacion.id_huesped }
            });
        }

        const updatedReservacion = await Reservacion.findByPk(req.params.id, {
            include: [
                { model: Huesped, as: 'huesped' },
                { model: Habitacion, as: 'habitacion' },
            ]
        });

        res.json(updatedReservacion);
    } catch (err) { next(err); }
};

// DELETE eliminar reservación
const remove = async (req, res, next) => {
    try {
        const eliminado = await Reservacion.destroy({ where: { id_reservacion: req.params.id } });
        if (!eliminado) return res.status(404).json({ mensaje: 'Reservación no encontrada' });
        res.json({ mensaje: 'Reservación eliminada correctamente' });
    } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
