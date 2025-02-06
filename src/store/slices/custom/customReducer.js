import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: true,
};

export const customSlice = createSlice({
  name: "customSlice",
  initialState,
  reducers: {
    isOpenMenu: (state, payload) => {
      state.open = !state.open;
    },
  },
});

export const { isOpenMenu } = customSlice.actions;
