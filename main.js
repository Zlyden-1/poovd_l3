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
                title: {
                    display: true,
                    text: "Время экспонирования лучей, тактов",
                },
                beginAtZero: true,
            },
            x: {
                title: {
                    display: true,
                    text: "Лучи, №",
                },
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
    const fistCellStart = (raysNumber-1)/2;
    const y_delta = cellSize*(1+blurLevel/timesNumber);
    console.log(y_delta);
    for (let i = 0; i < raysNumber; i+=raysInterval) {
        raysExposureValues.push(0);
        for (let j = 0; j < timesNumber; j++) {
            const y = i+j*y_delta;
            const y_next = y+y_delta;
            const L = fistCellStart+j*cellSize;
            const R = L+cellSize;
            const intersectionLength = Math.max(0, Math.min(y_next, R) - Math.max(y, L));
            raysExposureValues[i] += intersectionLength/cellSize;
        }
    }
    chartData.datasets[0].data = raysExposureValues;
    chartData.labels = [...raysExposureValues.keys()];
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
