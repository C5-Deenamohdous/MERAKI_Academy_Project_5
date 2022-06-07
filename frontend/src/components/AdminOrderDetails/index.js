import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOneOrderDetails } from "../../redux/reducers/orders";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");

  const { oneOrderDetails } = useSelector((state) => {
    return {
      oneOrderDetails: state.orders.oneOrderDetails,
    };
  });
  const getOneOrderDetail = () => {
    axios
      .get(`http://localhost:5000/order/one_order/${id}`)
      .then((result) => {
        console.log(result);
        setUserName(result.data.result[0].userName);
        setLastName(result.data.result[0].lastName);
        setUserId(result.data.result[0].user_id);
        setOrderId(result.data.result[0].id);

        dispatch(setOneOrderDetails(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOneOrderDetail();
  }, []);

  return (
    <div className="Center-Container">
      <div className="Col-Container">
        <h2 onClick={() => {
            navigate(`/admin/user/${userId}`)
        }}>
          #{orderId} Orderd By {userName} {lastName}
        </h2>
        <div className="OneOrderDetail">
          <div className="Num">#Item</div>
          <div className="Details">Order Detail</div>
          <div className="Date">Order Date</div>
          <div className="Price">Price</div>
          <div className="Total">Total</div>
          <div className="Status">Status</div>
        </div>

        {oneOrderDetails &&
          oneOrderDetails.map((element, i) => {
            return (
              <div className="OneOrderDetail">
                <div className="Num">{i + 1}</div>
                <div className="Details">
                  <div className="img-Container">
                    <img src={element.productImage} />
                  </div>
                  <div className="titleAndDesc">
                    <p>{element.title}</p>
                    <p>{element.description}</p>
                  </div>
                </div>
                <div className="Date">{element.orderDate}</div>
                <div className="Price">
                  {element.quantityInCart}x{element.price}
                </div>
                <div className="Total">
                  {element.quantityInCart * element.price}
                </div>
                <div className="Status">
                  <p>{element.status ? "Completed" : "unCompleted"}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
