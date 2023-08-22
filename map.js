let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var data_key = 'Disaster_Type'
var map_filters = {
    'Flood': { 'data_key': data_key, 'value': 'Flood', "display": 'Flood' },
    'Earthquake': { 'data_key': data_key, 'value': 'Earthquake', "display": 'Earthquake' },
    'Storm': { 'data_key': data_key, 'value': 'Storm', "display": 'Storm' },
    'Epidemic': { 'data_key': data_key, 'value': 'Epidemic', "display": 'Epidemic' },
    'Other': { 'data_key': data_key, 'value': null, "display": 'Other disasters' }
}
var colors = {
    Flood: "yellow",
    Earthquake: "red",
    Storm: "blue-dark",
    Epidemic: "orange",
    Other: "green"
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
for (const key in map_filters) {
    if (map_filters.hasOwnProperty(key)) {
        const d = map_filters[key];
        const lay = new L.LayerGroup();
        layers[key] = lay
        list_layers.push(lay);
        overlays[d.display] = lay;
        count_data[key] = 0;
    }
}

// Create the map with our layers.
let mapMarker = L.map("map-id", {
    center: [0,0],
    zoom: 2,
    layers: list_layers
});

// Add our "streetmap" tile layer to the map.
streetmap.addTo(mapMarker);


// Create a control for our layers, and add our overlays to it.
L.control.layers(null, overlays).addTo(mapMarker);

// Create a legend to display information about our map.
let info = L.control({
    position: "bottomright"
});

info.onAdd = function () {
    let div = L.DomUtil.create("div", "legend");
    return div;
};
// Add the info legend to the map.
info.addTo(mapMarker);



// Update the legend's innerHTML with the last updated time and station count.
function updateLegend(time, stationCount) {
    var innerHtml = ["<p>Updated: " + moment.unix(time).format("h:mm:ss A") + "</p>"]
    for (const key in stationCount) {
        if (stationCount.hasOwnProperty(key)) {
            var icon = icons[key].createIcon();
            innerHtml.push(`<div class="legend-icon"> ${icon.outerHTML} <span class='${colors[key]}'>${map_filters[key].display}: ` + stationCount[key] + "</span></div> </br>")
        }
    }
    document.querySelector(".legend").innerHTML = innerHtml.join("");
}

fetch("/database/map_data.json")
.then(response => response.json())
    .then(function (infoRes) {

        console.log(infoRes.length)
        resultList = infoRes.sort((a, b) => b.Year - a.Year);
        infoRes = infoRes.slice(0, 2000);
        let updatedAt = new Date();
        let disaster = {}
        let statusCode = ""
        for (let i = 0; i < infoRes.length; i++) {
            disaster = infoRes[i]
            statusCode = disaster[data_key]
            if (!Object.keys(map_filters).includes(disaster[data_key])) {
               
                statusCode = "Other"
            }
            count_data[statusCode]++;
            let newMarker = L.marker([disaster.Latitude, disaster.Longitude], {
                icon: icons[statusCode]
            });

            // Add the new marker to the appropriate layer.
            newMarker.addTo(layers[statusCode]);

            // Bind a popup to the marker that will  display on being clicked. This will be rendered as HTML.
            newMarker.bindPopup(disaster.Disaster_Type + "<br> Country: " + disaster.Country +
                "<br> Year: " + disaster.Year + "<br> Total Deaths: " + disaster.Total_Deaths || 0 + "<br> ");
        }
        updateLegend(updatedAt, count_data);
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });