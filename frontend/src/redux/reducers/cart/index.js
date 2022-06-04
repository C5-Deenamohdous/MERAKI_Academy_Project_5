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
      state.productInCart = [...state.productInCart, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (element) => element.id !== action.payload
      );

      state.productInCart = state.productInCart.filter(
        (element) => element !== action.payload
      );
    },
  },
});

export const { addToCart, setCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
