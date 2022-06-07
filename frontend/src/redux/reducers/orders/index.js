import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    completedOrders: [],
    allUnCompleted: [],
    oneOrderDetails: [],
    allUSerOrders: [],
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
    setAllUserOrders: (state, action) => {
      state.allUSerOrders = action.payload;
    },
  },
});

export const {
  setALlOrders,
  setCompletedOrders,
  setAllUnCompleted,
  setOneOrderDetails,
  setAllUserOrders,
} = orders.actions;

export default orders.reducer;
