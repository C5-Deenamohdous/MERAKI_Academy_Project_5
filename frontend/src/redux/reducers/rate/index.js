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
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    updateRate: (state, action) => {
      state.rate = state.rate.map((element) => {
        if (element.user_id == action.payload.user_id) {
          return { ...element, value: action.payload.value };
        }
        return element;
      });
    },
  },
});

export const { addRate, setRate, updateRate } = RateSlice.actions;

export default RateSlice.reducer;
