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
    updateComments: (state, action) => {
      state.comment = state.comment.map((el, i) => {
        console.log(action.payload, "payloaaddd");
        if (el.id === action.payload.commentId) {
          return {
            ...el,
            comment: action.payload.comment,
          };
        }
            return el
        
      });
    },
  },
});
export const { setComment, deleteComments, updateComments } =
  commentSlice.actions;
export default commentSlice.reducer;
