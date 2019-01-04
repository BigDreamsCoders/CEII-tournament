
module.exports.falloAutenticacion = function(res){
    res.status(401).json({
        mensaje: "Fallo la autenticacion",
    });
}
module.exports.exitoAutenticacion = function(res, token){
    res.status(200).json({
        token : token,
    });
}

module.exports.permisoAutenticacion = function(res){
    res.status(401).json({
        mensaje: "No tienes los credeciales para realizar la operacion",
    });
}