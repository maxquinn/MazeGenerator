var mongoose = require('mongoose');

var mediumSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'mediumhighscores' });

module.exports = mongoose.model('medium', mediumSchema);