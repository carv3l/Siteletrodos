var mongoose = require('mongoose');
// Setup schema
var eSchema = mongoose.Schema({
    espacamento: {
        type: String,
        required: true
    },
    r_medido: {
        type: String,
        required: true
    },
    r_solo: {
        type: String,
        required: true
    }
});

var medida = module.exports = mongoose.model('Medida', eSchema);

module.exports.get = function (callback, limit) {
    medida.find(callback).limit(limit);
}