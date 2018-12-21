const mongoose = require('mongoose');


var documentoSchema = mongoose.Schema(
    {
    documento: {type: String},
    valor: {type: String}
    },
    { _id: false });

var usuarioSchema = mongoose.Schema({
    nombre: {type: String, require:true},
    apellido: {type: String, require:true},
    identificador: [documentoSchema],
    imagenPerfil: {type: String, require: false},
    secreto: {type:String, require: false},
    correo: {
        type: String, 
        require: true, 
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/},
    rol: {type:String, deafult:"comun"}
});



module.exports = mongoose.model('Usuario',usuarioSchema);