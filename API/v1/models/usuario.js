const mongoose = require('mongoose');


var documentoSchema = mongoose.Schema(
    {
    documento: {type: String},
    valor: {type: String}
    },
    { _id: false });

var usuarioSchema = mongoose.Schema({
    nombre: {type: String},
    apellido: {type: String},
    identificador: [documentoSchema],
    imagenPerfil: {type: String},
    secreto: {type:String, require: false},
    correo: {
        type: String, 
        require: true, 
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/},
    rol: {type:String, deafult:"comun"},
    estadoUsuario: {type: Number, deafult:1}
});

module.exports = mongoose.model('Usuario',usuarioSchema);