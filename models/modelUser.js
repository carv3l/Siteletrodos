var mongoose = require('mongoose');
// Setup schema
var eSchema = mongoose.Schema({
    mail: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
});

var users = module.exports = mongoose.model('Users', eSchema);

module.exports.get = function (callback, limit) {
    users.find(callback).limit(limit);
}