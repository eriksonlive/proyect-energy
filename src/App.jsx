import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { theme } from 'theme';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'assets/scss/style.scss';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-3hlihodxgyn2r8zl.us.auth0.com';
const clientId = 'JT6yEUdNHx4aAnvXeLGsFocK7HYqdqI8';

export const App = ({ children }) => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: 'https://8e18-190-217-57-66.ngrok-free.app',
        }}
      >
        <ThemeProvider theme={theme(customization)}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <CssBaseline />
            {children}
          </LocalizationProvider>
        </ThemeProvider>
      </Auth0Provider>
    </StyledEngineProvider>
  );
};
