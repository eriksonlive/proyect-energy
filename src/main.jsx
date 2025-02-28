import React from 'react';
import ReactDOM from 'react-dom/client';
import 'index.css';
import { Provider } from 'react-redux';
import { store, persistor } from 'store';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from 'routes';
import { PersistGate } from 'redux-persist/es/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
