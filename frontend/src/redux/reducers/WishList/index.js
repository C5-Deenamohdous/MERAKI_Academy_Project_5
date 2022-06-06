import { createSlice } from "@reduxjs/toolkit";
export const WishlistSlice = createSlice({
    name: "Wishlist",
    initialState: {
      Wishlist: [],
      productInWishlist: [],
    },
    reducers: {
      setWishlist: (state, action) => {
        state.Wishlist = action.payload;
        state.productInWishlist = state.Wishlist.map((element) => {
          return element.product_id;
        });
      },
      addToWishlist: (state, action) => {
        state.Wishlist = [...state.Wishlist, action.payload];
        state.productInWishlist = state.Wishlist.map((element) => {
          return element.product_id;
        });
      },
      removeFromWishlist: (state, action) => {
        state.Wishlist = state.Wishlist.filter((element) => {
          return element.product_id !== action.payload.product_id;
        });
        state.productInWishlist = state.productInWishlist.filter((element) => {
          return element !== action.payload.product_id;
        });
      },
    },
  });
  
  export const { addToWishlist, setWishlist, removeFromWishlist } =
    WishlistSlice.actions;
  
  export default WishlistSlice.reducer;
  
