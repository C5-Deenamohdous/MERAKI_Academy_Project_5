import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/reducers/cart";

const AddToCartButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { productInCart, token } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      productInCart: state.cart.productInCart,
      token: state.auth.token,
    };
  });
  const AddToCart = (id) => {
    axios
      .post(
        `http://localhost:5000/cart/${id}`,
        {
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addToCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR IN ADDTOCART");
      });
  };

  const deleteFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(removeFromCart({product_id:id}));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM CART");
      });
  };

  // console.log(productInCart, "ALL ID's inCart");
  return (
    <>
      {productInCart.includes(productId) ? (
        <button
          onClick={() => {
            deleteFromCart(productId);
          }}
        >
          Remove cart
        </button>
      ) : (
        <button
          onClick={() => {
            AddToCart(productId);
          }}
        >
          Add to cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;
