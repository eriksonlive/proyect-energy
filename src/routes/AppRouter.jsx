import { Route, Routes } from 'react-router';
import { LoginPage, RegisterPage } from 'auth';
import { App } from 'App';
import {
  CreateInvoicePage,
  CreateSimpleinvoicePage,
  CustomersPage,
  DashboardPage,
} from 'pages';
import { Layout } from 'layout';

export const AppRouter = () => {
  return (
    <App>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/invoice" element={<CreateInvoicePage />} />
          <Route path="/simple-invoice" element={<CreateSimpleinvoicePage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </App>
  );
};
