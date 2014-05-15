var client = new Faye.Client('http://localhost:3000/faye');
console.log("Moderator Connected");
client.subscribe("/question", function(message) {
    $.get("/moderate", function(data){
        //$("body").empty();
        //$("body").append(data);
        $('#questions ul').append($(data).find('li').last());
        console.log($(data).find('li'));


    });
    //$("#questions ul").append("<li><b>" + message.name + "</b><br />" + message.question+ " "+"<a href='updateQuestions' class='votes'>" + message.vote +"</a></p>");

});

$("input[type=submit]").click(function(){
    client.publish("/delete", $(this));

})
