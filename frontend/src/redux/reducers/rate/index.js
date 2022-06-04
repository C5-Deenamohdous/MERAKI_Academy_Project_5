import { createSlice } from "@reduxjs/toolkit";

export const RateSlice = createSlice({
  name: "rate",
  initialState: {
    rate: [],
  },
  reducers: {
    addRate: (state, action) => {
      state.rate = [...state.rate, action.payload];
    },
    setRate:(state,action) => {
      state.rate = action.payload
    }
  },
});

export const { addRate ,setRate} = RateSlice.actions;

export default RateSlice.reducer;