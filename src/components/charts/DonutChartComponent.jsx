import { useState } from 'react';
import Chart from 'react-apexcharts';
import "App.css";

export const DonutChartComponent = () => {
  const [chartOptionsDonut, setChartOptionsDonut] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Series A", "Series B", "Series C", "Series D", "Series E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [chartSeriesDonut, setChartSeriesDonut] = useState([
    44, 55, 41, 17, 15,
  ]);

  return (
    <Chart
      options={chartOptionsDonut}
      series={chartSeriesDonut}
      type="donut"
      width="100%"
    />
  );
};
