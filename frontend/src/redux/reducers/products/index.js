import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    oneProduct:[],
    category:[],
    oneCategory:[]
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    setCategory:(state,action)=>{
      state.category=action.payload
    },
    setOneCategory:(state,action)=>{
state.oneCategory=action.payload
    }

  
  },
});
export const { setProducts, setOneProduct ,setCategory,setOneCategory} = productSlice.actions;
export default productSlice.reducer;
