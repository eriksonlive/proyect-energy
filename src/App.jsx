import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { theme } from 'theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { APIProvider } from '@vis.gl/react-google-maps';
import 'assets/scss/style.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';

// Usa variables de entorno (no hardcodees claves)
const apimaps = 'AIzaSyAui1rfWcrUzcOdriaVvdwFfJuokvsvtIo';

export const App = ({ children }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <APIProvider apiKey={apimaps}>
            <CssBaseline />
            {children}
          </APIProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
