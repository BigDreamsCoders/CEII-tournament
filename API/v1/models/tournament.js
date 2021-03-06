const mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    nombre: {type: String, require:true},
    facultad: {type: String, require:true},
    creadoEl: {type: Date, default: Date.now},
    fechaEvento: {type: Date, require:true},
    lugarEvento: {type: String, require:true},
    precioEntrada: {type:Number, require:true},
    cupoEvento:{type:Number,require:true},
    participantes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant'}],
    creadorPost:{ type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    imagenTorneo: {type: String, require: true}
});

module.exports = mongoose.model('Tournament',tournamentSchema);

