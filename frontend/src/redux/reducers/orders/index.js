import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    completedOrders: [],
    allUnCompleted: [],
    oneOrderDetails: [],
  },
  reducers: {
    setALlOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setCompletedOrders: (state, action) => {
      state.completedOrders = action.payload;
    },
    setAllUnCompleted: (state, action) => {
      state.allUnCompleted = action.payload;
    },
    setOneOrderDetails: (state, action) => {
      state.oneOrderDetails = action.payload;
    },
  },
});

export const {
  setALlOrders,
  setCompletedOrders,
  setAllUnCompleted,
  setOneOrderDetails,
} = orders.actions;

export default orders.reducer;
