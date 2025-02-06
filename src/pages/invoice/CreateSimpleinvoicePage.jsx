import {
  Button,
  Divider,
  Grid2 as Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { CustomDatatable, CustomField } from 'components';
import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { MainCard } from 'ui-component';
import { FacturaSimple } from '.';

export const CreateSimpleinvoicePage = () => {
  const theme = useTheme();

  const [showColumn, setShowColumn] = useState(true);

  const contentPrint = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentPrint.current,
  });

  const handleClick = () => {
    setShowColumn(!showColumn);
  };

  return <MainCard></MainCard>;
};
