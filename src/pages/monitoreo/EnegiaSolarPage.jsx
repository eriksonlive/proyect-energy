import { Grid2 as Grid, Stack, useTheme } from '@mui/material';
import { CustomDatatable } from 'components';

import { MainCard } from 'ui-component';

export const EnergiaSolarPage = () => {
  const theme = useTheme();

  return (
    <MainCard>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Stack direction="row" spacing={2}>
            {/* <CustomDatatable /> */}
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
};
