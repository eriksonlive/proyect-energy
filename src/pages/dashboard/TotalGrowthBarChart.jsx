import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';

// API Hook
import { useGetQueryByDateQuery } from 'apis';

const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const TotalGrowthBarChart = ({ isLoading }) => {
  const [value, setValue] = useState('today');
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
          enabled: true,
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

  const { data } = useGetQueryByDateQuery();

  // 🔹 Transformar datos de la API y actualizar el gráfico
  useEffect(() => {
    if (data && data.success) {
      console.log('Datos recibidos:', data); // Para verificar si data tiene contenido

      // Definir el límite de datos a mostrar
      const LIMIT = 20;

      // Obtener los últimos 'LIMIT' registros
      const records = data.result.records.slice(-LIMIT);

      const categories = records.map((item) => item.CodigoUnidadGeneracion);
      const irradiacion = records.map((item) => item.IrradiacionPanel);
      const temperatura = records.map((item) => item.TemperaturaPanel);

      setChartData((prev) => ({
        ...prev,
        series: [
          { name: 'Irradiación Panel', data: irradiacion },
          { name: 'Temperatura Panel', data: temperatura },
        ],
        options: {
          ...prev.options,
          xaxis: { categories },
        },
      }));
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={2} columns={12}>
            <Grid size={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid>
                  <Typography variant="subtitle2">Total Growth</Typography>
                  <Typography variant="h3">$2,324.00</Typography>
                </Grid>
                <Grid>
                  <TextField
                    select
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  >
                    {status.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
