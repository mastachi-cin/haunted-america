// Create the map object with options
var map = L.map("map", {
  center: [40.003198, -100.051785],
  zoom: 4
});

// Create the tile layer that will be the background of our map
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    tileSize: 500,
    maxZoom: 18,
    zoomOffset: -1,
    id: "dark-v10",
    accessToken: API_KEY
  }).addTo(map);


// Perform a GET request to the URL
//url = "http://127.0.0.1:5000/api/locations";
//url = "/api/locations";
//url = "https://haunted-america.herokuapp.com/api/locations";

// Create a new marker cluster group
var markers = L.markerClusterGroup();

//url = "../static/data/haunted_loc.jscsrc";
url = "../static/data/haunted_places_California.jscsrc";
d3.json(url, function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    // var hauntedData = Object.assign({}, data[i])

    // Set the data location property to a variable
    var hauntedData = data[i];

    console.log(hauntedData.latitude);

    //console.log(hauntedData.latitude);

    //L.Marker([data.longitude, data.latitude])
    //L.marker(hauntedData.latitude, hauntedData.longitude)
    //.bindPopup("<h1>" + hauntedData.location + "</h1> <hr> <h3>City " + hauntedData.city + "</h3>")
    //.addTo(allPlaces);

    //L.marker([hauntedData.latitude, hauntedData.longitude])
    markers.addLayer(L.marker([hauntedData.latitude, hauntedData.longitude])
      .bindPopup("<h2>" + hauntedData.location +
        "</h2> <hr> <h3>City: " + hauntedData.city + "," + hauntedData.state +
        "</h3>"));
     // .addTo(map);
  }
  //allPlaces.addTo(map);
  map.addLayer(markers);
});
