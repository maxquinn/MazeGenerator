//does not work

var mongoose = require('mongoose');

var krisSchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'krishighscores' });

var easySchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'easyhighscores' });

var mediumSchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'mediumhighscores' });

var hardSchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'hardhighscores' });

var insaneSchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'insanehighscores' });

var impossibleSchema = new mongoose.Schema({
    name: String,
    score: String
},
    { collection: 'impossiblehighscores' });

var kogaSchema = new mongoose.Schema({
        name: String,
        score: String
    },
    { collection: 'kogahighscores' });

module.exports = {
    kris : mongoose.model('kris', krisSchema),
    easy : mongoose.model('easy', easySchema),
    medium : mongoose.model('medium', mediumSchema),
    hard : mongoose.model('hard', hardSchema),
    insane : mongoose.model('insane', insaneSchema),
    impossible : mongoose.model('impossible', impossibleSchema),
    koga : mongoose.model('koga', kogaSchema)
}