const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const express = require('express');
const app = express();

//Conexion a la base datos
mongoose.connect(
    'mongodb://shop-user:5MEGjBgDulqbVW8Z@storedatabase-shard-00-00-o0sy6.mongodb.net:27017,storedatabase-shard-00-01-o0sy6.mongodb.net:27017,storedatabase-shard-00-02-o0sy6.mongodb.net:27017/test?ssl=true&replicaSet=StoreDatabase-shard-0&authSource=admin&retryWrites=true', {
      useNewUrlParser: true 
 });


//Rutas para la API
const usuarioRoutes = require('./API/routes/usuarios');
const participanteRoutes = require('./API/routes/participantes');
const torneoRoutes = require('./API/routes/torneos');

//Rutas para la pagina
const paginaRoutes = require('./site/routes/sitio');


/* Caminos habilitados */
// Todos los archivos en views unido
app.set('views', path.join(__dirname, 'site/views'));
// Carpeta publica habilitada
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'pug');
  
//Ayuda a comentar que tipo de request se esta realizando
app.use(morgan('dev'));

//Acepta cuerpos de url simple
app.use(bodyParser.urlencoded({extended: false}));
//Lee jsons
app.use(bodyParser.json());

//Para evitar problemas de CORS
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET' 
        );
        return res.status(200).json({});
    }
    next();
});

//Rutas para la API
app.use('/API/usuarios', usuarioRoutes);
app.use('/API/participantes', participanteRoutes);
app.use('/API/torneos', torneoRoutes);

//Rutas para la pagina
app.use('/', paginaRoutes);

//Si nada se encuentra se corre
app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

//En caso que nada se encuentre
app.use((error, req,res,next)=>{
    res.status(error.status  || 500);
    res.json({
        mensaje: error.message,
        estado: error.status 
    });
});


module.exports = app;