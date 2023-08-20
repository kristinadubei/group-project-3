let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var data_key = 'Disaster_Type'
var map_filters = {
   'Flood':{'data_key': data_key, 'value': 'Flood',"display":'Flood' },
    'Earthquake':{ 'data_key': data_key, 'value': 'Earthquake' ,"display":'Earthquake'},
    'Storm': {'data_key': data_key, 'value': 'Storm' ,"display":'Storm'},
    'Epidemic': {'data_key': data_key, 'value': 'Epidemic',"display":'Epidemic' },
    'Other':{ 'data_key': data_key, 'value': null ,"display":'Other disasters'}
}
var colors = {
    Flood:"yellow",
    Earthquake:"red",
    Storm:"blue-dark",
    Epidemic:"orange",
    Other:"green"
}
let icons = {
  Flood: L.ExtraMarkers.icon({
    markerColor: "yellow",
    shape: "circle"
  }),
  Earthquake: L.ExtraMarkers.icon({

    markerColor: "red",
    shape: "circle"
  }),
  Storm: L.ExtraMarkers.icon({
    markerColor: "blue-dark",
    shape: "circle"
  }),
  Epidemic: L.ExtraMarkers.icon({

    markerColor: "orange",
    shape: "circle"
  }),
  Other: L.ExtraMarkers.icon({
    markerColor: "green",
    shape: "circle"
  })
};

let layers = {}
let list_layers = []
let overlays = {
};


var count_data = {

};
let map;
map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 5
});
streetmap.addTo(map);
var ov_layer = null;
function setLayers(){
list_layers = []
layers = {}

for (const key in map_filters) {
    if (map_filters.hasOwnProperty(key)) {
      const d = map_filters[key];
      const lay = new L.LayerGroup();
      layers[key] =  lay
      list_layers.push(lay);
      overlays[d.display]= lay;
      count_data[key] = 0;
      map.addLayer(lay);
    }
  }
  console.log(ov_layer,"ov_layer")
  if (ov_layer!=null){
  map.removeControl(ov_layer)
//  ov_layer.removeFrom(map)
  }

  ov_layer = L.control.layers(null, overlays)
  ov_layer.addTo(map);
 }



// Create a control for our layers, and add our overlays to it.

//L.control.layers(null, overlays).addTo(myMap);

// Create a legend to display information about our map.
let info = L.control({
    position: "bottomright"
});

info.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    return div;
};
// Add the info legend to the map.
info.addTo(map);



// Update the legend's innerHTML with the last updated time and disaster count.
function updateLegend(time, disasterCount) {
    var innerHtml = [ "<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>"]
    for (const key in disasterCount) {
    if (disasterCount.hasOwnProperty(key)) {
    var icon = icons[key].createIcon();
  innerHtml.push(  `<div class="legend-icon"> ${icon.outerHTML} <span class='${colors[key]}'>${map_filters[key].display}: ` + disasterCount[key] + "</span></div> </br>")
    }
  }
    document.querySelector(".legend").innerHTML = innerHtml.join("");
//    document.querySelector(".legendMap2").innerHTML = innerHtml.join("");
}
var data_set_new = []
d3.json("http://127.0.0.1:5000/get_all")
    .then(function (infoRes) {
        data_set_new = infoRes;
        updateMap()
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });


d3.selectAll("#mapSelect").on("change", updateMap);
let markers = L.markerClusterGroup();

function updateMarkers(selectedValue){
if (selectedValue !="default"){
 for(layer in layers){
  map.removeLayer(layers[layer]);
  layers[layer].clearLayers();

      }
      markers = L.markerClusterGroup();
      map.addLayer(markers);
     }
     else{
     map.removeLayer(markers);
     }

    setLayers()
    let updatedAt = new Date();
    let disaster = {}
    let statusCode = ""



    for (let i = 0; i < data_set_new.length; i++) {
        disaster = data_set_new[i]
        statusCode = disaster[data_key]
     if (!Object.keys(map_filters).includes(disaster[data_key])){
        statusCode = "Other"
     }
      count_data[statusCode]++;
      let newMarker = L.marker([disaster.Latitude, disaster.Longitude],{  icon: icons[statusCode]
        });

      // Add the new marker to the appropriate layer.
      if (selectedValue =="default"){
        console.log("added")
        newMarker.addTo(layers[statusCode]);
      }
      else{
      markers.addLayer(newMarker);
      }

      // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
      newMarker.bindPopup(disaster.Disaster_Type + "<br> Country: " +disaster.Country+
        "<br> Year: " + disaster.Year + "<br> Total Deaths: " + (disaster.Total_Deaths || 0) + 
        "<br> Total Damages (USD): " + (disaster.Total_Damages_USD || 0) + "<br> ");
    }

    updateLegend(updatedAt, count_data);

}

// This function is called when a dropdown menu item is selected
function updateMap() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#mapSelect");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
    console.log(dataset)
  updateMarkers(dataset)

}

// //////////////////////////////////////////////////////////////////

// // // Initialize layers and marker cluster group when the map is first loaded
// // function initializeMap() {
// //     markers = L.markerClusterGroup();
// //     map.addLayer(markers);
// //     setLayers();
// //     updateMarkers("default");
// // }

// // // // ...

// // // Remove existing markers from the map
// // function clearMarkers() {
// //     if (markers) {
// //         markers.clearLayers();
// //     }
// //     for (const key in layers) {
// //         if (layers.hasOwnProperty(key)) {
// //             map.removeLayer(layers[key]);
// //             layers[key].clearLayers();
// //         }
// //     }
// // }

// // // ...

// // // Update the markers and layers based on the selected option
// // function updateMarkers(selectedValue) {
// //     clearMarkers();

// //     // ... (rest of your updateMarkers function)

// //     // Add the new marker to the appropriate layer or marker cluster
// //     if (selectedValue === "default") {
// //         newMarker.addTo(layers[statusCode]);
// //     } else {
// //         markers.addLayer(newMarker);
// //     }

// //     // ... (rest of your updateMarkers function)
// // }

