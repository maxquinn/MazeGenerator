var mongoose = require('mongoose');

var kogaSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'kogahighscores' });

module.exports = mongoose.model('koga', kogaSchema);