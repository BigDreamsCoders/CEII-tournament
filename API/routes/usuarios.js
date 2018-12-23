const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


const UsuariosController = require('../controllers/usuarios');

router.get('/personal', checkAuth, UsuariosController.usuarios_get_personal);
router.post('/registrar',checkAuth, checkAdmin, UsuariosController.usuarios_registrar);
router.post('/login', checkAuth, checkAdmin, UsuariosController.usuarios_ingresar);
router.delete('/:idUsuario',checkAuth, checkAdmin, UsuariosController.usuarios_borrar);

module.exports = router;