const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const participantController = require('../controllers/participants');

router.get('/', checkAuth, participantController.participantes_get_all);
router.get('/:idParticipante', checkAuth, participantController.participantes_get_one);
router.post('/', participantController.participantes_post_crear);
router.delete('/', checkAuth, checkAdmin, participantController.participantes_delete);
router.patch('/:idParticipante',checkAuth,checkAdmin, participantController.participantes_patch);
//TODO
router.put('/:idParticipante', checkAuth, checkAdmin, participantController.participantes_put);


module.exports = router;