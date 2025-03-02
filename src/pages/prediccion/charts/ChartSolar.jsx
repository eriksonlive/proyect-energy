import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

// third-party
import Chart from 'react-apexcharts';

const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const ChartSolar = ({ solarData }) => {
  const theme = useTheme();

  // Estado inicial del gráfico
  const [chartData, setChartData] = useState({
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 20,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: 'solid',
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
      },
    },
    series: [],
  });

  // 🔹 Transformar datos de la API y actualizar el gráfico
  useEffect(() => {
    if (solarData) {
      // Definir el límite de datos a mostrar
      const LIMIT = 12;
      const categories = solarData?.map((item) => item.month);
      const prod = solarData?.map((item) => item.production.toFixed(2));

      setChartData((prev) => ({
        ...prev,
        series: [{ name: 'Producción', data: prod }],
        options: {
          ...prev.options,
          xaxis: { categories },
        },
      }));
    }
  }, [solarData]);

  return (
    <Grid container spacing={3}>
      <Grid size={12}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="subtitle2">Producción Mensual</Typography>
            <Typography variant="h3">Energía Solar</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={12}>
        <Chart {...chartData} />
      </Grid>
    </Grid>
  );
};

ChartSolar.propTypes = {
  isLoading: PropTypes.bool,
};

export default ChartSolar;
