import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/reducers/cart";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { productInCart , token} = useSelector((state) => {
    return {
      cart: state.cart.cart,
      productInCart: state.cart.productInCart,
      token:state.auth.token
    };
  });
  const AddToCart = (id) => { 
    



  }


  console.log(productInCart, "ALL ID's inCart");
  return (
    <>
      {productInCart.includes(productId) ? (
        <button
          onClick={() => {
            addToCart(productId);
          }}
        >
          Add
        </button>
      ) : (
        <button>Remove</button>
      )}
    </>
  );
};

export default AddToCartButton;
