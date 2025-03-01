import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { themeSlice } from './slices/theme/themeSlice';
import { customSlice } from './slices/custom/customReducer';
import { authSlice } from './slices/auth/authSlice';
import { pokemonApi, pvWatts, energiaSolar, authApi, login } from 'apis';

// Combina tus reducers en uno solo
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  themeMode: themeSlice.reducer,
  custom: customSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  [pvWatts.reducerPath]: pvWatts.reducer,
  [energiaSolar.reducerPath]: energiaSolar.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [login.reducerPath]: login.reducer,
});

// Configuración de redux-persist (en este caso, persistimos solo el slice de "auth")
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'custom'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura el store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignora las acciones de redux-persist para evitar warnings
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/FLUSH',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(
      pokemonApi.middleware,
      pvWatts.middleware,
      energiaSolar.middleware,
      authApi.middleware,
      login.middleware
    ),
});

// Exporta también el persistor para envolver la app en PersistGate
export const persistor = persistStore(store);
