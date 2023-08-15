d3.json("/get_data")
.then(function(data) {
    // Extract x and y values
    var xData = data.map(function(d) { return d.x; });
    var yData = data.map(function(d) { return d.y; });

    // Create a Plotly line chart
    var trace = {
        x: xData,
        y: yData,
        mode: 'lines',
        type: 'scatter'
    };

    var layout = {
        title: 'Line Graph Example',
        xaxis: {
            title: 'X-axis'
        },
        yaxis: {
            title: 'Y-axis'
        }
    };

    Plotly.newPlot('graph', [trace], layout);
})
.catch(function(error) {
    console.error("Error fetching data:", error);
});