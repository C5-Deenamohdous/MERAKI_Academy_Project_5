import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setALlOrders } from "../../redux/reducers/orders";

const AdminAllOrders = () => {
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => {
    return {
      allOrders: state.orders.allOrders,
    };
  });
  const getAllOrders = () => {
    axios.get(`http://localhost:5000/order/all`).then((result) => {
      console.log(result);
      dispatch(setALlOrders(result.data.result));
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allOrders &&
        allOrders.map((element) => {
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

export default AdminAllOrders;
