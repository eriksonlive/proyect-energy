import React, { useEffect, useState } from 'react';
import { Box, Grid2 as Grid, Stack, Typography, useTheme } from '@mui/material';
import { Avatar, MainCard } from 'ui-component';
import { Map, ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { usePostByAreaQuery } from 'apis';
import { RoofOrientation } from './direction';
import ChartSolar from './charts/ChartSolar';
import { useDrawingManager } from './use-drawing-manager';
import sunicon from './images/sunicon.png';

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
        area: area,
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
      const totalProd = data.outputs.ac_annual;

      setPolygons((prev) =>
        prev.map((p) =>
          p.id === polygonToUpdate.id ? { ...p, totalProduction: totalProd } : p
        )
      );

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
          <Typography sx={{ fontSize: '16px' }}>
            Nuestra plataforma te permite calcular la energía generada por
            paneles solares en un área específica de interés. Sigue estos pasos
            para obtener información detallada y visualizar los resultados de
            manera dinámica.
          </Typography>

          <Grid container spacing={2}>
            <Grid size={6}>
              <Typography variant="h5" sx={{ my: 2 }}>
                1. Selección del Área en el Mapa
              </Typography>

              <Typography sx={{ fontSize: '16px', my: 2 }}>
                Tras obtener el área, el sistema genera una tarjeta informativa,
                la cual muestra: La energía estimada que puede generar el área
                seleccionada, basada en datos meteorológicos y eficiencia de
                paneles solares. Factores clave como radiación solar y
                orientación, obtenidos de servicios como OpenWeatherMap,
                Simem.co y PVWatts.
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="h5" sx={{ my: 2 }}>
                2. Cálculo de Energía Generada
              </Typography>

              <Typography sx={{ fontSize: '16px', my: 2 }}>
                Tras obtener el área, el sistema genera una tarjeta informativa,
                la cual muestra: La energía estimada que puede generar el área
                seleccionada, basada en datos meteorológicos y eficiencia de
                paneles solares. Factores clave como radiación solar y
                orientación, obtenidos de servicios como OpenWeatherMap,
                Simem.co y PVWatts.
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="h5" sx={{ my: 2 }}>
                3. Visualización de Tarjetas de Generación
              </Typography>

              <Typography sx={{ fontSize: '16px', my: 2 }}>
                Se generarán tarjetas informativas con diferentes
                configuraciones de paneles solares. Cada tarjeta mostrará la
                cantidad estimada de energía producida y una comparación con el
                consumo energético promedio.
              </Typography>
            </Grid>

            <Grid size={6}>
              <Typography variant="h5" sx={{ my: 2 }}>
                4. Gráficos Dinámicos
              </Typography>

              <Typography sx={{ fontSize: '16px', my: 2 }}>
                Selecciona una tarjeta para visualizar gráficos detallados sobre
                la generación de energía a lo largo del tiempo. Explora la
                evolución de la producción en distintos períodos y compara
                diferentes escenarios para optimizar la planificación de tu
                sistema solar.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* Mapa */}
        <Grid size={12}>
          <Stack
            direction="row"
            spacing={3}
            sx={{
              alignContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Map
              style={{ width: '100%', height: '60vh', px: '20' }}
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
        <Grid container size={12}>
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
          <Grid size={6}>
            <Grid container spacing={2}>
              {polygons.map((polygon, index) => (
                <Grid key={index} size={6}>
                  <MainCard
                    onClick={() => handleCardClick(polygon.id)}
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
                        opacity: 0,
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
                        opacity: 0.3,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        border:
                          polygon.id === selectedPolygonId
                            ? '2px solid blue'
                            : '1px solid #ccc',
                        borderRadius: 1,
                        p: 2.25,
                      }}
                    >
                      <Grid container direction="column">
                        <Grid>
                          <Grid container justifyContent="space-between">
                            <Grid>
                              <Avatar
                                alt="D"
                                variant="rounded"
                                sx={{
                                  ...theme.typography.commonAvatar,
                                  ...theme.typography.largeAvatar,
                                  bgcolor: 'secondary.500',
                                  mt: 1,
                                }}
                              >
                                <img
                                  src={sunicon}
                                  alt="Notification"
                                  height="40"
                                  widh="40"
                                />
                              </Avatar>
                            </Grid>
                            <Grid>
                              <Avatar
                                variant="rounded"
                                alt="X"
                                src="Image"
                                sx={{
                                  ...theme.typography.commonAvatar,
                                  ...theme.typography.mediumAvatar,
                                  bgcolor: 'secondary.light',
                                  color: 'secondary',
                                  zIndex: 1,
                                }}
                                aria-controls="menu-earning-card"
                                aria-haspopup="true"
                                //onClick={() => {}}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removePolygon(polygon.id);
                                }}
                              >
                                {/* <MoreHorizIcon fontSize="inherit" /> */}
                              </Avatar>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid>
                          <Grid container alignItems="center">
                            <Grid>
                              <Typography
                                sx={{
                                  fontSize: '1.5rem',
                                  fontWeight: 500,
                                  mr: 1,
                                  mt: 1.75,
                                  mb: 0.75,
                                  color: 'blue',
                                }}
                              >
                                {(polygon.totalProduction / 1000).toFixed(2)}{' '}
                                MWh -Año
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: '1.5rem',
                                  fontWeight: 500,
                                  mr: 1,
                                  mt: 1.75,
                                  mb: 0.75,
                                  color: 'blue',
                                }}
                              >
                                {polygon?.area.toFixed(2)} M2
                              </Typography>
                            </Grid>
                            <Grid>
                              {/*<Avatar
                            alt = "S"
                            src= "images/sun1.png"
                            sx={{
                              cursor: 'pointer',
                              ...theme.typography.smallAvatar,
                              bgcolor: 'secondary.200',
                              color: 'secondary.dark',
                            }}
                          >*/}
                              {/* <ArrowUpwardIcon
                          fontSize="inherit"
                          sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                        /> */}
                              {/* </Avatar>*/}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid sx={{ mb: 1.25 }}>
                          <Typography
                            sx={{
                              fontSize: '1rem',
                              fontWeight: 1000,
                              color: 'secondary.dark',
                            }}
                          >
                            Total Energía Solar Generada
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </MainCard>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};
