const { Router } = require('express');
const reservationsRouter = require('./reservations');
const guestsRouter = require('./guests');
const roomsRouter = require('./rooms');

const router = Router();

// Health-check
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Resource routes
router.use('/reservaciones', reservationsRouter);
router.use('/huespedes', guestsRouter);
router.use('/habitaciones', roomsRouter);

module.exports = router;
