d3.json("/get_bar_data")
    .then(function(data) {
        createBarChart(data);
    })
    .catch(function(error) {
        console.error("Error fetching bar data:", error);
    });

d3.json("/get_pie_data")
    .then(function(data) {
        createPieChart(data);
    })
    .catch(function(error) {
        console.error("Error fetching pie data:", error);
    });

d3.json("/get_bubble_data")
    .then(function(data) {
        createBubbleChart(data);
    })
    .catch(function(error) {
        console.error("Error fetching bubble data:", error);
    });

function createBarChart(data) {
    var xValues = data.map(item => item.type);
    var yValues = data.map(item => item.count);

    var trace = {
        x: xValues,
        y: yValues,
        type: 'bar'
    };

    var layout = {
        title: 'Natural Disaster Bar Chart'
    };

    Plotly.newPlot('barChart', [trace], layout);
}

function createPieChart(data) {
    var labels = data.map(item => item.type);
    var values = data.map(item => item.percentage);

    var trace = {
        labels: labels,
        values: values,
        type: 'pie'
    };

    var layout = {
        title: 'Natural Disaster Pie Chart'
    };

    Plotly.newPlot('pieChart', [trace], layout);
}

function createBubbleChart(data) {
    var trace = {
        x: data.map(item => item.type),
        y: data.map(item => item.count),
        text: data.map(item => item.type),
        mode: 'markers',
        marker: {
            size: data.map(item => item.magnitude * 10),
            color: data.map(item => item.magnitude),
            colorscale: 'Viridis'
        }
    };

    var layout = {
        title: 'Natural Disaster Bubble Chart',
        xaxis: {
            title: 'Disaster Type'
        },
        yaxis: {
            title: 'Count'
        }
    };

    Plotly.newPlot('bubbleChart', [trace], layout);
}
