import { Grid2 as Grid, useTheme } from '@mui/material';
import { CustomDatatable } from 'components';
import { useState } from 'react';
import { MainCard } from 'ui-component';

export const CreateSimpleinvoicePage = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  const columns = [{ field: 'fecha', headerName: 'Fecha', width: 100 }];

  return (
    <MainCard>
      <CustomDatatable columns={columns} rows={rows} />
    </MainCard>
  );
};
