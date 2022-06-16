import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCompletedOrders } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";
const AdminCompletedOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { completedOrders } = useSelector((state) => {
    return {
      completedOrders: state.orders.completedOrders,
    };
  });
  const getCompletedOrders = () => {
    axios.get(`https://infintyzone.herokuapp.com/order/all_completed`).then((result) => {
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
            <div className="One-Order">
              <table className="ordersTable">
                <tr
                  className={
                    element.orderStatus
                      ? "completedOrdersColor"
                      : "unCompletedOrdersColor"
                  }
                >
                  <th
                    onClick={() => {
                      navigate(`/admin/order_details/${element.id}`);
                    }}
                    className="idOfOrder"
                  >
                    {element.id}
                  </th>
                  <th className="idOfOrder">
                    {element.orderDate.substring(0, 10)}
                  </th>
                  {/* <th className="idOfOrder">
                  {element.orderStatus ? "Completed" : "Un Completed"}
                </th> */}
                  <th className="idOfOrder">
                    <OrderStatus
                      order_id={element.id}
                      orderStatus={element.orderStatus}
                    />
                  </th>
                </tr>
              </table>
            </div>
          );
        })}
    </>
  );
};

export default AdminCompletedOrders;
