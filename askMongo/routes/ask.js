var db = require('../models/db.js');

exports.show = function(req, res){
  res.render('ask');
};
exports.question = function(req, res){
    console.log(req.body.username + " : " + req.body.questiontxt);
    console.log(req.body);
    res.render('ask');

};