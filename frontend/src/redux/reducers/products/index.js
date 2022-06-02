import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    oneProduct:[],
    category:[],
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
    }
  },
});
export const { setProducts, setOneProduct ,setCategory} = productSlice.actions;
export default productSlice.reducer;
