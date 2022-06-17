import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    userId: localStorage.getItem("userId") || "",
    role_id: localStorage.getItem("role_id") || "",
  },
  reducers: {
    setlogin: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);
      state.userId = action.payload.userId;
      state.role_id = action.payload.role_id
    },
    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
      state.userId = "";
      state.role_id = "";
    },
  },
});

export const { setlogin, logout } = auth.actions;

export default auth.reducer;
