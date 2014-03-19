 jQuery(function(){
            console.log("jQuery loaded");

        });

$(function() {
    FastClick.attach(document.body);
    console.log("FastClick werkt");
});

var Weather = function(){
    //var skycons = new Skycons({"color": "white"});
    var huidigePositie = '';
    var jsonResponse = '';
    var locatieResponse = '';

    
}
Weather.prototype.skycons = new Skycons({"color": "white"});

Weather.prototype.unixToHuman = function(tijd){
        var cachedTijd = new Date(tijd*1000);
        return cachedTijd;

}
Weather.prototype.getDagFromNumber = function(dag){
    switch(dag){
            case 1:
                return "Mon";
            break;
            case 2:
                return "Tue";
            break;
            case 3:
                return "Wed";
            break;
            case 4:
                return "Thu";
            break;
            case 5:
                return "Fri";
            break;
            case 6:
                return "Sat";
            break;
            case 7:
                return "Sun";
            break;
}
}

Weather.prototype.doAjax = function(huidigePositie){
    console.log("doAjax "+Weather.prototype.huidigePositie);

    var jqxhr = $.ajax({
        url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/' + Weather.prototype.huidigePositie.coords.latitude + ',' + Weather.prototype.huidigePositie.coords.longitude+'?units=auto',
        //url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/37.8267,-122.423',
        type: 'GET',
        dataType: 'jsonp',
        //data: {param1: 'value1'},
    })
    .done(function() {
        console.log("success");
        Weather.prototype.jsonResponse = jqxhr.responseJSON;
        Weather.prototype.gebruikResponse();
        localStorage.setItem("jsonitem", JSON.stringify(Weather.prototype.jsonResponse));


    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");


    });


}
Weather.prototype.getLocation = function(){
      if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(showPosition, error);
        }else{
            this.x.innerHTML = "Geolocation is not supported by this browser.";
        }

      function error(){
        console.log("error met het vinden van locatie")
      }
      function showPosition(position){
      if(position != null){
            Weather.prototype.huidigePositie = position;

      }
      
        console.log(Weather.prototype.huidigePositie);
      if(localStorage.jsonitem == null){
        Weather.prototype.doAjax(Weather.prototype.huidigePositie);
      }else{
        console.log(Weather.prototype.jsonResponse);
        Weather.prototype.jsonResponse = JSON.parse(localStorage.getItem("jsonitem"));
                  console.log("weer is gecached");
                        var nu = new Date();
          var cachedTijd = new Date(Weather.prototype.jsonResponse.currently.time*1000);
         // console.log(cachedTijd + "cached tijd");

          var t1 = new Date(0, 0, 0, cachedTijd.getHours(), cachedTijd.getMinutes(), 0, 0);
          var t2 = new Date(0, 0, 0, nu.getHours(), nu.getMinutes(), 0, 0);
            var dif = t2.getTime() - t1.getTime();

            var Seconds_from_T1_to_T2 = dif / 1000;
            var Seconds_Between_Dates = Math.abs(Seconds_from_T1_to_T2);

         if( Seconds_Between_Dates >= 3600){
                console.log("weer update nodig");
              var nu = new Date().getTime();
              //console.log(nu);
              //console.log(JSON.parse(jsonResponse).currently.time);
             Weather.prototype.doAjax(Weather.prototype.huidigePositie);
             Weather.prototype.doLocation();
          }else{
              console.log("Geen weerupdate nodig");
            Weather.prototype.gebruikResponse(Weather.prototype.jsonResponse);



          }

  }
      }
}
Weather.prototype.gebruikResponse = function(){
   // console.log(Weather.prototype.jsonResponse.currently.time);
    var date = new Date(Weather.prototype.jsonResponse.currently.time*1000);
// hours part from the timestamp
var hours = date.getHours();
// minutes part from the timestamp
var minutes = date.getMinutes();
// seconds part from the timestamp
var seconds = date.getSeconds();


var formattedTime = hours + ':' + minutes + ':' + seconds;
    var voorspelling = Weather.prototype.jsonResponse.daily.data;
    var voorspellingDatum = [];
    for(var i = 0; i<4; i++){
        var p = this.unixToHuman(new Date(voorspelling[i].time));
        var d = new Date(2014, 1+p.getMonth(), p.getDate())
        voorspellingDatum.push(d);

    }
    
    var conditie = Weather.prototype.jsonResponse.currently.icon;
    //mogelijke condities van forecast.io clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
    Weather.prototype.getIcon(conditie);
    Weather.prototype.getColor(conditie);
    Weather.prototype.getMotivation(conditie);
    $("#currentTemp").append(Math.round(Weather.prototype.jsonResponse.currently.temperature) + '°C');


}
Weather.prototype.getIcon = function(cond){
    switch(cond){
     case "clear-day":
this.skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
break;
    case "clear-night":
this.skycons.add(document.getElementById("links"), Skycons.CLEAR_NIGHT);
break;
    case "rain":
this.skycons.add(document.getElementById("links"), Skycons.RAIN);
break;
    case "snow":
this.skycons.add(document.getElementById("links"), Skycons.SNOW);
break;
    case "sleet":
this.skycons.add(document.getElementById("links"), Skycons.SLEET);
break;
    case "wind":
this.skycons.add(document.getElementById("links"), Skycons.WIND);
break;
    case "fog":
this.skycons.add(document.getElementById("links"), Skycons.FOG);
break;
    case "cloudy":
    this.skycons.add(document.getElementById("links"), Skycons.CLOUDY);
      break;
    case "partly-cloudy-day":
      this.skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_DAY);
            //skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

    //$( "#links" ).css('background-image', 'url("images/partly-cloudy-day.png")').css("width", "200px").css("height", "200px");
    break;
    case "partly-cloudy-night":
    this.skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_NIGHT);

    break;
            default:
