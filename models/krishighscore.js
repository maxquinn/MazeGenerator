var mongoose = require('mongoose');

var krisSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'krishighscores' });

module.exports = mongoose.model('kris', krisSchema);