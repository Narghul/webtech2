
            jQuery(function(){
            console.log("jQuery loaded");


        });
  var skycons = new Skycons({"color": "white"});

$(function() {
    FastClick.attach(document.body);
    console.log("FastClick werkt");
});

    var huidigePositie = '';
    var jsonResponse = '';
    var locatieResponse = '';

    function unixToHuman(tijd){
        var cachedTijd = new Date(tijd*1000);
        return cachedTijd;

    }

    function getLocation()
      {
      if (navigator.geolocation)
        {
        navigator.geolocation.getCurrentPosition(showPosition, error);
        console.log("logo");
        }
      else{this.x.innerHTML = "Geolocation is not supported by this browser.";}
      }
    function showPosition(position)
      {
      huidigePositie = position;
      if(localStorage.jsonitem == null){
              doAjax();


      }else{

        var jsonResponse = localStorage.getItem("jsonitem");
                  console.log("weer is gecached");
          var locatieResponse = localStorage.getItem("locatie");
                        var nu = new Date();
          var cachedTijd = new Date(JSON.parse(jsonResponse).currently.time*1000);

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

              doAjax();

          }else{
              console.log("Geen weerupdate nodig");

            gebruikResponse(JSON.parse(jsonResponse));



          }



  }
      }

      function error(){
        console.log("error met het vinden van locatie")
      }
      getLocation();

function doAjax() {

    var jqxhr = $.ajax({
        url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/' + huidigePositie.coords.latitude + ',' + huidigePositie.coords.longitude + '?units=auto',
        //url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/37.8267,-122.423',

        type: 'GET',
        global: true,
        dataType: 'jsonp',
    })




        //data: {param1: 'value1'},
        .done(function () {

            console.log("success");
            jsonResponse = jqxhr.responseJSON;
            gebruikResponse(jsonResponse);
            localStorage.setItem("jsonitem", JSON.stringify(jsonResponse));


        })
            .fail(function () {
            console.log("error");
        })
            .always(function () {
            console.log("complete");




            });






    }

function getDagFromNumber(dag){
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
function getMotivation(summary){


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
function gebruikResponse(jsonResponse){
    var date = new Date(jsonResponse.currently.time*1000);
// hours part from the timestamp
var hours = date.getHours();
// minutes part from the timestamp
var minutes = date.getMinutes();
// seconds part from the timestamp
var seconds = date.getSeconds();


var formattedTime = hours + ':' + minutes + ':' + seconds;

    //locatieresponse.results[0].address_components[3].long_name +

    var conditie = jsonResponse.currently.icon;
    //mogelijke condities van forecast.io clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
    getIcon(conditie);
    getColor(conditie);
    $("#currentTemp").append(Math.round(jsonResponse.currently.temperature) + '°C');

    getMotivation(conditie);


    $("#forecast").append('<div class="dummy"></div>');


    //console.log(getDagFromNumber(unixToHuman(voorspelling[0].time).getDay()));




}



function getIcon(cond){
    switch(cond){
     case "clear-day":
skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
break;
    case "clear-night":
skycons.add(document.getElementById("links"), Skycons.CLEAR_NIGHT);
break;
    case "rain":
skycons.add(document.getElementById("links"), Skycons.RAIN);
break;
    case "snow":
skycons.add(document.getElementById("links"), Skycons.SNOW);
break;
    case "sleet":
skycons.add(document.getElementById("links"), Skycons.SLEET);
break;
    case "wind":
skycons.add(document.getElementById("links"), Skycons.WIND);
break;
    case "fog":
skycons.add(document.getElementById("links"), Skycons.FOG);
break;
    case "cloudy":
    skycons.add(document.getElementById("links"), Skycons.CLOUDY);
      break;
    case "partly-cloudy-day":
      skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_DAY);
            //skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

    //$( "#links" ).css('background-image', 'url("images/partly-cloudy-day.png")').css("width", "200px").css("height", "200px");
    break;
    case "partly-cloudy-night":
    skycons.add(document.getElementById("links"), Skycons.PARTLY_CLOUDY_NIGHT);

    break;
            default:
skycons.add(document.getElementById("links"), Skycons.CLEAR_DAY);
      break;
            break;

    }
          skycons.play();

}
function getColor(bg){
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




