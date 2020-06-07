const mongoose = require('mongoose');
// Setup schema
const eSchema = mongoose.Schema({
    idsolo: {
        type: String,
        required: true,
        unique:true
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

const eletrodo =  mongoose.model('Eletrodo', eSchema);
module.exports = eletrodo;


//module.exports.get = function (callback, limit) {
//    eletrodo.find(callback).limit(limit);
//}