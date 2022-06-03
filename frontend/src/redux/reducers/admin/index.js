import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],
    category:[],
    Product:[],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    setProduct: (state, action) => {
      state.Product = action.payload;
    },
    addProduct: (state, action) => {
      state.Product.push(action.payload);
    },
  },
});

export const { setAllUsers,setCategory,addCategory,setProduct,addProduct } = admin.actions;

export default admin.reducer;
