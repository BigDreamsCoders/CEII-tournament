const mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    nombre: {type: String, require:true},
    apellido: {type: String, require:true},
    identificador: {type: Map, of: String, require:true},
    imagenPerfil: {type: String, require: false}
});

module.exports = mongoose.model('Usuario',tournamentSchema);