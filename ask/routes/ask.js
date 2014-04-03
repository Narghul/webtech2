
exports.show = function(req, res){
  res.render('ask');
};
exports.updateChat = function(req,res){
    res.render('ask', {messages: req});
    console.log("chat updated");
}
exports.send = function(req,res){
    //res.send(req);
    //res.render('allquestions.js');
    console.log(req.body);
}