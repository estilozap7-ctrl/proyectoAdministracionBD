const Huesped = require('./Huesped');
const Habitacion = require('./Habitacion');
const Reservacion = require('./Reservacion');

// ── Huésped tiene muchas Reservaciones ───────────────────────
Huesped.hasMany(Reservacion, { foreignKey: 'id_huesped', as: 'reservaciones' });
Reservacion.belongsTo(Huesped, { foreignKey: 'id_huesped', as: 'huesped' });

// ── Habitación tiene muchas Reservaciones ─────────────────────
Habitacion.hasMany(Reservacion, { foreignKey: 'id_habitacion', as: 'reservaciones' });
Reservacion.belongsTo(Habitacion, { foreignKey: 'id_habitacion', as: 'habitacion' });

module.exports = { Huesped, Habitacion, Reservacion };
