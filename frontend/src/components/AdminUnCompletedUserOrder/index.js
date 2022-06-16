import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllUnCompletedForUser } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const AdminUserUnCompletedOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUnCompletedForUser } = useSelector((state) => {
    return {
      allUnCompletedForUser: state.orders.allUnCompletedForUser,
    };
  });
  const getAllUnCompletedForUser = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/order/user_uncompleted/${id}`)
      .then((result) => {
        console.log(result);
        dispatch(setAllUnCompletedForUser(result.data.result));
      });
  };

  useEffect(() => {
    getAllUnCompletedForUser();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allUnCompletedForUser &&
        allUnCompletedForUser.map((element) => {
          return (
            <div className="One-OrderForOneUser">
              <table className="ordersTableForOneUser">
                <tr
                  className={
                    element.orderStatus
                      ? "completedOrdersColorOneUser"
                      : "unCompletedOrdersColorOneUser"
                  }
                >
                  <th
                    className="idOfOrder"
                    onClick={() => {
                      navigate(`/admin/order_details/${element.id}`);
                    }}
                  >
                    {element.id}
                  </th>
                  <th className="idOfOrder">
                    {element.orderDate.substring(0, 10)}
                  </th>
             
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

export default AdminUserUnCompletedOrders;
