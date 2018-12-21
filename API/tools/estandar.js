module.exports.errorChecker = function(res,error) { 
    console.log(error);
    res.status(500).json({
        mensaje: error.message,
        estado: 500
    }); 
} 

module.exports.nullChecker = function(res) { 
    res.status(404).json({
        mensaje: 'Element not found',
        estado: 404
    });
}

module.exports.creacionFallida = function(res){
    res.status(422).json({
        mensaje: "Creacion fallida",
        estado: 422
    });
}

module.exports.exitoQuery = function(res, texto){
    res.status(200).json({
        mensaje: texto,
        estado: 200
    });
}


