const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Habitacion = sequelize.define('Habitacion', {
    id_habitacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    numero: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
    },
    tipo: {
        type: DataTypes.ENUM('individual', 'doble', 'suite', 'penthouse'),
        allowNull: false,
        defaultValue: 'individual',
    },
    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
    },
    precio_noche: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    piso: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    disponible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'habitaciones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
});

module.exports = Habitacion;
