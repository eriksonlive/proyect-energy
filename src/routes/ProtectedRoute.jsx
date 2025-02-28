import { useLocation, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import logo from 'assets/img/logo1.webp';
import { useSelector } from 'react-redux';
import { isAuthenticated, selectToken } from 'store/slices/auth/authSlice';

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = useSelector(selectToken);
  const isAutenticated = useSelector(isAuthenticated);

  useEffect(() => {
    if (!isAutenticated && !token) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [token, location, navigate, isAutenticated]);

  if (!token && !isAutenticated) {
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
