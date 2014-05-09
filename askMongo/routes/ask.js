var db = require('../models/db.js');

exports.show = function(req, res){
  res.render('ask');
};
exports.question = function(req, res){
    var vraag = new Questions({ name: req.body.username, question: req.body.questiontxt, votes: 0 });
    //console.log(req.body.username + " : " + req.body.questiontxt);
    //console.log(req.body);
    vraag.save(function (err, vraag) {
    if (err) return console.error(err);
    });

    res.render('ask');

};