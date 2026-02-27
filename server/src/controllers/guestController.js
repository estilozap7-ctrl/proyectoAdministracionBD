const { Huesped } = require('../models');

// GET todos los huéspedes
const getAll = async (req, res, next) => {
    try {
        const huespedes = await Huesped.findAll({ order: [['apellido', 'ASC']] });
        res.json(huespedes);
    } catch (err) { next(err); }
};

// GET huésped por id
const getById = async (req, res, next) => {
    try {
        const huesped = await Huesped.findByPk(req.params.id, {
            include: [{ association: 'reservaciones' }],
        });
        if (!huesped) return res.status(404).json({ mensaje: 'Huésped no encontrado' });
        res.json(huesped);
    } catch (err) { next(err); }
};

// POST crear huésped
const create = async (req, res, next) => {
    try {
        const huesped = await Huesped.create(req.body);
        res.status(201).json(huesped);
    } catch (err) { next(err); }
};

// PUT actualizar huésped
const update = async (req, res, next) => {
    try {
        const [actualizado] = await Huesped.update(req.body, {
            where: { id_huesped: req.params.id },
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'Huésped no encontrado' });
        res.json(await Huesped.findByPk(req.params.id));
    } catch (err) { next(err); }
};

// DELETE eliminar huésped
const remove = async (req, res, next) => {
    try {
        const eliminado = await Huesped.destroy({ where: { id_huesped: req.params.id } });
        if (!eliminado) return res.status(404).json({ mensaje: 'Huésped no encontrado' });
        res.json({ mensaje: 'Huésped eliminado correctamente' });
    } catch (err) { next(err); }
};

module.exports = { getAll, getById, create, update, remove };
