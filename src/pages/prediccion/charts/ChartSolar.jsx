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
import { usePostByAreaQuery } from 'apis';


const status = [
  { value: 'today', label: 'Today' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
];

const ChartSolar = ({ solarData, isLoading }) => {
    //const [chartData, set = useState();
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
  
    //const { data } = usePostByAreaQuery();
  
    // 🔹 Transformar datos de la API y actualizar el gráfico
    useEffect(() => {
      if (solarData) {
        console.log(solarData);

        /*
        const monthNames = [
          'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        const extractedData = solarData?.outputs?.ac_monthly.map((value,index) => ({
          
          
          month: monthNames[index],
          production: value
          
        }));
        */
        
      
       //setChartData(extractedData);
       //console.log("logData") //Verifico que se haya creado la tabla
       //console.log(extractedData); //Verifico los datos
       
  
        // Definir el límite de datos a mostrar
        const LIMIT = 12;
        const categories = solarData?.map(item => item.month);
        const prod = solarData?.map(item => item.production.toFixed(2));
  
        // Obtener los últimos 'LIMIT' registros
        //const records = solarData.result.records.slice(-LIMIT);
  
        setChartData((prev) => ({
          ...prev,
          series: [
            { name: 'Producción', data: prod  },
            //{ name: 'Temperatura Panel', data: temperatura },
          ],
          options: {
            ...prev.options,
            xaxis: { categories },
          },
        }));
      }
    }, [solarData]);
  
    return (
      <>
        {//isLoading ? (
          //<SkeletonTotalGrowthBarChart />
        //) : (
          <MainCard>
            <Grid container spacing={2} columns={12}>
              <Grid size={12}>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Typography variant="subtitle2">Producción Mensual</Typography>
                    <Typography variant="h3">$Mr.Taxes</Typography>
                  </Grid>
                  <Grid>
                    <TextField
                      select
                      value={solarData}
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
          //(
        }
      </>
    );
  };
  
  ChartSolar.propTypes = {
    isLoading: PropTypes.bool,
  };
  
  export default ChartSolar;
  