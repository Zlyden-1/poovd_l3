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
};

const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

const quadrants = {
    id: 'quadrants',
    beforeDraw(chart, args, options) {
      const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
      const midX = x.getPixelForValue(0);
      const midY = y.getPixelForValue(0);
      ctx.save();
      ctx.fillStyle = options.topLeft;
      ctx.fillRect(left, top, midX - left, midY - top);
      ctx.fillStyle = options.topRight;
      ctx.fillRect(midX, top, right - midX, midY - top);
      ctx.fillStyle = options.bottomRight;
      ctx.fillRect(midX, midY, right - midX, bottom - midY);
      ctx.fillStyle = options.bottomLeft;
      ctx.fillRect(left, midY, midX - left, bottom - midY);
      ctx.restore();
    }
}

const chart = new Chart(chartCanvas, {
    type: "line",
    data: chartData,
    options: {
        plugins: {
          quadrants: {
            topLeft: CHART_COLORS.red,
            topRight: CHART_COLORS.blue,
            bottomRight: CHART_COLORS.green,
            bottomLeft: CHART_COLORS.yellow,
          }
        }
      },
    plugins: [quadrants]
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

