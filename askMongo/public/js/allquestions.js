var client = new Faye.Client('http://localhost:3000/faye');
console.log("AllQuestions_Client Connected");
var questionList = [];
client.subscribe("/question", function(message) {
   var q=new Question(message.question, message.vote, message.naam);
    console.log(message);
    questionList.push(q);
    var l = questionList.length;
    $.get("/updatequestions", function(data){
        //$("body").empty();
        //$("body").append(data);
        $('#questions ul').append($(data).find('li').last());
        console.log($(data).find('li').last());
        $("li").click(function(){
        unbindAndClick($(this));
        });

    });
    //$("#questions ul").append("<li><b>" + message.name + "</b><br />" + message.question+ " "+"<a href='updateQuestions' class='votes'>" + message.vote +"</a></p>");

});
$("li").click(function(){
    unbindAndClick($(this));
});
/*$("li").click(function(){
        $(this).css("background-color", "#1abc9c");
        $(this).unbind( "click" );

});*/

function unbindAndClick(target){
    target.css("background-color", "#1abc9c");
    target.unbind( "click" );
}

//todo
//1. Make it responsive
//2. Use SCSS
//3. Fix voting system