const mongoose = require('mongoose');

var torneoSchema = mongoose.Schema({
    nombre: {type: String, require:true},
    facultad: {type: String, require:true},
    creadoEl: {type: Date, default: Date.now},
    fecha: {type: Date, require:true},
    lugar: {type: Map, of: String, require:true},
    entrada: {type:Number, require:true},
    cupo:{type:Number,require:true},
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participante'}],
    imagenTorneo: {type: String, require: true}
});


module.exports = mongoose.model('Torneo',torneoSchema);