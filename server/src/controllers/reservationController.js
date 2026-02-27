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
        const reservacion = await Reservacion.create(req.body);
        res.status(201).json(reservacion);
    } catch (err) { next(err); }
};

// PUT actualizar reservación
const update = async (req, res, next) => {
    try {
        const [actualizado] = await Reservacion.update(req.body, {
            where: { id_reservacion: req.params.id },
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Reservación no encontrada' });
        res.json(await Reservacion.findByPk(req.params.id));
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
