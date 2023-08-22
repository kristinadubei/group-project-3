
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
          data: [1.96,1.05,81.07,15.89,0.03]
        }, {
          label: "From 1951 To 1999",
          fill: true,
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          data: [13.16,4.70,80.98,0.96,0.20]
        },{
          label: "From 2000 To 2021",
          fill: true,
          backgroundColor: "rgba(100,150,255,0.2)",
          borderColor: "rgba(100,150,255,1)",
          pointBorderColor: "#fff",
          pointBackgroundColor: "rgba(100,150,255,1)",
          pointBorderColor: "#fff",
          data: [4.20,1.78,81.05,12.90,0.06]
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
        duration: 1000, 
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