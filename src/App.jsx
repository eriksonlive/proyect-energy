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

import { Auth0Provider } from '@auth0/auth0-react';

// Usa variables de entorno (no hardcodees claves)
const apimaps = 'AIzaSyAui1rfWcrUzcOdriaVvdwFfJuokvsvtIo';
const domain = 'dev-3hlihodxgyn2r8zl.us.auth0.com';
const clientId = '1lANarpveanHFhy8snJPuolHbMl7p5A8';

export const App = ({ children }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <ThemeProvider theme={theme(customization)}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <APIProvider apiKey={apimaps}>
              <CssBaseline />
              {children}
            </APIProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </Auth0Provider>
    </StyledEngineProvider>
  );
};