this.skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
      break;
            break;

    }
          this.skycons.play();

}
Weather.prototype.getColor = function getColor(bg){
    switch(bg){
     case "clear-day":
            $( "body" ).css("background-color", "#FF6E07");

            break;
    case "clear-night":
            $( "body" ).css("background-color", "#14142C");
            break;
    case "rain":
            $( "body" ).css("background-color", "#F507DE");
    break;
    case "snow":
            $( "body" ).css("background-color", "#F507DE");
    break;
    case "sleet":
            $( "body" ).css("background-color", "#798D75");
    break;
    case "wind":
            $( "body" ).css("background-color", "#C88D77");
    break;
    case "fog":
            $( "body" ).css("background-color", "#aab5a8");
    break;
    case "cloudy":
            $( "body" ).css("background-color", "#FF6E07");
    break;
    case "partly-cloudy-day":
            $( "body" ).css("background-color", "#FF6E07");
    break;
    case "partly-cloudy-night":
            $( "body" ).css("background-color", "#7F9C80");
    break;
            default:
            $( "body" ).css("background-color", "#FF6E07");

            break;
        }
}
Weather.prototype.getMotivation = function(summary){


switch(summary){

    case "clear-day":
                $("#motivation").append('Schoon weer, kom maar af om een ter<span class="orange">appke</span> te doen');

            break;
    case "clear-night":
                $("#motivation").append("Wij zijn aan het slapen maar kom gerust langs met een tent!");

            break;
    case "rain":
        $("#motivation").append("Zonder paraplu wordt het een koude douche!");

    break;
    case "snow":
        $("#motivation").append("Geen ijskast nodig!");

    break;
    case "sleet":
        $("#motivation").append('Te vuil weer voor een ter<span class="orange">appke</span>!');
    break;
    case "wind":
    $("#motivation").append("Frisjes, draag een jas!");
    break;
    case "fog":
    $("#motivation").append("Mistig, laat je mail achter en we spreken wel een andere keertje af!");
    break;
    case "cloudy":
    $("#motivation").append("Het ziet er wat bewolkt uit, neem een paraplu mee!");
    break;
    case "partly-cloudy-day":
    $("#motivation").append('Ik zie wat wolkjes maar geen stress, een ter<span class="orange">appke</span>!');
    break;
    case "partly-cloudy-night":
                $("#motivation").append("Wij liggen in ons bed!");
    break;
            default:
                $("#motivation").append("Kom maar af!");

            break;
}
}


var weer = new Weather();
weer.getLocation();







