import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainCard } from 'ui-component';
import { useDrawingManager } from './use-drawing-manager'; // Hook del Drawing Manager
import { Map, ControlPosition, MapControl } from '@vis.gl/react-google-maps'; // React Google Maps API

export const PrediccionEnergiaSolarPage = () => {
  const drawingManager = useDrawingManager();
  const [polygons, setPolygons] = useState([]); // Estado de polígonos
  const [polygonOverlays, setPolygonOverlays] = useState([]); // Estado de referencias en el mapa

  // ✅ Captura el evento de dibujo cuando se completa un polígono
  const handleOverlayComplete = (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay; // Obtiene el polígono dibujado
      const pathArray = polygon.getPath().getArray(); // Obtiene coordenadas

      // Calcula el área del polígono
      const area = google.maps.geometry.spherical.computeArea(pathArray);

      // Guarda las coordenadas
      const path = pathArray.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      // Agregar el polígono a la lista de overlays y al estado
      setPolygonOverlays((prev) => [...prev, polygon]);
      setPolygons((prev) => [
        ...prev,
        { id: Date.now(), area, path, overlay: polygon },
      ]);
    }
  };

  // ✅ Elimina un polígono del estado y del mapa
  const removePolygon = (polygonId) => {
    // Eliminar del estado de polígonos
    setPolygons((prev) => prev.filter((p) => p.id !== polygonId));

    // Eliminar del mapa y del estado de overlays
    setPolygonOverlays((prev) =>
      prev.filter((polygon) => {
        const match = polygons.find((p) => p.id === polygonId);
        if (match && match.overlay) {
          match.overlay.setMap(null); // Eliminar del mapa correctamente
        }
        return polygon !== match?.overlay; // Filtrar correctamente
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
      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [drawingManager]);

  // console.log(polygons);

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="column" spacing={3}>
            <Typography variant="h1">
              Sistema de Cálculo de Energía Solar
            </Typography>
            <Typography variant="p">
              Dibuje un polígono en el mapa para calcular la producción de
              energía solar en ese área.
            </Typography>
          </Stack>
        </Grid>

        <Grid size={12}>
          <Stack direction="row" spacing={3}>
            {/* Mapa */}
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

            {/* Controles del mapa */}
            <MapControl position={ControlPosition.TOP_CENTER} />
          </Stack>
        </Grid>

        {/* Lista de polígonos creados */}
        <Grid size={12}>
          <Typography variant="h2">Polígonos creados</Typography>
          {polygons.map((polygon) => (
            <Box component="div" key={polygon.id}>
              <Typography variant="p">
                Área: {polygon.area.toFixed(2)} m²
              </Typography>
              <Button color="error" onClick={() => removePolygon(polygon.id)}>
                Eliminar
              </Button>
            </Box>
          ))}
        </Grid>
      </Grid>
    </MainCard>
  );
};
