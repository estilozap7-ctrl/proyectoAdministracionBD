const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Reservacion = sequelize.define('Reservacion', {
    id_reservacion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_huesped: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_entrada: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_salida: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activa', 'cancelada', 'completada'),
        allowNull: false,
        defaultValue: 'activa',
    },
    precio_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    notas: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'reservaciones',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
});

module.exports = Reservacion;
