import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllUnCompletedForUser } from "../../redux/reducers/orders";

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
      .get(`http://localhost:5000/order/user_uncompleted/${id}`)
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
      <h2>UnCompleted Orders ,, </h2>
      {allUnCompletedForUser &&
        allUnCompletedForUser.map((element) => {
          return (
            <div
            className="One-Order"
           
            >
            <table className="ordersTable">
              <tr>
                <th  onClick={() => {
              navigate(`/admin/order_details/${element.id}`);
            }} className="idOfOrder">{element.id}</th>
                <th className="idOfOrder">{element.orderDate.substring(0,10)}</th>
                <th className="idOfOrder">
                  {element.orderStatus ? "Completed" : "Un Completed"}
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
