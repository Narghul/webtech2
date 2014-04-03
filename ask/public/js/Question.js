var Question = function (vote, question, name){
    this.question = question;
    this.vote = 0;
       
}
Question.prototype.addVote= function() {
    this.vote++;
}