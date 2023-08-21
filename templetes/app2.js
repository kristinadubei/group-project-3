// Radar Chart
new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
        labels: ["Oceana", "Europe", "Asia", "Americas", "Africa"],
        datasets: [
            {
                label: "Before 2000",
                fill: true,
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(179,181,198,1)",
                data: [8.77,55.61,21.69,6.62,6.82]
            }, 
            {
                label: "After 2000",
                fill: true,
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointBackgroundColor: "rgba(255,99,132,1)",
                data: [25.48,54.16,7.61,8.06,4.45]
            }
        ]
    },
    options: {
        title: {
            display: true,
            text: 'Distribution in % of the death tolls of natural disaster'
        }
    }
});

// Map Initialization
var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('Geo_map_data.json')
    .then(response => response.json())
    .then(data => {
        // Assuming the data is a list of dictionaries with keys for continent, country, totalDeaths, latitude, and longitude.
        data.forEach(item => {
            var continent = item["Continent"];
            var country = item["Country"];
            var totalDeaths = item["Total_Deaths"]; /
            var latitude = item["Latitude"];
            var longitude = item["Longitude"];

            var marker = L.circleMarker([latitude, longitude], {
                radius: Math.sqrt(totalDeaths) / 2,  
                fillColor: 'red',
                color: 'white',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            }).addTo(map);

            marker.bindPopup(`<strong>${country}</strong><br>Continent: ${continent}<br>Total Deaths: ${totalDeaths}`);
        });
    })
    .catch(error => {
        console.error("There was an error fetching the data:", error);
    });

