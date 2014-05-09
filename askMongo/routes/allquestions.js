var db = require('../models/db.js');

exports.show = function(req, res){
  Questions.findOne({ 'name': 'Jacky' }, function (err, question) {

if (err) return handleError(err);
  console.log(question.name, question.votes, question.question)
  res.render('allquestions', {name: question.name, question: question.question, votes: question.votes});

})

};