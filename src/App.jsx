import {
  Box,
  CircularProgress,
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
import { useEffect, useState } from 'react';
import logo from 'assets/img/logo.webp';

// Usa variables de entorno (no hardcodees claves)
const apimaps = 'AIzaSyAui1rfWcrUzcOdriaVvdwFfJuokvsvtIo';
const domain = 'dev-3hlihodxgyn2r8zl.us.auth0.com';
const clientId = '1lANarpveanHFhy8snJPuolHbMl7p5A8';

const AuthWrapper = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        loginWithRedirect();
      } else {
        setCheckingAuth(false); // Solo cuando el usuario está autenticado, permitimos renderizar
      }
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (isLoading || checkingAuth) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column', // Alinea en columna
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: 150, height: 'auto', marginBottom: 20 }}
        />
        <CircularProgress color="primary" />
      </Box>
    ); // Muestra solo esto mientras se verifica la autenticación
  }

  return children;
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
        <AuthWrapper>
          <ThemeProvider theme={theme(customization)}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <APIProvider apiKey={apimaps}>
                <CssBaseline />
                {children}
              </APIProvider>
            </LocalizationProvider>
          </ThemeProvider>
        </AuthWrapper>
      </Auth0Provider>
    </StyledEngineProvider>
  );
};
