import { createSlice } from "@reduxjs/toolkit";

export const orders = createSlice({
  name: "orders",
  initialState: {
    allOrders: [],
    completedOrders: [],
    allUnCompleted: [],
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
  },
});

export const { setALlOrders, setCompletedOrders, setAllUnCompleted } =
  orders.actions;

export default orders.reducer;
