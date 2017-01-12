var mongoose = require('mongoose');

var hardSchema = new mongoose.Schema({
    name: String,
    score: Number
},
    { collection: 'hardhighscores' });

    module.exports = mongoose.model('hard', hardSchema);