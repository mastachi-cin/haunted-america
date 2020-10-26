// Create the map object with options
var map = L.map("map", {
  worldCopyJump: true,
  center: [40.003198, -100.051785],
  zoom: 5
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
  }).addTo(map);

// Create a new marker cluster group
var markers = L.markerClusterGroup({color: "orange"});

// Perform a GET request to the URL
url = "/api/locations";
d3.json(url, function(data) {

  for (var i = 0; i < data.length; i++) {
    var hauntedData = data[i];

    markers.addLayer(L.marker([hauntedData.latitude, hauntedData.longitude])
      .bindPopup("<h3>" + hauntedData.location +
        "</h3> <hr> <h4>Story: " + hauntedData.description + "</h4>"));
  }
  
  map.addLayer(markers);
});
