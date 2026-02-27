const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/index');

const app = express();

// ── Middlewares ──────────────────────────────────────────────
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ── Routes ───────────────────────────────────────────────────
app.use('/api', router);

// ── 404 Handler ──────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// ── Error Handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        mensaje: err.message || 'Error interno del servidor',
    });
});

module.exports = app;
