import { configureStore } from "@reduxjs/toolkit";
// Ahmad
// Dina
import adminReducer from "../redux/reducers/admin";
export default configureStore({
  reducer: {
    //   Ahmad
    //  Dina
    admin: adminReducer,
  },
});
