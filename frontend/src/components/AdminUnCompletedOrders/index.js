import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllUnCompleted } from "../../redux/reducers/orders";

const AdminUnCompletedOrders = () => {
  const dispatch = useDispatch();
  const { allUnCompleted } = useSelector((state) => {
    return {
      allUnCompleted: state.orders.allUnCompleted,
    };
  });
  const getUnCompletedOrders = () => {
    axios.get(`http://localhost:5000/order/all_uncompleted`).then((result) => {
      console.log(result);
      dispatch(setAllUnCompleted(result.data.result));
    });
  };

  useEffect(() => {
    getUnCompletedOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allUnCompleted &&
        allUnCompleted.map((element) => {
          return (
            <div className="One-Order">
              <p>{element.id}</p>
              <p>{element.orderDate}</p>
              <p>{element.Status ? "Completed" : "Un Completed"} </p>
            </div>
          );
        })}
    </>
  );
};

export default AdminUnCompletedOrders;
