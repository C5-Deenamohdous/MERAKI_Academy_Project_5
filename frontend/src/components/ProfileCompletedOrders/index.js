import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ProfileCompleteddOrders = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [completeOrders, setCompleteOrderes] = useState("");

  const CompletedOrderProfile = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/order/user_completed/${id}`)
      .then((result) => {
        setCompleteOrderes(result.data.result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err, "ERR");
      });
  };

  useEffect(() => {
    CompletedOrderProfile();
  }, []);

  return (
    <>
      {completeOrders &&
        completeOrders.map((element) => {
          return (
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
          );
        })}
    </>
  );
};

export default ProfileCompleteddOrders;
