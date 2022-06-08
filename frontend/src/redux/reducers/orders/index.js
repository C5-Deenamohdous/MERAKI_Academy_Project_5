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
    statusInsideDetail: "",
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
    setStatusInsideDetail: (state, action) => {
      state.statusInsideDetail = action.payload;
    },
    makeOrderCompleted: (state, action) => {
      console.log(action, "=====");
      state.allOrders = state.allOrders.map((element) => {
        if (element.id === action.payload.id) {
          return { ...element, orderStatus: action.payload.status };
        }
        return element;
      });
      state.allUnCompleted = state.allUnCompleted.filter((element) => {
        return element.id !== action.payload.id;
      });
    },
    makeOrderUnCompleted: (state, action) => {
      state.allOrders = state.allOrders.map((element) => {
        if (element.id === action.payload.id) {
          return { ...element, orderStatus: action.payload.status };
        }
        return element;
      });
      state.completedOrders = state.completedOrders.filter((element) => {
        return element.id !== action.payload.id;
      });
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
  setStatusInsideDetail,
  makeOrderCompleted,
  makeOrderUnCompleted,
} = orders.actions;

export default orders.reducer;
