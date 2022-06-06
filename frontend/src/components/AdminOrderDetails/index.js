import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const OrderDetails = () => {
  const { id } = useParams();
  // /user/:id"
  const getOneOrderDetail = () => {
    axios
      .get(`http://localhost:5000/order/one_order/${id}`)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOneOrderDetail();
  }, []);

  return <div>Details PAGE</div>;
};

export default OrderDetails;
