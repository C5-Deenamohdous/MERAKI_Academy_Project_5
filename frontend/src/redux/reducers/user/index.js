import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    userProfile: [],
  },
  reducers: {
    setuserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    deleteuserProfile: (state, action) => {
      //payload id ,
      state.userProfile = state.userProfile.filter((element) => {
        return element.id !== action.payload;
      });
    },
    updateuserProfile: (state, action) => {
      state.userProfile = state.userProfile.map((element) => {
        if (element.id == action.payload.id) {
          return {
            ...element,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            phoneNumber: action.payload.phoneNumber,
            profileImage: action.payload.profileImage,
            Address:action.payload.Address
          };
        }
        return element;
      });
    },
  },
});

export const { setuserProfile, deleteuserProfile, updateuserProfile } =
  user.actions;

export default user.reducer;
