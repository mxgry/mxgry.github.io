let map;

import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: "AIzaSyABBr1pzKhH2U-mOH-J2NeyChnnlCGj7uE",
  version: "weekly",
  libraries: ["maps"]
});


async function initMap() {
  // The location of Haskell Plaza
  const startPosition = { lat: 48.733841, lng: -122.486281 }; 
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Plaza
  map = new Map(document.getElementById("map"), {
    zoom: 16,
    center: startPosition,
    mapId: "START_MAP_ID",
  });

  const sailBoatMarker = "/sailboat.png";

  // The marker, positioned at Plaza
  const marker = new google.maps.Marker({
    map: map,
    position: startPosition,
    title: "Boat Position",
    icon: sailBoatMarker,
  });
}



initMap();

/* const dropButton = document.createElement("button");

dropButton.textContent = "Drop a Sail Boat";
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

        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");
        infoWindow.open(map);
        map.setCenter(pos);
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



function handleLocationError(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(
  browserHasGeolocation
    ? "Error: The Geolocation service failed."
    : "Error: Your browser doesn't support geolocation."
);
infoWindow.open(map);
}
 */

