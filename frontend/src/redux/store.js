import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/products/index"
import adminReducer from "../redux/reducers/admin";

export default configureStore({
  reducer: {
  products:productReducer,
  admin: adminReducer,
  },
});
