
module.exports.falloAutenticacion = function(res){
    res.status(401).json({
        mensaje: "Fallo la autenticacion",
        estado: 401
    });
}
module.exports.exitoAutenticacion = function(res, token){
    res.status(200).json({
        message: "Autenticacion exitosa",
        estado: 200,
        token : token
    });
}

module.exports.permisoAutenticacion = function(res){
    res.status(401).json({
        message: "No tienes los permisos necesarios",
        estado: 401,
    });
}