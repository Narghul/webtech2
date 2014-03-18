 jQuery(function(){
            console.log("jQuery loaded");

        });

$(function() {
    FastClick.attach(document.body);
    console.log("FastClick werkt");
});

var Weather = function(){
      var skycons = new Skycons({"color": "white"});





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
        }
      else{this.x.innerHTML = "Geolocation is not supported by this browser.";}
      }
    function showPosition(position)
      {
      //this.x.innerHTML = "Latitude: " + position.coords.latitude +
      //"<br>Longitude: " + position.coords.longitude;
      huidigePositie = position;
      //console.log("huidigePositie wordt positie" + huidigePositie);
      //localstorage.setItem("pos", huidigePositie);
    doLocation();

      if(localStorage.jsonitem == null){
              doAjax();


      }else{

        var jsonResponse = localStorage.getItem("jsonitem");
                  console.log("weer is gecached");
          var locatieResponse = localStorage.getItem("locatie");
                        var nu = new Date();
          var cachedTijd = new Date(JSON.parse(jsonResponse).currently.time*1000);
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
            function doLocation(){

    var request = $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + huidigePositie.coords.latitude + ',' + huidigePositie.coords.longitude + '&sensor=true',
        //api key = &key=AIzaSyC39ss-ApCy2Pt6_VuXgjpcDOe_NW9rGJM
        type: 'GET',
        dataType: 'json',
        //data: {param1: 'value1'},
    })
    .done(function() {
        console.log("[GMaps]success");
        locatieResponse = request.responseJSON;
        //console.log(locatieResponse);
        localStorage.setItem("locatie", JSON.stringify(locatieResponse));


    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");


    });
            }
function doAjax(){

    var jqxhr = $.ajax({
        url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/' + huidigePositie.coords.latitude + ',' + huidigePositie.coords.longitude+'?units=auto',
        //url: 'https://api.forecast.io/forecast/bd57f534e65a91f03c3d1f82735e435a/37.8267,-122.423',
        type: 'GET',
        dataType: 'jsonp',
        //data: {param1: 'value1'},
    })
    .done(function() {
        console.log("success");
        jsonResponse = jqxhr.responseJSON;
        gebruikResponse(jsonResponse);
        localStorage.setItem("jsonitem", JSON.stringify(jsonResponse));


    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
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
function gebruikResponse(jsonResponse){
    var date = new Date(jsonResponse.currently.time*1000);
// hours part from the timestamp
var hours = date.getHours();
// minutes part from the timestamp
var minutes = date.getMinutes();
// seconds part from the timestamp
var seconds = date.getSeconds();


var formattedTime = hours + ':' + minutes + ':' + seconds;
    var voorspelling = jsonResponse.daily.data;
    var voorspellingDatum = [];
    for(var i = 0; i<4; i++){
        var p = unixToHuman(new Date(voorspelling[i].time));
        var d = new Date(2014, 1+p.getMonth(), p.getDate())
        voorspellingDatum.push(d);

    }
    //locatieresponse.results[0].address_components[3].long_name +
    if(localStorage.getItem("locatie") == null){

    }else{

    locatieResponse = JSON.parse(localStorage.getItem("locatie"));
    //console.log(locatieResponse["results"][4]);

    $("#locatie").append(locatieResponse["results"][4].formatted_address);
    }
    var conditie = jsonResponse.currently.icon;
    //mogelijke condities van forecast.io clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
    getIcon(conditie);
    getColor(conditie);
    $("#currentTemp").append(Math.round(jsonResponse.currently.temperature) + '°C');
            $("#beschrijving").append('<br /> ' +jsonResponse.currently.summary).append('<br />').append('<br />').append(jsonResponse.currently.windSpeed + ' km/h').append("<br />" + formattedTime + "<br />" + jsonResponse.hourly.summary);

    for(var i = 1; i<4; i++){
        $("#f"+i).append(getDagFromNumber(unixToHuman(voorspelling[i].time).getDay()) + ' ' + voorspellingDatum[i].getDate() + '/'+ voorspellingDatum[i].getMonth() +'<br />' +
voorspelling[i].temperatureMax +'</div>');

    }
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
            $( "body" ).css("background-color", "#516161");
            break;
    case "clear-night":
            $( "body" ).css("background-color", "#14142C");
            break;
    case "rain":
            $( "body" ).css("background-color", "#7F9C80");
    break;
    case "snow":
            $( "body" ).css("background-color", "#BDB88D");
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
            $( "body" ).css("background-color", "#7F9C80");
    break;
    case "partly-cloudy-day":
            $( "body" ).css("background-color", "#7F9C80");
    break;
    case "partly-cloudy-night":
            $( "body" ).css("background-color", "#7F9C80");
    break;
            default:
            $( "body" ).css("background-color", "#7F9C80");

            break;
        }
}
}

var weer = new Weather();





