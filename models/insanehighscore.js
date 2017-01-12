var mongoose = require('mongoose');

var insaneSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'insanehighscores' });

    module.exports = mongoose.model('insane', insaneSchema);