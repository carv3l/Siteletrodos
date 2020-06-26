var mongoose = require('mongoose');
// Setup schema
var eSchema = mongoose.Schema({
    idsolo: {
        type: String,
        required: true
    },
    solo: {
        type: String,
        required: true
    },
    resistividade: {
        type: String,
        required: true
    },
    coordenadas: {
        type: String,
        required: false
    }
});

var eletrodo = module.exports = mongoose.model('Eletrodo', eSchema);

module.exports.get = function (callback, limit) {
    eletrodo.find(callback).limit(limit);
}