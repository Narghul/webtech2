var db = require('../models/db.js');



exports.show = function(req, res, next){
  Questions.find(function (err, question) {

if (err) return console.log(err);
  //console.log(question);
  /*for(var i = 0; i<question.length; i++){
  console.log(question[i].name + " naam " + i);
  res.render('allquestions', {naam: question[i].name, question: question[i].question, votes: question[i].votes});

  }*/
  console.log("Questions opgevraagd");


}).sort({votes: -1}).exec(function(err, question){
    res.render('moderate', {questions: question});

  })



};
exports.delete = function(req, res){
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

})

    ).remove().exec();
          module.exports.show(req, res);

  };