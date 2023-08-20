
//Using chart.js libabry to visualize the 'Distribution in % of the death tolls of natural disasters in the world'
new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: ["Africa", "Americas", "Asia", "Europe", "Oceania"],

      datasets: [
        {
          label: "From 1900 To 1951",
          fill: true,
          backgroundColor: "rgba(179,181,198,0.2)",
          borderColor: "rgba(179,181,198,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(179,181,198,1)",
          data: [487380,259950,20124975,3943840,7881]
        }, {
          label: "From 1951 To 1999",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [816588,291876,5024120,59255,12107]
        },{
          label: "From 2000 To 2021",
          fill: true,
          backgroundColor: "rgba(100,150,255,0.2)",
          borderColor: "rgba(100,150,255,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(100,150,255,1)",
          pointBorderColor: "#fff",
          data: [1303968,551826,25149095,4003095,19988]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Distribution in % of the death tolls of natural disasters in the world'
      },
      tooltips: {
          callbacks: {
              label: function(tooltipItem, data) {
                  const dataset = data.datasets[tooltipItem.datasetIndex];
                  const value = dataset.data[tooltipItem.index];
                  const label = dataset.label || '';
                  return label + ': ' + value + '%';
              }
          }
      },
      legend: {
        display: true,
        position: 'top', // You can customize the position
    },
    animation: {
        duration: 1000, // Add animation to the chart
    }

}
});

// Making labels clickable
document.getElementById("label-africa").addEventListener("click", () => {
chart.data.datasets.forEach(dataset => {
    dataset.hidden = true; // Hide all datasets
});
chart.data.datasets[0].hidden = false; // Show the Africa dataset
chart.update();
});