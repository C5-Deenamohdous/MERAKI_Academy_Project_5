import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfileOrders from "../ProfileOrders";
import { useSelector } from "react-redux";
const ProfileUnCompleteddOrders = () => {
  // const { id } = useParams();
  const { userId } = useSelector((state) => {
    return {
      userId: state.auth.userId,
    };
  });

  const navigate = useNavigate();

  const [completeOrders, setCompleteOrderes] = useState("");

  const getAllUserOrders = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/order/user/${userId}`)
      .then((result) => {
        console.log(result, "All Orders For User");
        setCompleteOrderes(result.data.result);
      })
      .catch((err) => {
        console.log(err, "ERR IN USER ORDER");
      });
  };

  useEffect(() => {
    getAllUserOrders();
  }, []);

  return (
    <>
      <div className="MyOrders-Cont">
        <div className="Header">
          <h2>My Orders</h2>
        </div>
        <table className="InsidePefile-T">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th></th>
          </tr>
          {completeOrders &&
            completeOrders.reverse().map((element) => {
              return (
                <tr
                  className={
                    element.orderStatus
                      ? "completedOrdersColorOneUser"
                      : "unCompletedOrdersColorOneUser"
                  }
                >
                  <td>{element.id}</td>
                  <td>{element.orderDate.substring(0, 10)}</td>
                  <td className="TableIcon-M">
                    <ProfileOrders order_id={element.id} />
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    </>
  );
};

export default ProfileUnCompleteddOrders;
