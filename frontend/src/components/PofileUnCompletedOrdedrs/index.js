import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfileOrders from "../ProfileOrders";

const ProfileUnCompleteddOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [completeOrders, setCompleteOrderes] = useState("");

  const unCompleteOrderProfile = () => {
    axios
      .get(`http://localhost:5000/order/user_uncompleted/${id}`)
      .then((result) => {
        setCompleteOrderes(result.data.result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err, "ERR");
      });
  };

  useEffect(() => {
    unCompleteOrderProfile();
  }, []);

  return (
    <div className="Profile-Cont">
      <div className="Ord-Profile">
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
        })}
    </div>
  );
};

/*

 <div
              className="One-Order"
              onClick={() => {
                navigate(`/admin/order_details/${element.id}`);
              }}
            >
              <p>{element.id}</p>
              <p>{element.orderDate}</p>
              <p>{element.orderStatus ? "Completed" : "Un Completed"} </p>
            </div>

*/

export default ProfileUnCompleteddOrders;
