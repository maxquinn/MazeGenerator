var mongoose = require('mongoose');

var impossibleSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'impossiblehighscores' });

module.exports = mongoose.model('impossible', impossibleSchema);