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
              onClick={() => {
                navigate(`/admin/order_details/${element.id}`);
              }}
            >
              <p>{element.id}</p>
              <p>{element.orderDate}</p>
              <p>{element.Status ? "Completed" : "Un Completed"} </p>
            </div>
          );
        })}
    </>
  );
};

export default AdminUserUnCompletedOrders;
