import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfileOrders from "../ProfileOrders";

const ProfileUnCompleteddOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [completeOrders, setCompleteOrderes] = useState("");

  const getAllUserOrders = () => {
    axios
      .get(`http://localhost:5000/order/user/${id}`)
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
    <div className="Profile-Cont">
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
                <td>
                  <ProfileOrders order_id={element.id} />
                </td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};

export default ProfileUnCompleteddOrders;

{
  /* <div className="Ord-Profile">
        <div className="Ord_Num">#</div>
        <div className="Ord_Date">Date</div>
        <div className="Ord_Status">Status</div>
        <div className="Icon"></div>
      </div>
      {completeOrders &&
        completeOrders.map((element) => {
          return (
            <div className="Ord-Profile">
              <div className="Ord_Num">
                <span>{element.id}</span>
              </div>
              <div className="Ord_Date">
                <span>{element.orderDate.substring(0, 10)}</span>
              </div>
              <div className="Ord_Status">
                <span>
                  {element.orderStatus ? "Completed" : "Un Completed"}
                </span>
              </div>
              <div className="Icon">
                <ProfileOrders order_id={element.id} />
              </div>
            </div>
          );
        })} */
}
