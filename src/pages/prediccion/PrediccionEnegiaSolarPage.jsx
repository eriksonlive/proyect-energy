import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid2 as Grid,
  Stack,
  Typography,
  CircularProgress,
  useTheme,
  Menu,
  MenuItem,
} from '@mui/material';
import { Avatar, MainCard } from 'ui-component';
import { Map, ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { usePostByAreaQuery } from 'apis';
import { RoofOrientation } from './direction';
import ChartSolar from './charts/ChartSolar';
import { useDrawingManager } from './use-drawing-manager';

export const PrediccionEnergiaSolarPage = () => {
  const drawingManager = useDrawingManager();
  const [polygons, setPolygons] = useState([]);
  const [dataWatts, setDataWatts] = useState({});
  const [selectedPolygonId, setSelectedPolygonId] = useState(null);
  const [chartData, setChartData] = useState([]);
  const { data } = usePostByAreaQuery(dataWatts);
  const theme = useTheme();

  // Registrar el listener para el dibujo
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

  // Manejar la finalización del dibujo de un polígono
  const handleOverlayComplete = (event) => {
    if (event.type === google.maps.drawing.OverlayType.POLYGON) {
      const polygon = event.overlay;
      const pathArray = polygon.getPath().getArray();
      const area = google.maps.geometry.spherical.computeArea(pathArray);
      const path = pathArray.map((latLng) => ({
        lat: latLng.lat(),
        lng: latLng.lng(),
      }));

      // Calcula información adicional (orientación y centro)
      const coordinates = RoofOrientation(path);

      const newPolygon = {
        id: Date.now(),
        area: area.toFixed(2),
        coordinates: path,
        overlay: polygon,
        apiData: null,
      };

      setPolygons((prev) => [...prev, newPolygon]);
      setDataWatts({
        system_capacity: (area * 0.2).toFixed(2),
        module_type: '0',
        losses: '10',
        array_type: '1',
        tilt: '9',
        azimuth: coordinates.azimuth,
        lat: coordinates.lat,
        lon: coordinates.lon,
      });
    }
  };

  // Efecto: Cuando llega la data de la API, actualizar el primer polígono sin data
  useEffect(() => {
    if (data) {
      // Buscar el primer polígono sin datos API
      const polygonToUpdate = polygons.find((p) => p.apiData === null);
      if (polygonToUpdate) {
        const monthNames = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        const extractedData = data.outputs.ac_monthly.map((value, index) => ({
          month: monthNames[index],
          production: value,
        }));

        setPolygons((prev) =>
          prev.map((p) =>
            p.id === polygonToUpdate.id ? { ...p, apiData: extractedData } : p
          )
        );
        // Opcional: si no hay selección previa, auto-seleccionar este polígono
        if (!selectedPolygonId) {
          setSelectedPolygonId(polygonToUpdate.id);
        }
      }
    }
  }, [data]); // Se dispara cuando llega data

  // Efecto: Actualizar el gráfico cuando cambie el polígono seleccionado o su data
  const selectedPolygon = polygons.find((p) => p.id === selectedPolygonId);
  useEffect(() => {
    if (selectedPolygon && selectedPolygon.apiData) {
      setChartData(selectedPolygon.apiData);
    } else {
      setChartData([]);
    }
  }, [selectedPolygon?.apiData, selectedPolygonId]);

  // Cambiar la selección al hacer click en una tarjeta
  const handleCardClick = (polygonId) => {
    setSelectedPolygonId(polygonId);
  };

  // Remover un polígono y limpiar la selección si es el seleccionado
  const removePolygon = (polygonId) => {
    setPolygons((prev) => prev.filter((p) => p.id !== polygonId));
    const polygonToRemove = polygons.find((p) => p.id === polygonId);
    if (polygonToRemove?.overlay) {
      polygonToRemove.overlay.setMap(null);
    }
    if (selectedPolygonId === polygonId) {
      setSelectedPolygonId(null);
      setChartData([]);
    }
  };

  return (
    <MainCard>
      <Grid container spacing={2} sx={{ px: 2 }}>
        {/* Título e instrucciones */}
        <Grid size={12}>
          <Stack
            direction="column"
            spacing={3}
            sx={{ py: 3, textAlign: 'center' }}
          >
            <Typography variant="h2" color="secondary">
              Sistema de Cálculo de Energía Solar
            </Typography>
          </Stack>
          <Typography>
            Dibuja un polígono en el mapa para evaluar el potencial de energía
            solar. Luego, selecciona una tarjeta para ver sus datos reflejados
            en la gráfica.
          </Typography>
        </Grid>

        {/* Mapa */}
        <Grid size={6}>
          <Stack direction="row" spacing={3}>
            <Map
              style={{ width: '100%', height: '60vh' }}
              defaultCenter={{ lat: 6.254933, lng: -75.605875 }}
              defaultZoom={16}
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

        {/* Gráfica */}
        <Grid size={6}>
          {chartData && chartData.length > 0 ? (
            <ChartSolar solarData={chartData} />
          ) : (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <Typography>Sin datos por mostrar</Typography>
            </Box>
          )}
        </Grid>

        {/* Tarjetas de polígonos */}
        <Grid size={12}>
          <Grid container spacing={2}>
            {polygons.map((polygon) => (
              <Grid size={4} key={polygon.id}>
                <Box
                  onClick={() => handleCardClick(polygon.id)}
                  sx={{
                    border:
                      polygon.id === selectedPolygonId
                        ? '2px solid blue'
                        : '1px solid #ccc',
                    borderRadius: 1,
                    p: 2,
                    mb: 2,
                    cursor: 'pointer',
                  }}
                >
                  <Typography variant="h6">
                    Polígono ID: {polygon.id}
                  </Typography>
                  <Typography>Área: {polygon.area} m²</Typography>
                  <Typography>
                    Coordenadas:{' '}
                    {polygon.coordinates
                      .map(
                        (coord) =>
                          `(${coord.lat.toFixed(4)}, ${coord.lng.toFixed(4)})`
                      )
                      .join(' | ')}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {polygon.apiData ? (
                      <Typography variant="body2">
                        Datos API: {JSON.stringify(polygon.apiData)}
                      </Typography>
                    ) : (
                      <Typography variant="body2">Cargando datos...</Typography>
                    )}
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removePolygon(polygon.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </Box>
                </Box>
              </Grid>
            ))}
            <Grid size={4}>
              <MainCard
                border={false}
                content={false}
                sx={{
                  bgcolor: 'primary.light',
                  color: '#fff',
                  overflow: 'hidden',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -105, sm: -85 },
                    right: { xs: -140, sm: -95 },
                  },
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: 210,
                    height: 210,
                    background: theme.palette.secondary[800],
                    borderRadius: '50%',
                    top: { xs: -155, sm: -125 },
                    right: { xs: -70, sm: -15 },
                    opacity: 0.5,
                  },
                }}
              >
                <Box sx={{ p: 2.25 }}>
                  <Grid container direction="column">
                    <Grid>
                      <Grid container justifyContent="space-between">
                        <Grid>
                          <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.largeAvatar,
                              bgcolor: 'secondary.500',
                              mt: 1,
                            }}
                          >
                            {/* <img src={null} alt="Notification" /> */}
                          </Avatar>
                        </Grid>
                        <Grid>
                          <Avatar
                            variant="rounded"
                            sx={{
                              ...theme.typography.commonAvatar,
                              ...theme.typography.mediumAvatar,
                              bgcolor: 'secondary.light',
                              color: 'secondary.200',
                              zIndex: 1,
                            }}
                            aria-controls="menu-earning-card"
                            aria-haspopup="true"
                            onClick={() => {}}
                          >
                            {/* <MoreHorizIcon fontSize="inherit" /> */}
                          </Avatar>
                          {/* <Menu
                        id="menu-earning-card"
                        // anchorEl={anchorEl}
                        keepMounted
                        // open={Boolean(anchorEl)}
                        onClose={handleClose}
                        variant="selectedMenu"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                      >
                        <MenuItem onClick={handleClose}>
                          <GetAppTwoToneIcon sx={{ mr: 1.75 }} /> Import Card
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Data
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <PictureAsPdfTwoToneIcon sx={{ mr: 1.75 }} /> Export
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ArchiveTwoToneIcon sx={{ mr: 1.75 }} /> Archive File
                        </MenuItem>
                      </Menu> */}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid container alignItems="center">
                        <Grid>
                          <Typography
                            sx={{
                              fontSize: '2.125rem',
                              fontWeight: 500,
                              mr: 1,
                              mt: 1.75,
                              mb: 0.75,
                            }}
                          >
                            $100.00
                          </Typography>
                        </Grid>
                        <Grid>
                          <Avatar
                            sx={{
                              cursor: 'pointer',
                              ...theme.typography.smallAvatar,
                              bgcolor: 'secondary.200',
                              color: 'secondary.dark',
                            }}
                          >
                            {/* <ArrowUpwardIcon
                          fontSize="inherit"
                          sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                        /> */}
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid sx={{ mb: 1.25 }}>
                      <Typography
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 500,
                          color: 'secondary.200',
                        }}
                      >
                        Total Earning
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};
