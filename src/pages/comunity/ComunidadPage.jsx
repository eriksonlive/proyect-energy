import {
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { CustomModal, VerticalTabs } from 'components';
import { CreateCustomerForm } from 'forms';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MainCard } from 'ui-component';

export const ComunidadPage = () => {
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
            <Divider />
            <CreateCustomerForm />
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};
