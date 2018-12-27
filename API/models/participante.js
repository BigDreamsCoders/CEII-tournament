const mongoose = require('mongoose');

var participanteSchema = mongoose.Schema({
    nick: {type: String, require:true},
    llevaControl: {type: String, require:false},
    registradoEl: {type: Date, default: Date.now},
    pagoCancelado: {type: Boolean,  default:false},
    informacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
});

module.exports = mongoose.model('Participante',participanteSchema);