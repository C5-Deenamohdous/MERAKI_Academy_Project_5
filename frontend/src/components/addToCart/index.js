import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/reducers/cart";
import { BsFillCartPlusFill, BsFillCartDashFill } from "react-icons/bs";

const AddToCartButton = ({ productId, price, productImage, title }) => {
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
        `https://infintyzone.herokuapp.com/cart/${id}`,
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
        dispatch(
          addToCart({
            product_id: id,
            price: price,
            quantityInCart: 1,
            productImage: productImage,
            title: title,
          })
        );
      })
      .catch((err) => {
        console.log(err, "ERR IN ADDTOCART");
      });
  };

  const deleteFromCart = (id) => {
    axios
      .delete(`https://infintyzone.herokuapp.com/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(removeFromCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM CART");
      });
  };

  // console.log(productInCart, "ALL ID's inCart");
  return (
    <>
      {productInCart.includes(productId) ? (
        <span
          className="CartBtns"
          onClick={() => {
            deleteFromCart(productId);
          }}
        >
          <BsFillCartDashFill />
        </span>
      ) : (
        <span
          className="CartBtns"
          onClick={() => {
            AddToCart(productId);
          }}
        >
          <BsFillCartPlusFill />
        </span>
      )}
    </>
  );
};

export default AddToCartButton;
