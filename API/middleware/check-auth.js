const jwt = require('jsonwebtoken');
const autenticacion = require('../tools/autenticacion');
//Verify the token and request data from it
module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,"secret_13asAZ32S",null);
        req.userData = decoded;
        next();
    }catch(error){
        autenticacion.falloAutenticacion(res,error);
    }
};