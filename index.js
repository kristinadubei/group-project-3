var map = null;
function mapping(data, year_para, disaster_type_para) {
    var filtered_by_year = []
    for (const item of data) {
        if(item.Year == year_para){
            filtered_by_year.push(item)
        }
    }
    console.log(filtered_by_year)
    var filtered_by_disaster = []
    for (const item of filtered_by_year){
        if(item.Disaster_Type == disaster_type_para){
            filtered_by_disaster.push(item)
        }
    }
    console.log(filtered_by_disaster)
    if (!map) {
        map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    }
    for(const item of filtered_by_disaster){
        var color = ''
        if(disaster_type_para === 'Earthquake'){
            color = 'red';
        }
        if(disaster_type_para === 'Flood'){
            color = 'blue';
        }
        if(disaster_type_para === 'landslide'){
            color = 'orange';
        }
        if(disaster_type_para === 'storm'){
            color = 'purple';
        }
        if(disaster_type_para === 'Volcanic activity'){
            color = 'pink';
        }
        var marker = L.circleMarker([item.Latitude, item.Longitude], {
            radius: 2 * 5,
            fillColor: color,
            color: 'Yellow',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map);
        if(item.Total_Deaths == ""){
            marker.bindPopup(`Total Deaths: 0`);
        }
        else{
            marker.bindPopup(`Total Deaths: ${item.Total_Deaths}`);
        }
    }
    return;
}
function destroyMap() {
    if (map) {
        map.eachLayer(function (layer) {
            map.removeLayer(layer);
        });
        map.remove();
        map = null;
    }
}
function World() {
    const yearSelect = document.getElementById('yearSelect');
    const disasterSelect = document.getElementById('disasterSelect');
    destroyMap();
    fetch('map_data.json')
    .then(response => response.json())
    .then(data => {
        var year_para = yearSelect.value;
        var disaster_type_para = disasterSelect.value;
        mapping(data, year_para, disaster_type_para);
    })
    .catch(error => {
        console.error('Error fetching or processing the CSV file:', error);
    });
}
$(document).ready(function() {
    let select = $("#yearSelect")
    for(var i=1970; i<2022; i++){
        let option = $(`<option value="${i}">${i}</option>`);
        select.append(option);
    }
    const yearSelect = document.getElementById('yearSelect');
    const disasterSelect = document.getElementById('disasterSelect');
    World();
    yearSelect.addEventListener('change', World);
    disasterSelect.addEventListener('change', World);
});