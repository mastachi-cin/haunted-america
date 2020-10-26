// Create the tile layer that will be the background of our map
var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 12,
    id: "dark-v10",
    accessToken: API_KEY
    });

// Streetmap Layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

// Create the map object with options
var map = L.map("map", {
  center: [40.003198, -102.051785],
  zoom: 4,
  layers: [darkmap]
});

var allPlaces = new L.LayerGroup();

// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Dark Map": darkmap
  //"Street Map": streetmap
};

// Create an overlayMaps object to hold the Haunted Places layer
var overlayMaps = {
  "Haunted Places": allPlaces
};


// Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  //L.control.layers(baseMaps, overlayMaps, {
    //collapsed: false
  //}).addTo(map);

// Perform a GET request to the URL
//url = "http://127.0.0.1:5000/api/locations";
//url = "/api/locations";
//url = "https://haunted-america.herokuapp.com/api/locations";
url = "../static/data/haunted_loc.jscsrc";
d3.json(url, function(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var hauntedData = Object.assign({}, data[i])

    //console.log(hauntedData.latitude);

    //L.Marker([data.longitude, data.latitude])
    //L.marker(hauntedData.latitude, hauntedData.longitude)
    //.bindPopup("<h1>" + hauntedData.location + "</h1> <hr> <h3>City " + hauntedData.city + "</h3>")
    //.addTo(allPlaces);

    L.marker([hauntedData.latitude, hauntedData.longitude], {
    }).bindPopup("<h2>" + hauntedData.location + 
      "</h2> <hr> <h3>City: " + hauntedData.city + "," + hauntedData.state +
      "</h3>").addTo(allPlaces);
  }
  allPlaces.addTo(map);

});
