const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const UsuarioController = require('../controllers/usuarios');

//Get
router.get('/', checkAuth, checkAdmin, UsuarioController.usuarios_get_personal);
router.get('/personal', checkAuth, UsuarioController.usuarios_get_personal);
//Post
router.post('/', UsuarioController.usuarios_registrar);
router.post('/login',  UsuarioController.usuarios_ingresar);
//Delete
router.delete('/:idUsuario',checkAuth, checkAdmin, UsuarioController.usuarios_delete);
//Patch
router.patch(':/idUsuario', checkAuth, checkAdmin, UsuarioController.usuarios_patch);
//TODO: PUT
router.put(':/idUsuario', checkAuth, checkAdmin, UsuarioController.usuarios_put);


module.exports = router;