import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./style.css";

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
    axios.get(`https://infintyzone.herokuapp.com/order/all`).then((result) => {
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
            <div
              className="One-Order">
             
            
              <table className="ordersTable">
                <tr  className={element.orderStatus?"completedOrdersColor" : "unCompletedOrdersColor" }>
                  <th    onClick={() => {
                navigate(`/admin/order_details/${element.id}`);
              }}
               className="idOfOrder">{element.id}</th>
                  <th className="idOfOrder">{element.orderDate.substring(0,10)}</th>
                  {/* <th className="idOfOrder">
                    {element.orderStatus ? "Completed" : "Un Completed"}
                  </th> */}
                  <th className="idOfOrder"><OrderStatus
                order_id={element.id}
                orderStatus={element.orderStatus}
              /></th>
                </tr>
              </table>

              
            </div>
          );
        })}
    </>
  );
};

export default AdminAllOrders;

 