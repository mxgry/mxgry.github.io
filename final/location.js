let map;


//Set up Firebase.
// v9 compat packages are API compatible with v8 code

var individual = {
  sender: null,
  lat: null,
  lng: null
};

//User authentication
function initAuthentication(onAuthSuccess) {
  firebase.auth().signInAnonymously().catch(function(error) {
      console.log(error.code + ", " + error.message);
  }, {remember: 'sessionOnly'});

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      individual.sender = user.uid;
      onAuthSuccess();
    } else {
      // User is signed out.
    }
  });
}


//on click add a marker/update a marker 
/*
clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
  function(snapshot) {
    var newPosition = snapshot.val();
    var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
    
  }
);
*/

/**
 * Set up a Firebase with deletion on clicks older than expirySeconds
  */
 function initFirebase(map) {

  // 10 minutes before current time.
  var startTime = new Date().getTime() - (60 * 10 * 1000);

  // Reference to the clicks in Firebase.
  var clicks = firebase.database().ref('clicks');

  // Listen for clicks and add them to the heatmap.
  clicks.orderByChild('timestamp').startAt(startTime).on('child_added',
    function(snapshot) {
      // Get that click from firebase.
      var newPosition = snapshot.val();
      var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
      var elapsedMs = Date.now() - newPosition.timestamp;

      // Add the point to the map.
      boatMarker(point);

      // Request entries older than expiry time (10 minutes).
      var expiryMs = Math.max(60 * 10 * 1000 - elapsed, 0);
      // Set client timeout to remove the point after a certain time.
      window.setTimeout(function() {
        // Delete the old point from the database.
        snapshot.ref.remove();
      }, expiryMs);
    }
  );

  // Remove old data from the map when a point is removed from firebase.
  clicks.on('child_removed', function(snapshot, prevChildKey) {
    var mapData = map.getData();
    var i = 0;
    while (snapshot.val().lat != mapData.getAt(i).lat()
      || snapshot.val().lng != mapData.getAt(i).lng()) {
      i++;
    }
    mapData.removeAt(i);
  });
}




var windSpeed = 5; var windDirection = 0;

//Get weather data.

$.getJSON('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=9449880&product=wind&datum=STND&time_zone=gmt&units=metric&format=json', function(noaaData) {
  if(noaaData == null){
      const backupJSON = {
      "metadata": {
        "id": "9449880",
        "name": "Friday Harbor",
        "lat": "48.5453",
        "lon": "-123.0125"
      },
      "data": [
        {
          "t": "2023-05-25 05:18",
          "s": "0.78",
          "d": "233.00",
          "dr": "SW",
          "g": "1.36",
          "f": "0,0"
        }
      ]
    }; 
      const noaaData = JSON.parse(backupJSON);
    }
    windSpeed = noaaData.data[0].s;
    $('#wind').append('<li>' + 'Wind Speed: ' + windSpeed + ' KPH' + '</li>');
    windDirection = (noaaData.data[0].d);
    $('#wind').append('<li>' + 'Wind Direction: ' + windDirection + ' Degrees' + '</li>');
  });


function getWind(){
  $.getJSON('https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=9449880&product=wind&datum=STND&time_zone=gmt&units=metric&format=json', function(noaaData) {
    if(noaaData == null){
       const backupJSON = {
        "metadata": {
          "id": "9449880",
          "name": "Friday Harbor",
          "lat": "48.5453",
          "lon": "-123.0125"
        },
        "data": [
          {
            "t": "2023-05-25 05:18",
            "s": "0.78",
            "d": "233.00",
            "dr": "SW",
            "g": "1.36",
            "f": "0,0"
          }
        ]
      }; 
       const noaaData = JSON.parse(backupJSON);
      }
      let windSpeed = noaaData.data[0].s;
      console.log(windSpeed);
      return windSpeed;
      
    });
}



async function initMap() {
  // The location of Haskell Plaza
  const startPosition = { lat: 48.733841, lng: -122.486281 }; 
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Plaza
  map = new Map(document.getElementById("map"), {
    zoom: 20,
    center: startPosition,
    mapId: "72fa0e5b8bb244a1",
  });

  const sailBoatMarker = document.createElement("img");
  sailBoatMarker.src ="sailboat2small.png"

  // A marker, positioned at Plaza
  const marker = new AdvancedMarkerElement({
    map: map,
    position: startPosition,
    title: "Boat Position",
    content: sailBoatMarker,
  });

  function boatMarker(pos){
    const marker = new AdvancedMarkerElement({
      map: map,
      position: pos,
      title: "Boat Position",
      content: sailBoatMarker,
  })
}


const dropButton = document.createElement("button");

dropButton.textContent = "Drop/Move a Sail Boat";
dropButton.classList.add("custom-map-control-button");
map.controls[google.maps.ControlPosition.TOP_CENTER].push(dropButton);
dropButton.addEventListener("click", () => {
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log(pos);
        const marker = new AdvancedMarkerElement({
          map: map,
          position: pos,
          title: "Boat Position",
          content: sailBoatMarker,
        });
        
      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
});


function updateBoat(marker, dir, time){
  const earthRad = 6378.14;
  //let windSpeed = getWind();
  //console.log(windSpeed);

  //find the distance travelled
  let force = windSpeed;
  let dist = time / 60 * force;

  //given distance and direction, find the new location.



}

updateBoat(marker);

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
  browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
}
}

initMap();

 


