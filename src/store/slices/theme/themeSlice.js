import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDarkMode: false
}

export const themeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    selectorMode: (state, payload) => {
      state.isDarkMode = !payload
    },
  }
})

export const { selectorMode } = themeSlice.actions;