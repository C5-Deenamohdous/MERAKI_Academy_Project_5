import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/products/index";
import adminReducer from "../redux/reducers/admin";
import authReducer from "../redux/reducers/auth";
import commentReducer from "../redux/reducers/comments";
import cartReducer from "../redux/reducers/cart";
import rateReducer from "../redux/reducers/rate";
import userReducer from "../redux/reducers/user";
import WishlistReducer from "../redux/reducers/WishList";
import ordersSlice from "../redux/reducers/orders";
export default configureStore({
  reducer: {
    products: productReducer,
    admin: adminReducer,
    auth: authReducer,
    comment: commentReducer,
    cart: cartReducer,
    rate: rateReducer,
    user: userReducer,
    Wishlist: WishlistReducer,
    orders: ordersSlice,
  },
});
