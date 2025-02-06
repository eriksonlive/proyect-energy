import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { theme } from 'theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'assets/scss/style.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';

export const App = ({ children }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
