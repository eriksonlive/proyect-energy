import {
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useGetEnergyDataNameQuery, useGetPriceEnergyDataQuery } from 'apis';
import { CustomDatatable, CustomModal, VerticalTabs } from 'components';
import { CreateCustomerForm } from 'forms';

import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MainCard } from 'ui-component';

export const ComunidadPage = () => {
  const theme = useTheme();

  const [priceEnergy, setPriceEnergy] = useState([]);

  const { data: dataPrice, isLoading, isError } = useGetPriceEnergyDataQuery();
  const { data: dataName } = useGetEnergyDataNameQuery();

  const columns = [
    { field: 'fecha', headerName: 'Fecha', width: 100 },
    { field: 'empresa', headerName: 'Empresa', width: 200 },
    { field: 'energia', headerName: 'Tipo energía', width: 100 },
    { field: 'codigoPlanta', headerName: 'Código planta', width: 100 },
    { field: 'clasificacion', headerName: 'Clasificación', width: 150 },
    { field: 'capacidad', headerName: 'Capacidad efectiva neta', width: 150 },
    { field: 'uMedida', headerName: 'Unidad de medida', width: 150 },
    { field: 'valor', headerName: 'Valor', width: 100 },
  ];

  const [showColumn, setShowColumn] = useState(true);

  const contentPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const handleClick = () => {
    setShowColumn(!showColumn);
  };

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
          empresa: nameMap[codigoKey]?.NombrePlanta || 'No encontrado',
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
    <>
      <MainCard>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Stack direction="row" spacing={2}>
              <Divider />
              <CreateCustomerForm />
            </Stack>
          </Grid>
        </Grid>
      </MainCard>
      <MainCard sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid size={12}>
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
    </>
  );
};
