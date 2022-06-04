import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    productInCart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      state.productInCart = state.cart.map((element) => {
        return element.product_id;
      });
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, ...action.payload];
    },
    setProductInCart: (state, action) => {
      state.productInCart = action.payload;
    },
  },
});

export const { addToCart, setCart} = cartSlice.actions;

export default cartSlice.reducer;
