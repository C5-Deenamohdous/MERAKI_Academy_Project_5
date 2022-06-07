import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/reducers/cart";

const CheckOut = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const addToOrders = () => {
    axios
      .post(
        `http://localhost:5000/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, `ORDER CHECKOUT`);
        dispatch(setCart([]));
      })
      .catch((err) => {
        console.log(err, "ERR IN ORDER CHECKOUT");
      });
  };

  return (
    <button
      onClick={() => {
        addToOrders();
      }}
    >
      CheckOut
    </button>
  );
};

export default CheckOut;
