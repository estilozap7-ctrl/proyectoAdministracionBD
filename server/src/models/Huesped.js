const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Huesped = sequelize.define('Huesped', {
    id_huesped: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
    },
    telefono: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    documento: {
        type: DataTypes.STRING(50),
        allowNull: true,
        unique: true,
    },
    nacionalidad: {
        type: DataTypes.STRING(80),
        allowNull: true,
    },
}, {
    tableName: 'huespedes',
    timestamps: true,
    createdAt: 'creado_en',
    updatedAt: 'actualizado_en',
});

module.exports = Huesped;
