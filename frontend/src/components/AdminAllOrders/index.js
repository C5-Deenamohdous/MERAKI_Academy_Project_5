import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setALlOrders } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";
const AdminAllOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allOrders } = useSelector((state) => {
    return {
      allOrders: state.orders.allOrders,
    };
  });
  const getAllOrders = () => {
    axios.get(`http://localhost:5000/order/all`).then((result) => {
      console.log(result);
      console.log("===");
      dispatch(setALlOrders(result.data.result));
    });
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      {allOrders &&
        allOrders.map((element) => {
          return (
            <div className="One-Order">
              <div
                onClick={() => {
                  navigate(`/admin/order_details/${element.id}`);
                }}
              >
                <p>{element.id}</p>
                <p>{element.orderDate}</p>
                <p>{element.orderStatus ? "Completed" : "Un Completed"} </p>
              </div>

              <OrderStatus
                order_id={element.id}
                orderStatus={element.orderStatus}
              />
            </div>
          );
        })}
    </>
  );
};

export default AdminAllOrders;
