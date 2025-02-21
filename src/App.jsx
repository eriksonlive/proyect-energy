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

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

// Usa variables de entorno (no hardcodees claves)
const apimaps = import.meta.env.VITE_API_MAP_KEY;
const domain = 'dev-3hlihodxgyn2r8zl.us.auth0.com';
const clientId = '1lANarpveanHFhy8snJPuolHbMl7p5A8';


// Redirige a login si el usuario no está autenticado
const AuthRedirect = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return null;
};

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
        {/* Se ejecuta solo para redirigir, no debe envolver los hijos */}
        <AuthRedirect />

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
