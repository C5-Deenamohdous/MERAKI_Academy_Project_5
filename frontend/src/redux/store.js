import { configureStore } from "@reduxjs/toolkit";
import products from "./reducers/products";
// Ahmad
import productReducer from "./reducers/products/index"
// Taha
export default configureStore({
  reducer: {
    //   Ahmad
  products:productReducer,
    // Taha
  },
});
