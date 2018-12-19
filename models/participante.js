const mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    nick: {type: String, require:true},
    control: {type: String, require:false},
    registradoEl: {type: Date, default: Date.now},
    pagoCancelado: {type: boolean,  default:false},
    informacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
});

module.exports = mongoose.model('Participante',tournamentSchema);