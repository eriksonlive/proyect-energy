import { configureStore } from '@reduxjs/toolkit';

import { themeSlice } from './slices/theme/themeSlice';
import { customSlice } from './slices/custom/customReducer';

export const store = configureStore({
  reducer: {
    themeMode: themeSlice.reducer,
    custom: customSlice.reducer
  }
})