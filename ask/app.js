
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
var bayeux = new faye.NodeAdapter({mount: '/'});
var client = new faye.Client('http://localhost:3000');
var browserlogger = require('browser-logger');
var vragen = [];

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
app.use(browserlogger);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/ask', ask.show);
app.get('/allquestions', allquestions.showAllQuestions);
client.subscribe('/question', ask.updateChat);
app.post('/send', function(req,res){
    vragen.push(req.body.vraag);
    //res.send({questions: vragen});
    allquestions.showAllQuestions(vragen);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
bayeux.attach(app);
