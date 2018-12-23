const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Handlers
const usuarioRoutes = require('./API/routes/usuarios');
const participanteRoutes = require('./API/routes/participantes');
const torneoRoutes = require('./API/routes/torneos');

//Database connection
mongoose.connect(
   'mongodb://shop-user:5MEGjBgDulqbVW8Z@storedatabase-shard-00-00-o0sy6.mongodb.net:27017,storedatabase-shard-00-01-o0sy6.mongodb.net:27017,storedatabase-shard-00-02-o0sy6.mongodb.net:27017/test?ssl=true&replicaSet=StoreDatabase-shard-0&authSource=admin&retryWrites=true', {
     useNewUrlParser: true 
});

  
//Comments for GET POST and other
app.use(morgan('dev'));
//Public file uploads
app.use('/uploads',express.static('uploads'));
//Simple url bodies
app.use(bodyParser.urlencoded({extended: false}));
//Read json
app.use(bodyParser.json());

//Avoid CORS
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

//Routes that handle requests
app.use('/API/usuarios', usuarioRoutes);
app.use('/API/participantes', participanteRoutes);
app.use('/API/torneos', torneoRoutes);


//Error catching
app.use((req,res,next)=> {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req,res,next)=>{
    res.status(error.status  || 500);
    res.json({
        mensaje: error.message,
        estado: error.status 
    });
});


module.exports = app;