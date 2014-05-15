var db = require('../models/db.js');



exports.show = function(req, res, next){
  Questions.find(function (err, question) {

if (err) return handleError(err);
  //console.log(question);
  /*for(var i = 0; i<question.length; i++){
  console.log(question[i].name + " naam " + i);
  res.render('allquestions', {naam: question[i].name, question: question[i].question, votes: question[i].votes});

  }*/
  res.render('allquestions', {questions: question});
  console.log("Questions opgevraagd");


}).sort({'votes': -1})



};

exports.updateQuestions = function(req, res){

    Questions.find(function (err, question) {

if (err) return handleError(err);
  //console.log(question);
  /*for(var i = 0; i<question.length; i++){
  console.log(question[i].name + " naam " + i);
  res.render('allquestions', {naam: question[i].name, question: question[i].question, votes: question[i].votes});

  }*/
  res.render('allquestions', {questions: question});
  console.log("Update opgevraagd");


}).sort({'votes': -1})



};

exports.addVote = function(req, res){
    console.log(req.body);
    Questions.findOne({ '_id': req.body.id  },(function (err, question) {

if (err){
  console.log(err);
}
  //console.log(question);
  /*for(var i = 0; i<question.length; i++){
  console.log(question[i].name + " naam " + i);
  res.render('allquestions', {naam: question[i].name, question: question[i].question, votes: question[i].votes});

  }*/
  //console.log(question.votes);
  //res.render('allquestions', {questions: question});
  console.log("Update opgevraagd");
  question.votes++;
  question.save(function (err, vraag) {
    if (err) return console.error(err);
    });
  console.log(question.votes);



})

    )
          module.exports.updateQuestions(req, res);

  };

