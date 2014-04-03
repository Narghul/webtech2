var client = new Faye.Client("http://localhost:3000/faye");
console.log("Client connected");

$("input[type=submit]").click(publishQuestion);

function publishQuestion() {
    console.log("clicked");
    var questionField = $("input[name=question-txt]").val();
    var q= new Question(0, questionField);
    $("input[name=question-txt]").val("");
    console.log(q);
    client.publish("/question", q);
};
