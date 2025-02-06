import Chart from 'react-apexcharts';
import 'App.css';

export const BarCharComponent = () => {
  const chartOptions = {
    chart: {
      type: "bar",
      height: "100%",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const chartSeries = [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];
  return (
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        width="100%"
      />
  );
};
