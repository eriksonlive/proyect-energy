import { createSlice } from '@reduxjs/toolkit';
import config from 'config/config';

const initialState = {
  isOpen: [],
  open: true,
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  mode: false,
};

export const customSlice = createSlice({
  name: 'customSlice',
  initialState,
  reducers: {
    isOpenMenu: (state) => {
      state.open = !state.open;
    },
    selectedMenu: (state, action) => {
      state.isOpen = [action.payload];
    },
    fontState: (state, action) => {
      state.fontFamily = action.payload;
    },
    borderState: (state, action) => {
      state.borderRadius = action.payload;
    },
    modeState: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const { isOpenMenu, fontState, borderState, selectedMenu, modeState } =
  customSlice.actions;
