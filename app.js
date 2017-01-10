var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var scorePost = require('./models/highscore.js');

var port = process.env.port || 3000;

//mongo setup
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Set up and connect to mongo database
mongoose.connect('mongodb://mazeadmin:Dmtmakeamandream1@ds039850.mlab.com:39850/mazehighscores', function (err) {
    if (err) return console.log(err);
    else {
        console.log('Connection Succesful');
    }
    //connect to server
    app.listen(port, function () {
        console.log('listening on port ' + port);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  return res.sendFile(__dirname + '/views/index.html');
});

//post handler
app.post('/submitscore', function (req, res) {
    var post = new scorePost();
    post.name = req.body.name;
    post.score = req.body.score;

    post.save(function (err) {
        if (err)
            res.send(err);
        res.send("Thanks " + req.body.name + ", your score has been submitted");
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
