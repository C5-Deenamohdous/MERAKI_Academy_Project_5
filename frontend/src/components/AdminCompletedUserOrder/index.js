import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllCompletedForUser } from "../../redux/reducers/orders";

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
      .get(`http://localhost:5000/order/user_completed/${id}`)
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
      <h2>Completed Orders ,, </h2>
      {allCompletedForUser &&
        allCompletedForUser.map((element) => {
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

export default AdminUserCompletedOrders;
