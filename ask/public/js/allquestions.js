var client = new Faye.Client('http://localhost:3000/faye');
console.log("AllQuestions_Client Connected");
var questionList=[];
client.subscribe("/question", function(message) {
   var q=new Question(message.question, message.vote, message.naam);
    console.log(message);
    var l = questionList.length;
    $("#questions").append("<div class='question' id='q" + l++ +"'>" + message.question+ " "+"<a href='#' class='votes'>"+message.vote+"</a></div><br />");
    var i = 1;
    $(".question").click(function(event){
        var currentVotes = event.currentTarget.children[0].innerHTML;
        event.currentTarget.children[0].innerHTML = String(Number(currentVotes) + 1);
    });
    questionList.push(q);
});