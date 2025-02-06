import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { Provider } from 'react-redux';
import { store } from 'store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
