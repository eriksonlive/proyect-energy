import { configureStore } from '@reduxjs/toolkit';

import { themeSlice } from './slices/theme/themeSlice';
import { customSlice } from './slices/custom/customReducer';
import { pokemonApi, pvWatts, energiaSolar } from 'apis';

export const store = configureStore({
  reducer: {
    themeMode: themeSlice.reducer,
    custom: customSlice.reducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [pvWatts.reducerPath]: pvWatts.reducer,
    [energiaSolar.reducerPath]: energiaSolar.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      pokemonApi.middleware,
      pvWatts.middleware,
      energiaSolar.middleware
    ),
});
