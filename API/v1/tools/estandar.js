module.exports.errorChecker = function(res,error) { 
    console.log(error);
    res.status(500).json({
        mensaje: error.message,
    }); 
} 

module.exports.nullChecker = function(res) { 
    res.status(404).json({
        mensaje: 'Elemento no encontrado',
    });
}

module.exports.creacionFallida = function(res){
    res.status(422).json({
        mensaje: "Creacion fallida",
    });
}

module.exports.exitoQuery = function(res, texto){
    res.status(200).json({
        mensaje: texto,
    });
}


