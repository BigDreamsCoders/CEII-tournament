const mongoose = require('mongoose');

var tournamentSchema = mongoose.Schema({
    documento: {type: String, require:true},
    valor: {type: String, require:false}
});

module.exports = mongoose.model('Identificador',tournamentSchema);