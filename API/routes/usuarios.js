const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


const UsuariosController = require('../controllers/usuarios');

router.get('/personal', UsuariosController.usuarios_get_personal);
router.get('/registrar', UsuariosController.usuarios_registrar);
router.get('/login', UsuariosController.usuario_ingresar);


module.exports = router;