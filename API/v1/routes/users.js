const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const userController = require('../controllers/users');

//Get
router.get('/', checkAuth, checkAdmin, userController.usuarios_get_personal);
router.get('/personal', checkAuth, userController.usuarios_get_personal);
//Post
router.post('/', userController.usuarios_registrar);
router.post('/login',  userController.usuarios_ingresar);
//Delete
router.delete('/:idUsuario',checkAuth, checkAdmin, userController.usuarios_delete);
//Patch
router.patch(':/idUsuario', checkAuth, checkAdmin, userController.usuarios_patch);
//TODO: PUT
router.put(':/idUsuario', checkAuth, checkAdmin, userController.usuarios_put);


module.exports = router;