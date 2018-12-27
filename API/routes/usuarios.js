const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


const UsuarioController = require('../controllers/usuarios');

router.get('/personal', checkAuth, UsuarioController.usuarios_get_personal);
router.post('/registrar', UsuarioController.usuarios_registrar);
router.post('/login',  UsuarioController.usuarios_ingresar);
router.delete('/:idUsuario',checkAuth, checkAdmin, UsuarioController.usuarios_borrar);

module.exports = router;