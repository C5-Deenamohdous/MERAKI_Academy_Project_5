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
    updateComments:(state,action) => {
state.comment=state.comment.map((el,i)=>{
    if(el.id === action.payload.id){
return{
    ...el,
    comment:action.comment
}
    }
})
    }
  },
});
export const { setComment,deleteComments,updateComments } = commentSlice.actions;
export default commentSlice.reducer;
