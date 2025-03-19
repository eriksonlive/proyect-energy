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
import { useGetByDateQuery, useGetEnergyPriceHourQuery } from 'apis';

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
        zoom: { enabled: true }, // Activa zoom
        toolbar: {
          show: true, // Muestra la barra de herramientas
        },
      },
      responsive: [
        {
          breakpoint: 40,
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
          columnWidth: '80%',
        },
      },
      xaxis: {
        type: 'category',
        categories: [],
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
            }).format(value);
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        // Si no deseas formatear la fecha en el tooltip, deja esta línea comentada o elimínala
        // x: { format: 'dd MMM yyyy HH:mm' },
      },
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: 10,
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 100,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 5,
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
        show: false,
      },
    },
    series: [],
  });

  const { data } = useGetByDateQuery();
  const { data: dataPrice } = useGetEnergyPriceHourQuery();

  // 🔹 Transformar datos de la API y actualizar el gráfico
  useEffect(() => {
    if (data && data.success) {
      // Definir el límite de datos a mostrar
      const LIMIT = 20;

      // Obtener los últimos 'LIMIT' registros
      const records = data.result.records.slice(-LIMIT);

      const categories = records.map((item) => item.CodigoUnidadGeneracion);
      const irradiacion = records.map((item) => item.IrradiacionPanel);
      const temperatura = records.map((item) => item.TemperaturaPanel);
      const irradiacionGlobal = records.map((item) => item.IrradiacionGlobal);
      const temperaturaAmbiente = records.map(
        (item) => item.TemperaturaAmbiente
      );

      setChartData((prev) => ({
        ...prev,
        series: [
          { name: 'Irradiación Panel', data: irradiacion },
          { name: 'Temperatura Panel', data: temperatura },
          { name: 'Irradiación Global', data: irradiacionGlobal },
          { name: 'Temperatura Ambiente', data: temperaturaAmbiente },
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
