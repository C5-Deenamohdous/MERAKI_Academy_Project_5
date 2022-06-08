import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCompletedOrders } from "../../redux/reducers/orders";

const AdminCompletedOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { completedOrders } = useSelector((state) => {
    return {
      completedOrders: state.orders.completedOrders,
    };
  });
  const getCompletedOrders = () => {
    axios.get(`http://localhost:5000/order/all_completed`).then((result) => {
      console.log(result);
      dispatch(setCompletedOrders(result.data.result));
    });
  };

  useEffect(() => {
    getCompletedOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {completedOrders &&
        completedOrders.map((element) => {
          return (
            <div
              className="One-Order"
              onClick={() => {
                navigate(`/admin/order_details/${element.id}`);
              }}
            >
              <p>{element.id}</p>
              <p>{element.orderDate}</p>
              <p>{element.orderStatus ? "Completed" : "Un Completed"} </p>
            </div>
          );
        })}
    </>
  );
};

export default AdminCompletedOrders;
