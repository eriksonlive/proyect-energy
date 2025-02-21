import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainCard } from 'ui-component';
import { useDrawingManager } from './use-drawing-manager';
import { Map, ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { CustomDatatable } from 'components';
import { usePostByAreaQuery } from 'apis';
import { RoofOrientation } from './direction';

export const PrediccionEnergiaSolarPage = () => {
  const drawingManager = useDrawingManager();
  const [polygons, setPolygons] = useState([]);
  const [dataWatts, setDataWatts] = useState({});
  const [polygonOverlays, setPolygonOverlays] = useState([]);

  const { data, error, isLoading } = usePostByAreaQuery(dataWatts);

  // Configuración de las columnas de la tabla
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'area', headerName: 'Área (m²)', width: 150 },
    {
      field: 'coordinates',
      headerName: 'Coordenadas',
      width: 600,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ marginTop: '15px' }}>
          {params.value
            .map(
              (coord) => `(${coord.lat.toFixed(8)}, ${coord.lng.toFixed(8)})`
            )
            .join(' | ')}
        </Typography>
      ),
    },
    { field: 'actions', headerName: 'Acciones', width: 150 },
  ];

  // Captura el evento cuando se crea un polígono
  const handleOverlayComplete = (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;
      const pathArray = polygon.getPath().getArray();
      const area = google.maps.geometry.spherical.computeArea(pathArray);

      const path = pathArray.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      const coordinates = RoofOrientation(path); //Calculo las coordenadas a partir del Path del Polygono

      setPolygonOverlays((prev) => [...prev, polygon]);
      setPolygons((prev) => [
        ...prev,
        {
          id: Date.now(),
          area: area.toFixed(2),
          coordinates: path,
          overlay: polygon,
          orientation: coordinates.azimuth,
          // kw: area.toFixed(2) * 0.2
        },
      ]);

      console.log(coordinates.azimuth)

      setDataWatts({
        system_capacity: area.toFixed(2) * 0.2,
        module_type: '0',
        losses: '10',
        array_type: '1',
        tilt: '9',
        azimuth: '21',
        lat: '6.1824',
        lon: '-75.5681',
      });
    }
  };

  // Elimina un polígono de la lista y del mapa
  const removePolygon = (polygonId) => {
    setPolygons((prev) => prev.filter((p) => p.id !== polygonId));

    setPolygonOverlays((prev) =>
      prev.filter((polygon) => {
        const match = polygons.find((p) => p.id === polygonId);
        if (match?.overlay) {
          match.overlay.setMap(null);
        }
        return polygon !== match?.overlay;
      })
    );
  };

  useEffect(() => {
    if (drawingManager) {
      const listener = google.maps.event.addListener(
        drawingManager,
        'overlaycomplete',
        handleOverlayComplete
      );
      return () => google.maps.event.removeListener(listener);
    }
  }, [drawingManager]);

  console.log(data);

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="column" spacing={3}>
            <Typography variant="h1">
              Sistema de Cálculo de Energía Solar
            </Typography>
            <Typography variant="body1">
              Dibuje un polígono en el mapa para calcular la producción de
              energía solar en ese área.
            </Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <Stack direction="row" spacing={3}>
            <Map
              style={{ width: '100vw', height: '100vh' }}
              defaultCenter={{ lat: 6.254933, lng: -75.605875 }}
              defaultZoom={12}
              onLoad={(map) => {
                if (drawingManager) {
                  drawingManager.setMap(map);
                  google.maps.event.addListener(
                    drawingManager,
                    'overlaycomplete',
                    handleOverlayComplete
                  );
                }
              }}
            />
            <MapControl position={ControlPosition.TOP_CENTER} />
          </Stack>
        </Grid>

        <Grid size={12}>
          <Typography variant="h2">Polígonos creados</Typography>
          <CustomDatatable
            rows={polygons}
            columns={columns}
            onDelete={removePolygon}
          />
        </Grid>
      </Grid>
    </MainCard>
  );
};
