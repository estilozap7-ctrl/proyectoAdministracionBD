const { Router } = require('express');
const {
    getAll, getById, getDisponibles, create, update, remove
} = require('../controllers/roomController');

const router = Router();

router.get('/disponibles', getDisponibles);
router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;
