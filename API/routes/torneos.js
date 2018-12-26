const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const multer = require('multer');

//Opciones de multer
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file, cb){
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb)=>{
    //No aceptar formatos que no sean estos
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        const error = new Error('No accepted image type');
        error.status = 500;
        cb(error, false);
    }
};
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    }
    ,fileFilter: fileFilter
});

const TorenoController = require('../controllers/torneos');

router.get('/', checkAuth, TorenoController.torneos_get_all);
router.get('/:idTorneo',checkAuth,TorenoController.torneos_get_one);
router.post('/', checkAuth, checkAdmin, upload.single('imagenTorneo'),TorenoController.torneos_post_crear);
router.delete('/:idTorneo', checkAuth, checkAdmin, TorenoController.torneos_delete)

module.exports = router;