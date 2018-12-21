const mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    nombre: {type: String, require:true},
    apellido: {type: String, require:true},
    identificador: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Identificador'}],
    imagenPerfil: {type: String, require: false},
    secreto: {type:String},
    correo: {
        type: String, 
        require: true, 
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/},
    rol: {type:String, deafult:"comun"}
});

module.exports = mongoose.model('Usuario',tournamentSchema);