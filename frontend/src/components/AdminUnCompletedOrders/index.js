import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllUnCompleted } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const AdminUnCompletedOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUnCompleted } = useSelector((state) => {
    return {
      allUnCompleted: state.orders.allUnCompleted,
    };
  });
  const getUnCompletedOrders = () => {
    axios.get(`https://infintyzone.herokuapp.com/order/all_uncompleted`).then((result) => {
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

export default AdminUnCompletedOrders;
