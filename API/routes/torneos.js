const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');


const TorenoController = require('../controllers/torneos');

router.get('/', checkAuth, TorenoController.torneos_get_all);

module.exports = router;