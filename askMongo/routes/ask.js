exports.show = function(req, res){
  res.render('ask');
};
exports.question = function(req, res){

    console.log(req.body);
    res.render('ask');

};