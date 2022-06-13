import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  makeOrderCompleted,
  makeOrderUnCompleted,
} from "../../redux/reducers/orders";
const OrderStatus = ({ order_id, orderStatus }) => {
  const dispatch = useDispatch();

  const completeOrder = (order_id) => {
    axios
      .put(`http://localhost:5000/order/status_complete/${order_id}`, {})
      .then((result) => {
        console.log(result, "Make Order Completed");
        dispatch(makeOrderCompleted({ id: order_id, status: 1 }));

        // dispatch(addToCart({ product_id: id }));
        // dispatch(addToCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "Error In Change To Completed");
      });
  };

  const UnCompleteOrder = (order_id) => {
    axios
      .put(`http://localhost:5000/order/status_uncomplete/${order_id}`, {})
      .then((result) => {
        console.log(result, "Make Order UnCompleted");
        dispatch(makeOrderUnCompleted({ id: order_id, status: 0 }));

        // dispatch(addToCart({ product_id: id }));
        // dispatch(addToCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "Error In Change To UnCompleted");
      });
  };

  // console.log(productInCart, "ALL ID's inCart");
  return (
    <>
      {orderStatus == 0 ? (
        <button 
          onClick={() => {
            completeOrder(order_id);
          }}
        >
          Complete Order
        </button>
      ) : (
        <button
          onClick={() => {
            UnCompleteOrder(order_id);
          }}
        >
          UnCompleteOrder
        </button>
      )}
    </>
  );
};

export default OrderStatus;
