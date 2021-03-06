//Checks if the user has the rights for an action
const autenticacion = require('../tools/authentication-responses');

module.exports = (req,res,next) =>{
    if(req.userData.rol === "admin"){
        next();
    }
    else{
        autenticacion.permisoAutenticacion(res);
    }
};