var mongoose = require('mongoose');

var easySchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'easyhighscores' });

module.exports = mongoose.model('easy', easySchema);