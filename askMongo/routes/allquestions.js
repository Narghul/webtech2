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


})



};

exports.updateQuestions = function(req, res){

    console.log(req.body);



};