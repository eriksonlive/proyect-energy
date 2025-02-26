import { Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from 'auth';
import { App } from 'App';
import {
  ComunidadPage,
  CreateInvoicePage,
  CreateSimpleinvoicePage,
  CustomersPage,
  DashboardPage,
  DatosRedElectricaPage,
  EnergiaSolarPage,
  PrediccionEnergiaSolarPage,
} from 'pages';
import { Layout } from 'layout';
import { ProtectedRoute } from './ProtectedRoute';

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
          <Route index element={<DashboardPage />} />
          <Route path="/energia-solar" element={<EnergiaSolarPage />} />
          <Route
            path="/prediccion-energia-solar"
            element={<PrediccionEnergiaSolarPage />}
          />
          <Route path="/comunidad" element={<DatosRedElectricaPage />} />
          <Route path="/red-electrica" element={<ComunidadPage />} />
          <Route path="/simple-invoice" element={<CreateSimpleinvoicePage />} />
          <Route path="/invoice" element={<CreateInvoicePage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </App>
  );
};
