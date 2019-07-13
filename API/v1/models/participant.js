const mongoose = require('mongoose');


var participantSchema = mongoose.Schema({
    nickname: {type: String, require:true},
    bringsController: {type: String, require:false},
    registerAt: {type: Date, default: Date.now},
    entryFeePaid: {type: Boolean,  default:false},
    information: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Participant', participantSchema);
