var mongoose = require('mongoose');

var highscoreSchema = new mongoose.Schema({
    name: String,
    score: String
},
    {collection : 'highscores'});

module.exports = mongoose.model('Score', highscoreSchema);