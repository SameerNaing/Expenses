export const formatBarPlotData = (
  labels: string[],
  spentData: number[],
  incomeData: number[]
): Object => {
  return {
    labels,
    datasets: [
      { label: "Income", backgroundColor: "#434af9", data: incomeData },
      { label: "Spent", backgroundColor: "#fba322", data: spentData },
    ],
  };
};

export const barPlotOption = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      maxBarThickness: 100,
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
    },
  },
};
