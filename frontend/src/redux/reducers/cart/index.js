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
      state.cart = [...state.cart, action.payload];
      state.productInCart = state.cart.map((element) => {
        return element.product_id;
      });
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((element) => {
        return element.product_id !== action.payload.product_id;
      });
      state.productInCart = state.productInCart.filter((element) => {
        return element !== action.payload.product_id;
      });
    },
  },
});

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
