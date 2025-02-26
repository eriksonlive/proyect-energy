import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import logo from 'assets/img/logo1.webp';

export const ProtectedRoute = ({ children }) => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Capturamos la ruta actual y la pasamos en appState
        loginWithRedirect({
          appState: { targetUrl: location.pathname },
        });
      } else {
        setCheckingAuth(false);
      }
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, location.pathname]);

  if (isLoading || checkingAuth) {
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ width: 400, height: 'auto', marginBottom: 20 }}
        />
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return children;
};
