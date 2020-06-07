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
        type: Strinh,
        required: false
    }
});
// Export Produto model
const eletrodo = module.exports = mongoose.model('Eletrodo', eSchema);

//module.exports.get = function (callback, limit) {
 //   Produto.find(callback).limit(limit);
//}