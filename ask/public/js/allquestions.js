var client = new Faye.Client('http://localhost:3000/faye');
console.log("AllQuestions_Client Connected");
var questionList=[];
console.log(client);
var Question = function (vote, question){
    this.question = question;
    this.vote = 0;
       
}
Question.prototype.addVote= function() {
    this.vote++;
}
client.subscribe("/question", function(message) {
    console.log('Got a message: '+message.answered);
    q=new Question(message.question, message.vote);
    console.log(message);
    
    $("#questions").append(message.question+"<a href='#' class='votes' data-id='"+questionList.length+"'>"+message.vote+"</a><br />");
});