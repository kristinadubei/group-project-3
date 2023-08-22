






const data_set = {
    "disasterPerYear": {},
    "mostFrequent": {}
}
const getGroupedData = (data, key, sort = false) => {
    const groupedData = {};

    // Iterate through the JSON data
    for (const item of data) {
        const category = item[key];
        if (!groupedData[category]) {
            groupedData[category] = 1;
        } else {
            groupedData[category]++;
        }
    }
    var resultList = Object.keys(groupedData).map(category => ({ x: category, y: groupedData[category] }));
    if (sort) {
        resultList = resultList.sort((a, b) => b.y - a.y);
    }
    return resultList;

}
function updatePlotly() {

    var selected = $('#chartSelect').find(":selected").val();
    let data = data_set[selected];
   
    Plotly.react("line_graph", data['trace'], data['layout']);
}

$(document).ready(function () {
    $("#chartSelect").on('change', updatePlotly);
    fetch("/database/map_data.json")
        .then(response => response.json())
        .then(function (data) {
            var groupedData = getGroupedData(data, "Year", false)
            var trace = {
                x: groupedData.map(object => object.x),
                y: groupedData.map(object => object.y),
                type: "Line"
            };
            var layout = {
                title: 'Disasters Per Year',
                height: 600,
               
                xaxis: {
                    title: 'Year'
                },
                yaxis: {
                    title: 'Total Disasters'
                }
            };
            data_set["disasterPerYear"] = {
                "trace": [trace],
                "layout": layout
            }

            Plotly.newPlot('line_graph', [trace], layout);

            groupedData = getGroupedData(data, "Disaster_Type",true)
            trace = {
                x: groupedData.map(object => object.x),
                y: groupedData.map(object => object.y),
                type: 'bar',

            };
            layout = {
                title: "Most frequent occurring disasters",
                height: 600,
                yaxis: {
                    title: 'Number of disasters'
                },
                xaxis: {
                    title: 'Type of Disaster'
                }
            };
            data_set["mostFrequent"] = {
                "trace": [trace],
                "layout": layout
            }

            

        })
        .catch(function (error) {
            console.error("Error fetching data:", error);
        });



});