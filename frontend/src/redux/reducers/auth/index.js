import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "auth",
  initialState: {
    token:localStorage.getItem("token") || "",
    isLoggedIn:localStorage.getItem("token") ? true:false,
    userId:localStorage.getItem("userId")||"",
  },
  reducers: {
    setlogin: (state, action) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
        localStorage.setItem('token',action.payload.token);
    state.userId=localStorage.setItem("userId",action.payload.userId)
    },
    logout: (state, action) => {
      state.token = "";
      state.isLoggedIn = false;
      localStorage.clear();
      state.userId=""
    },
  
  },
});

export const { setlogin, logout } = auth.actions;

export default auth.reducer;
