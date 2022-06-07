import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { setAllUserOrders } from "../../redux/reducers/orders";

const AdminUserOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUSerOrders } = useSelector((state) => {
    return {
      allUSerOrders: state.orders.allUSerOrders,
    };
  });
  const getAllUserOrders = () => {
    axios.get(`http://localhost:5000/order/user/${id}`).then((result) => {
      console.log(result);
      dispatch(setAllUserOrders(result.data.result));
    });
  };

  useEffect(() => {
    getAllUserOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allUSerOrders &&
        allUSerOrders.map((element) => {
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

export default AdminUserOrder;
