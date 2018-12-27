const express = require('express');
const router = express.Router();

const sitioController = require('../controllers/sitios');

router.get('/torneos', sitioController.render_torneos);
router.get('/', sitioController.render_index);


module.exports = router;