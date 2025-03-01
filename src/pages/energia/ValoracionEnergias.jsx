import { Box, Grid2 as Grid, Stack, Typography, useTheme } from '@mui/material';
import { useGetEnergyDataNameQuery, useGetPriceEnergyDataQuery } from 'apis';
import { CustomDatatable } from 'components';
import { useEffect, useState } from 'react';
import { FaFire } from 'react-icons/fa';
import { IoMdSunny, IoMdWater } from 'react-icons/io';
import { MainCard } from 'ui-component';

export const ValoracionEnergias = () => {
  const theme = useTheme();
  const [priceEnergy, setPriceEnergy] = useState([]);

  const { data: dataPrice, isLoading, isError } = useGetPriceEnergyDataQuery();
  const { data: dataName } = useGetEnergyDataNameQuery();

  const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 100 },
    { field: 'planta', headerName: 'Planta', width: 200 },
    {
      field: 'energia',
      headerName: 'Tipo energía',
      width: 150,
      renderCell: (params) => {
        if (params.row.energia === 'Solar') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>{params.row.energia}</Box>
              <IoMdSunny color={'#febc3b'} size={24} />
            </Box>
          );
        }

        if (params.row.energia === 'Hidraulica') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>{params.row.energia}</Box>
              <IoMdWater color={theme.palette.primary.main} size={24} />
            </Box>
          );
        }

        if (params.row.energia === 'Termica') {
          return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>{params.row.energia}</Box>
              <FaFire color={'#ff6178'} size={24} />
            </Box>
          );
        }
      },
    },
    { field: 'codigoPlanta', headerName: 'Código planta', width: 100 },
    { field: 'clasificacion', headerName: 'Clasificación', width: 150 },
    { field: 'capacidad', headerName: 'Capacidad efectiva neta', width: 150 },
    { field: 'uMedida', headerName: 'Unidad de medida', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 100 },
  ];

  const [showColumn, setShowColumn] = useState(true);

  useEffect(() => {
    if (dataPrice && dataName && dataName.success && dataPrice.success) {
      const records = dataPrice.result.records;
      const recordsName = dataName.result.records;

      // Creamos un mapa a partir de recordsName usando CodigoPlanta como clave
      const nameMap = {};
      recordsName.forEach((item) => {
        nameMap[item.CodigoPlanta.toString()] = item;
      });

      // Copiamos los registros antes de ordenarlos para evitar modificar el estado original
      const sortedRecords = records.slice().sort((a, b) => {
        const plantaA = a.CodigoPlanta.toString();
        const plantaB = b.CodigoPlanta.toString();
        if (plantaA < plantaB) return -1;
        if (plantaA > plantaB) return 1;
        return new Date(a.FechaHora) - new Date(b.FechaHora);
      });

      // Filtramos los registros para solo mantener cambios en el "Valor"
      const filteredRecords = [];
      const lastValorByPlanta = {};

      sortedRecords.forEach((item) => {
        const codigo = item.CodigoPlanta.toString();
        if (
          lastValorByPlanta[codigo] === undefined ||
          lastValorByPlanta[codigo] !== item.Valor
        ) {
          filteredRecords.push(item);
          lastValorByPlanta[codigo] = item.Valor;
        }
      });

      // Mapeamos los registros filtrados a la estructura que necesitamos para la tabla
      const processedRecords = filteredRecords.map((item, index) => {
        const codigoKey = item.CodigoPlanta.toString();
        return {
          id: index + 1,
          fecha: new Date(item.FechaHora).toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          planta: nameMap[codigoKey]?.NombrePlanta || 'No encontrado',
          energia: nameMap[codigoKey]?.TipoGeneracion || 'No encontrado',
          clasificacion:
            nameMap[codigoKey]?.TipoClasificacion || 'No encontrado',
          capacidad: nameMap[codigoKey]?.CapEfectivaNeta || 'No encontrado',
          uMedida: item.UnidadMedida,
          codigoPlanta: item.CodigoPlanta,
          valor: item.Valor,
        };
      });

      setPriceEnergy(processedRecords);
    }
  }, [dataPrice, dataName]);

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12} sx={{ my: 3, textAlign: 'center' }}>
          <Typography variant="h2" color="secondary">
            Valoración de los diferentes mercados de energía en Colombia
          </Typography>
        </Grid>
        <Grid
          size={8}
          sx={{ alignItems: 'center', alignContent: 'center', px: 4 }}
        >
          <Typography variant="h4" fontSize={16} color="#646464">
            La pantalla presenta una tabla consolidada que refleja las
            valoraciones energéticas en Colombia. Cada fila corresponde a una
            planta del sector y detalla su medio de generación, que puede
            incluir fuentes como la hidroeléctrica, eólica, solar, térmica,
            entre otras. Además, se muestran los valores diarios de
            rentabilidad, lo que permite hacer un seguimiento del desempeño
            financiero de cada compañía. Esta herramienta facilita la evaluación
            de la diversificación y eficiencia de las fuentes de energía,
            ofreciendo una visión rápida de las tendencias del mercado y
            ayudando en la toma de decisiones sobre inversiones en el sector
            energético.
          </Typography>
        </Grid>
        <Grid size={4} sx={{ px: 4 }}>
          <img
            src="https://tesy.es/blog/wp-content/uploads/2019/01/energia-renovable-post-769x570.jpg"
            alt="energias"
            width={'100%'}
            loading="lazy"
          />
        </Grid>
        <Grid size={12} sx={{ mt: 4, px: 4 }}>
          <Stack direction="row" spacing={2}>
            <CustomDatatable
              rows={priceEnergy}
              columns={columns}
              onDelete={() => {}}
            />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};
