import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllCompletedForUser } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const AdminUserCompletedOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allCompletedForUser } = useSelector((state) => {
    return {
      allCompletedForUser: state.orders.allCompletedForUser,
    };
  });
  const getAllUserCompletedOrders = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/order/user_completed/${id}`)
      .then((result) => {
        console.log(result);
        dispatch(setAllCompletedForUser(result.data.result));
      });
  };

  useEffect(() => {
    getAllUserCompletedOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allCompletedForUser &&
        allCompletedForUser.map((element) => {
          return (
            <div className="One-OrderForOneUser">
                <table className="ordersTableForOneUser">
                <tr  className={element.orderStatus?"completedOrdersColorOneUser" : "unCompletedOrdersColorOneUser" }>

              
              <th className="idOfOrder"
                onClick={() => {
                  navigate(`/admin/order_details/${element.id}`);
                }}
              >
                {element.id}
              </th>
              <th className="idOfOrder">{element.orderDate.substring(0,10)}</th>
            
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

export default AdminUserCompletedOrders;
