const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


const ParticipanteController = require('../controllers/participantes');

router.get('/', checkAuth, ParticipanteController.participantes_get_all);
router.get('/:participanteId', checkAuth, ParticipanteController.participantes_get_one);
router.delete('/', checkAuth, ParticipanteController.participantes_delete);

module.exports = router;