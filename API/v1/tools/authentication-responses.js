
module.exports.falloAutenticacion = function(res){
    res.status(401).json({
        message: "Authentication failed",
    });
}
module.exports.exitoAutenticacion = function(res, token){
    res.status(200).json({
        token : token,
    });
}

module.exports.permisoAutenticacion = function(res){
    res.status(401).json({
        message: "You don't have the rights to do such action",
    });
}