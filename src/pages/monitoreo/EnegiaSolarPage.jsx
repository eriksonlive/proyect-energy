import { Grid2 as Grid, Stack, useTheme } from '@mui/material';
import { CustomDatatable } from 'components';

import { MainCard } from 'ui-component';

export const EnergiaSolarPage = () => {
  const theme = useTheme();

  return (
    <iframe
      src="https://energytalento.tech/grafana/public-dashboards/01c3138b0cd045238eac86215fcf4663"
      width={'100%'}
      height={'100%'}
      frameborder="0"
    ></iframe>
  );
};
