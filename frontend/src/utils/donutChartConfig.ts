export const formatDonutChartData = (
  spentAmount: number,
  incomeAmount: number
) => {
  return {
    labels: ["Spent", "Inome"],
    datasets: [
      {
        data: [spentAmount, incomeAmount],
        backgroundColor: ["#fba322", "#f5f6fb"],
        borderWidth: 0,
      },
    ],
  };
};

export const donutChartOptions = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        padding: 30,
      },
    },
  },
};
