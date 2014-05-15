var client = new Faye.Client('http://localhost:3000/faye');
console.log("AllQuestions_Client Connected");
var questionList=[];
client.subscribe("/question", function(message) {
   var q=new Question(message.question, message.vote, message.naam);
    console.log(message);
    var l = questionList.length;
    $("#questions ul").append("<li class='question' id='q" + l++ +"'><b>" + message.name + "</b><br />" + message.question+ " "+"<a href='addVote' class='votes' data-votes='" + message.vote +"'>" + message.vote +"</a></p>");
    var i = 1;
    $(".question").click(function(event){

        event.stopPropagation();
        event.cancelBubble = true;
        //var currentVotes = parseInt(event.currentTarget.children[0].innerHTML);
        var currentVotes = event.currentTarget.children[0].innerHTML;
        //console.log(event.currentTarget.children[0].innerHTML + " inner HTML");
        //var currentVotes = Number($(this).find(".votes").first().text());
        //var currentVotes = Number($(this).find(".votes").first().data("votes"));
        var newVotes = Number($(this).find(".votes").first().data("votes", currentVotes+1));
        //$(this).find(".votes").first().text(String(newVotes));
        //console.log($(this).find(".votes").first().data("votes"));
        console.log($(this).first().text());
        //console.log(newVotes + " new votes");
        //console.log(currentVotes + " currentvotes");
        return false;
    });

    //console.log(questionList);
});

//todo
//1. Make it responsive
//2. Use SCSS
//3. Fix voting system