import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    completedOrders: [],
  },
  reducers: {
    setALlOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setCompletedOrders: (state, action) => {
      state.completedOrders = action.payload;
    },
  },
});

export const { setALlOrders, setCompletedOrders } = orders.actions;

export default orders.reducer;
