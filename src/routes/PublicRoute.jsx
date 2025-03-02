import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from 'store/slices/auth/authSlice';

export const PublicRoute = ({ children }) => {
  const isAutenticated = useSelector(isAuthenticated);

  // Si está autenticado, redirige a la página principal (dashboard u otra)
  return isAutenticated ? <Navigate to="/" replace /> : children;
};
