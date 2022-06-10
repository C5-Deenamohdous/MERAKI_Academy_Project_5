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
        // console.log(action.payload, "payloaaddd");
        if (el.id === action.payload.commentId) {
          return {
            ...el,
            comment: action.payload.comment,
            user_id:action.payload.user_id
          };
        }
        return el;
      });
    },
    addComments: (state, action) => {
      state.comment = [...state.comment, action.payload];
    },
  },
});
export const { setComment, deleteComments, updateComments ,addComments } =
  commentSlice.actions;
export default commentSlice.reducer;
