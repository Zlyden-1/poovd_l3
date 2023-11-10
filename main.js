const chartCanvas = document.getElementById("сhart");
const timesNumberValue = document.getElementById("times_number__value");
const blurValue = document.getElementById("blur__value");
const timesNumberInput = document.getElementById("times_number");
const blurInput = document.getElementById("blur");
const chartData = {
    labels: [],
    datasets: [
        {
            label: "Время экспонирования лучей, тактов",
            data: [],
            borderWidth: 1,
        },
    ],
    lineAtIndex: 2,
};

const chart = new Chart(chartCanvas, {
    type: "line",
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

const cellSize = 8, raysInterval = 1;


const calculateExposure = () => {
    const timesNumber = timesNumberInput.value;
    const blurLevel = blurInput.value;
    console.log(blurLevel);
    timesNumberValue.innerHTML = timesNumberInput.value;
    blurValue.innerHTML = blurInput.value;
    const blurVariation = blurLevel/timesNumber;
    const raysExposureValues = [];
    const raysNumber = (2*(Math.abs(blurLevel)+1))*cellSize+1;
    chartData.datasets[0].data = new Array(raysNumber)
    chartData.labels = [...chartData.datasets[0].data.keys()]
    for (let i = 0; i < raysNumber; i++) {
        currentCellStart = 4 + i*cellSize;
        currentCellEnd = currentCellStart + cellSize-1;
        for (let j = 0; j < timesNumber; j++) {
            currentCellStart = 4 + i*cellSize;
            currentCellEnd = currentCellStart + cellSize-1;
        }
    }
    chart.update();
}

calculateExposure();

timesNumberInput.oninput = (e) => {
    timesNumber = e.target.value;
    timesNumberValue.innerHTML = e.target.value;
    calculateExposure();
}

blurInput.oninput = (e) => {
    blurLevel = e.target.value;
    blurValue.innerHTML = e.target.value;
    calculateExposure();
}

// window.onload = function() {
//   var originalLineDraw = Chart.controllers.line.prototype.draw;
//   Chart.helpers.extend(Chart.controllers.line.prototype, {
//     draw: function() {
//       originalLineDraw.apply(this, arguments);
//       var chart = this.chart;
//       var ctx = chart.chart.ctx;
//       var index = chart.config.data.lineAtIndex;
//       if (index) {
//         var xaxis = chart.scales['x-axis-0'];
//         var yaxis = chart.scales['y-axis-0'];
//         ctx.save();
//         ctx.beginPath();
//         ctx.moveTo(xaxis.getPixelForValue(undefined, index), yaxis.top);
//         ctx.strokeStyle = '#ff0000';
//         ctx.lineTo(xaxis.getPixelForValue(undefined, index), yaxis.bottom);
//         ctx.stroke();
//         ctx.restore();
//       }
//     }
//   });
// }
