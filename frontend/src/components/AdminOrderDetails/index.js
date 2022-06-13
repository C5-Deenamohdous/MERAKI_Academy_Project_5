import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setOneOrderDetails,
  setStatusInsideDetail,
} from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const { oneOrderDetails, statusInsideDetail } = useSelector((state) => {
    return {
      oneOrderDetails: state.orders.oneOrderDetails,
      statusInsideDetail: state.orders.statusInsideDetail,
    };
  });

  const getOneOrderDetail = () => {
    console.log(id, "ooooooooo");
    axios
      .get(`http://localhost:5000/order/one_order/${id}`)
      .then((result) => {
        console.log(result, "|||||||||||||||||||||||");
        setUserName(result.data.result[0].userName);
        setLastName(result.data.result[0].lastName);
        setUserId(result.data.result[0].user_id);
        setOrderId(result.data.result[0].id);
        // setOrderStatus(result.data.result[0].id);
        dispatch(setStatusInsideDetail(result.data.result[0].orderStatus));
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
    <div className="Center-Container-AdminUserOrders">
      <div className="Col-Container">
        <div className="headerOfOrderForOneUser">
          <p>
            Order Number {orderId} For Client {userName} {lastName} :
          </p>
          <div className="spanIcon">
            <p>Is {statusInsideDetail == 1 ? "Completed" : "UnCompleted"}</p>

            <OrderStatus order_id={orderId} orderStatus={statusInsideDetail} />
          </div>
        </div>

       
        <table className="productInTable">
          <tr>
            
            <th className="Num1">#Item</th>
            <th>Product</th>
            <th>Title</th>
            <th>Price</th>
            <th className="Details1">Order Details</th>
            <th className="Date1">Order Date</th>
            <th className="Total1">Total Price</th>
          </tr>

          {oneOrderDetails &&
            oneOrderDetails.map((element, i) => {
              return (
                <tr>
                  <td className="Num1">{i + 1}</td>

                  <td className="p-Photo">
                    <img src={element.productImage} />
                  </td>

                  {/* <div className="titleAndDesc"> */}
                    <td className="p-title">{element.title}</td>
                    <td className="p-price">{element.price}</td>
                    <td className="p-title">{element.description}</td>
                  {/* </div> */}
                  <td className="Date">{element.orderDate}</td>
                  <td className="p-total">
                    {element.quantityInCart}x{element.price}
                  </td>
                 

                  {/* <div className="Status">
                  <p>{element.orderStatus ? "Completed" : "unCompleted"}</p>
                </div> */}
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
