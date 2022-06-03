import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comment: [],
  },
  reducers: {
    setComment: (state, action) => {
      state.comment = action.payload;
    },
    deleteComments: (state, action) => {
      state.comment = state.comment.filter((element) => {
        return element.id !== action.payload;
      });
    },
  },
});
export const { setComment,deleteComments } = commentSlice.actions;
export default commentSlice.reducer;
