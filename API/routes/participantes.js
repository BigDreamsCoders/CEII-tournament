const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const ParticipanteController = require('../controllers/participantes');

router.get('/', checkAuth, ParticipanteController.participantes_get_all);
router.get('/:idParticipante', checkAuth, ParticipanteController.participantes_get_one);
router.post('/', ParticipanteController.participantes_post_crear);
router.delete('/', checkAuth, checkAdmin, ParticipanteController.participantes_delete);
//Falta
router.patch('/:idParticipante',checkAuth,checkAdmin, ParticipanteController.participantes_patch);
router.put('/:idParticipante', checkAuth, checkAdmin, ParticipanteController.participantes_put);



module.exports = router;