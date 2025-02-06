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

export const PrediccionEnergiaSolarPage = () => {
  const theme = useTheme();

  const [showColumn, setShowColumn] = useState(true);

  const contentPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const handleClick = () => {
    setShowColumn(!showColumn);
  };

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" spacing={2}>
            <Typography variant="p">
              A partir de aqui se empiesa a programar
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};
