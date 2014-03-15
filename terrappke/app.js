jQuery(function(){
            console.log("jQuery loaded");

        });

var Weather = function(huidigepositie){

function success(){
console.log("locatie gelukt");
}
function error(){
console.log("error");
}

function getLocation()
  {
  if (navigator.geolocation)
    {
     huidigepositie = navigator.geolocation.getCurrentPosition(success, error);

    }
  else{console.log("Geolocation is not supported by this browser.");}
  }


console.log(huidigepositie);



}

var weather = new Weather();






