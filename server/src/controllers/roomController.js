const { Habitacion } = require('../models');

// GET todas las habitaciones
const getAll = async (req, res, next) => {
    try {
        const habitaciones = await Habitacion.findAll({ order: [['numero', 'ASC']] });
        res.json(habitaciones);
    } catch (err) { next(err); }
};

// GET habitación por id
const getById = async (req, res, next) => {
    try {
        const habitacion = await Habitacion.findByPk(req.params.id);
        if (!habitacion) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
        res.json(habitacion);
    } catch (err) { next(err); }
};

// GET habitaciones disponibles
const getDisponibles = async (req, res, next) => {
    try {
        const disponibles = await Habitacion.findAll({ where: { disponible: true } });
        res.json(disponibles);
    } catch (err) { next(err); }
};

// POST crear habitación
const create = async (req, res, next) => {
    try {
        const habitacion = await Habitacion.create(req.body);
        res.status(201).json(habitacion);
    } catch (err) { next(err); }
};

// PUT actualizar habitación
const update = async (req, res, next) => {
    try {
        const [actualizado] = await Habitacion.update(req.body, {
            where: { id_habitacion: req.params.id },
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
        res.json(await Habitacion.findByPk(req.params.id));
    } catch (err) { next(err); }
};

// DELETE eliminar habitación
const remove = async (req, res, next) => {
    try {
        const eliminado = await Habitacion.destroy({ where: { id_habitacion: req.params.id } });
        if (!eliminado) return res.status(404).json({ mensaje: 'Habitación no encontrada' });
        res.json({ mensaje: 'Habitación eliminada correctamente' });
    } catch (err) { next(err); }
};

module.exports = { getAll, getById, getDisponibles, create, update, remove };
