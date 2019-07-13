module.exports.errorChecker = function(res,error) { 
    console.log(error);
    res.status(500).json({
        message: error.message,
    }); 
} 

module.exports.nullChecker = function(res) { 
    res.status(404).json({
        message: 'Element not found',
    });
}

module.exports.creacionFallida = function(res){
    res.status(422).json({
        message: "Element creation failed",
    });
}

module.exports.exitoQuery = function(res, texto){
    res.status(200).json({
        message: texto,
    });
}


