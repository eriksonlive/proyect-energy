import { Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from 'auth';
import { App } from 'App';
import {
  ComunidadPage,
  CreateInvoicePage,
  CreateSimpleinvoicePage,
  CustomersPage,
  DashboardPage,
  EnergiaSolarPage,
  PrediccionEnergiaSolarPage,
  EnergiasRenovables,
  ValoracionEnergias,
} from 'pages';
import { Layout } from 'layout';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { Navigate } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <App>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/energia-solar" element={<EnergiaSolarPage />} />
          <Route
            path="/prediccion-energia-solar"
            element={<PrediccionEnergiaSolarPage />}
          />
          <Route path="/energias-renovables" element={<EnergiasRenovables />} />
          <Route path="/valoracion-energia" element={<ValoracionEnergias />} />
          <Route path="/comunidad" element={<ComunidadPage />} />
          <Route path="/simple-invoice" element={<CreateSimpleinvoicePage />} />
          <Route path="/invoice" element={<CreateInvoicePage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Route>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
      </Routes>
    </App>
  );
};
