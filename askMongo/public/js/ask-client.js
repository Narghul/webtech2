var client = new Faye.Client("http://localhost:3000/faye");
//var clients = new Db('test', new Server("127.0.0.1", 27017, {}), {w: 1});

console.log("Client connected");


$("input[type=submit]").click(function(){
    if($("input[name=question-txt]").val()==""){
        $("#error").empty();
        $("#error").append("Please fill in the question field.");
    }else{
    $("#error").empty();
    publishQuestion();
}
});
if(name===''){
    var name = window.prompt("Enter your name");
}

$("h1").append(" " + name + "!");

function publishQuestion() {
    console.log("clicked");
    var questionField = $("input[name=question-txt]").val();
    var q= new Question(0, questionField, name);
    $("input[type=hidden").val(name);
    $("input[name=question-txt]").val("");
    console.log(q);
    client.publish("/question", q);
    $("input[type=text]").focus();
};
