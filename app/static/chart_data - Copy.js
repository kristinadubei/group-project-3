// Use D3 to fetch data from Flask endpoint
const data_set={
"disasterPerYear":{},
"countryWithHighest":{},
"highestDeaths":{},
"mostFrequent":{}
}

d3.json("http://127.0.0.1:5000/per-year")
    .then(function (data) {
    var trace = {
        x: data.map(function (d) { return d.x; }),
        y: data.map(function (d) { return d.y; }),
        type: 'lines',

    };
    var layout = {
        title: 'Disasters Per Year',
         height: 600,
            margin:{
            b:300
            },
        xaxis: {
            title: 'Year'
        },
        yaxis: {
            title: 'Total Disasters'
        }
    };
    data_set["disasterPerYear"] = {
    "trace":[trace],
    "layout":layout
    }

    Plotly.newPlot('line_graph', [trace], layout);
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });

d3.json("http://127.0.0.1:5000/most-frequent")
    .then(function (data) {

        var trace = {
            x: data.map(object => object.x),
            y: data.map(object => object.y),
            type: "bar"
        };
        var layout = {
            title: "Most frequent occurring disasters",
             height: 600,
            margin:{
            b:300
            },
            yaxis: {
                title: 'Number of disasters'
            },
            xaxis: {
                title: 'Type of Disaster'
            }
        };
        data_set["mostFrequent"] = {
    "trace":[trace],
    "layout":layout
    }


    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });


d3.json("http://127.0.0.1:5000/disaster-by-death")
    .then(function (data) {
        var trace = {
            x: data.map(object => object.x),
            y: data.map(object => object.y),
            type: "bar"
        };
        var layout = {
            title: "Disaster with the highest deaths",
            height: 600,
            margin:{
            b:300
            },
            yaxis: {
                title: 'Number of deaths'
            },
            xaxis: {
                title: 'Type of Disaster'
            }
        };
        data_set["highestDeaths"]= {
        "trace":[trace],
        "layout":layout
        }

    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });


d3.json("http://127.0.0.1:5000/disaster-by-country")
    .then(function (data) {
        var trace = {
            x: data.map(object => object.x),
            y: data.map(object => object.y),
            type: "bar"
        };
        var layout = {
            title: "Country with highest disasters",
             height: 600,
            margin:{
            b:300
            },
            yaxis: {
                title: 'Number of disasters'
            },
            xaxis: {
                title: 'Country'
            }
        };
        data_set["countryWithHighest"] = {
        "trace":[trace],
        "layout":layout
        }
    })
    .catch(function (error) {
        console.error("Error fetching data:", error);
    });



 d3.selectAll("#disasterSelect").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#disasterSelect");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  let data = data_set[dataset]
  Plotly.react("line_graph",data['trace'],data['layout'] );

}
