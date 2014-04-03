exports.showAllQuestions = function(json,res,req){
  res.render('allquestions', {vragen: json});
  console.log(json);
};