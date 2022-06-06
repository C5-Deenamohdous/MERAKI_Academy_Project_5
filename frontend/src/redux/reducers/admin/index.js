import { createSlice } from "@reduxjs/toolkit";

export const admin = createSlice({
  name: "admin",
  initialState: {
    allUsers: [],

    category: [],
    Product: [],
    Brand: [],

    oneProduct: [],
  },
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    setProduct: (state, action) => {
      if (action.payload.length) {
        state.Product = action.payload;
        return;
      }
      if (typeof action.payload == "object") {
        state.Product = [...state.Product, action.payload];
      }
    },
    addProduct: (state, action) => {
      state.Product.push(action.payload);
    },

    setBrand: (state, action) => {
      state.Brand = action.payload;
    },
    addBrand: (state, action) => {
      state.Brand.push(action.payload);
    },

    deleteProduct: (state, action) => {
      //payload id ,
      state.Product = state.Product.filter((element) => {
        return element.id !== action.payload;
      });
    },
    setOneProduct: (state, action) => {
      state.oneProduct = action.payload;
    },
    updateOneProduct: (state, action) => {
      state.oneProduct = state.oneProduct.map((element) => {
        if (element.id === action.payload.id) {
          console.log(action.payload);
          return {
            ...element,
            categoryName: action.payload.categoryName,
            title: action.payload.title,
            description: action.payload.description,
            productImage: action.payload.productImage,
          };
        }
        return element;
      });
      console.log(state.oneProduct);
    },

    deleteuser: (state, action) => {
      //payload id ,
      state.allUsers = state.allUsers.filter((element) => {
        return element.id !== action.payload;
      });
    },
  },
});

export const {
  setAllUsers,
  setCategory,
  addCategory,
  setProduct,
  addProduct,
  setBrand,
  addBrand,
  deleteProduct,
  setOneProduct,
  updateOneProduct,
  deleteuser,
} = admin.actions;

export default admin.reducer;
