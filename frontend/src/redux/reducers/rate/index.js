import { createSlice } from "@reduxjs/toolkit";

export const RateSlice = createSlice({
  name: "rate",
  initialState: {
    rate: [],
  },
  reducers: {
    addRate: (state, action) => {
      state.cart = [...state.rate, ...action.payload];
    },
  },
});

export const { addRate } = RateSlice.actions;

export default RateSlice.reducer;