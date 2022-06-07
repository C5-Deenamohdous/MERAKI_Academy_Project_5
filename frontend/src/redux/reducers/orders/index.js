import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    completedOrders: [],
    allUnCompleted: [],
    oneOrderDetails: [],
    allUSerOrders: [],
    allCompletedForUser: [],
    allUnCompletedForUser: [],
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
    setAllCompletedForUser: (state, action) => {
      state.allCompletedForUser = action.payload;
    },
    setAllUnCompletedForUser: (state, action) => {
      state.allUnCompletedForUser = action.payload;
    },
  },
});

export const {
  setALlOrders,
  setCompletedOrders,
  setAllUnCompleted,
  setOneOrderDetails,
  setAllUserOrders,
  setAllCompletedForUser,
  setAllUnCompletedForUser,
} = orders.actions;

export default orders.reducer;
