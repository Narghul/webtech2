var client = new Faye.Client('http://localhost:3000/faye');
console.log("AllQuestions_Client Connected");
var questionList=[];
var Question = function (vote, question){
    this.question = question;
    this.vote = 0;
       
}
Question.prototype.addVote= function() {
    this.vote++;
}
client.subscribe("/question", function(message) {
    q=new Question(message.question, message.vote);
    console.log(message);
    
    $("#questions").append(message.question+ " "+"<a href='#' class='votes'>"+message.vote+"</a><br />");
});