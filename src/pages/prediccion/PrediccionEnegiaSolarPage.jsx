import {
  Button,
  Grid2 as Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MainCard } from 'ui-component';
import {DrawingExample} from './drawing-example';
import {UndoRedoControl} from './undo-redo-control'; //Importacion de los controles del mapa 
import {useDrawingManager} from './use-drawing-manager'; //Importacion de los controles del mapa
import {ControlPanel} from './control-panel'; //Importacion de panel de control para dibujo del mapa

import {createRoot} from 'react-dom/client'; //Imports de React Maps API.
import {Map, ControlPosition,MapControl} from '@vis.gl/react-google-maps'; //Imports de React Maps API


const API_KEY = globalThis.GOOGLE_MAPS_API_KEY;  //TSX

export const PrediccionEnergiaSolarPage = () => {
  const theme = useTheme();
  const drawingManager = useDrawingManager();

  const [showColumn, setShowColumn] = useState(true);

  const contentPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const handleClick = () => {
    setShowColumn(!showColumn);
  };
/*
  <APIProvider apiKey={API_KEY}>
    <Map
      style={{width: '100vw', height: '100vh'}}
      defaultCenter={{lat: 22.54992, lng: 0}}
      defaultZoom={3}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
    />
  </APIProvider>
*/

  return (

    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="column" spacing={3}>
            <Typography variant="h1">
              Sistema de Calculo de Energía Solar. 
            </Typography>
            <Typography variant="p">
              El sistema de calculo avanzado permite proyectar la producción de su sistema de energía solar,
              simplemente busque en el mapa el sitio donde desearía instalar el sistema. 
            </Typography>            
          </Stack>
        </Grid>
        <Grid size={12}>
          <Stack direction="row" spacing={3}>
            
            <Map
                  style={{width: '50vw', height: '50vh'}}
                  defaultCenter={{lat: 6.254933, lng: -75.605875}}
                  defaultZoom={12}

                  gestureHandling={'greedy'}
                  disableDefaultUI={true}
                />                     
                <MapControl position={ControlPosition.TOP_CENTER}>
                <UndoRedoControl drawingManager={drawingManager} />
                </MapControl>
            
          </Stack>
        </Grid>
      </Grid>
    </MainCard>

  );
};


