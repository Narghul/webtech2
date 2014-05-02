
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var ask = require('./routes/ask');
var allquestions = require('./routes/allquestions');
var http = require('http');
var path = require('path');
var faye = require('faye');
var app = express();
var bayeux = new faye.NodeAdapter({mount: '/faye'});
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/ask', ask.show);
app.get('/allquestions', allquestions.show);

var questionSchema = new Schema({
  question:  String,
  name: String,
  votes:   Number,
});

var Questions = mongoose.model('Questions', questionSchema);




var server = http.createServer(app);
server.listen(app.get('port'));
bayeux.attach(server);
//mongoose.connect("mongodb://localhost/ask");

//Test to see if publishing questions works:
//bayeux.on('publish', function(clientId, channel, data) {
  // event listener logic
    //console.log(clientId + " " + channel + " " + data.question);
//})
bayeux.on('subscribe', function(clientId, channel, data) {
  // event listener logic
    console.log(clientId + " " + channel + " " + data.question);
})
