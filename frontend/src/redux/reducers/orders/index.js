import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
  },
  reducers: {
    setALlOrders: (state, action) => {
      state.allOrders = action.payload;
    },
  },
});

export const { setALlOrders } = orders.actions;

export default orders.reducer;
