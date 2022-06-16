import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcInfo } from "react-icons/fc";
import Modal from "react-modal";

const ProfileOrders = ({ order_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState("");
  const getAllDetails = () => {
    console.log("AAAAAAAAAAA", order_id);
    axios
      .get(`http://localhost:5000/order/one_order/${order_id}`)
      .then((result) => {
        setDetails(result.data.result);
        console.log("AAAAAAAAAAA", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllDetails();
  }, []);

  return (
    <>
      <span className="INFO_ORDERS_PROFILE"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FcInfo />
      </span>

      <Modal
        ariaHideApp={false}
        className={"OrderDetailsPopUp"}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        {/* <div className="Center-Container"> */}
        <div className="Col-Container ProfileCol">
          <div className="OneOrderDetail ProfileOneOrder">
            <div className="Num">#Item</div>
            <div className="Details">Order Detail</div>
            <div className="Date">Order Date</div>
            <div className="Price">Price</div>
            <div className="Total">Total</div>
          </div>

          {details &&
            details.map((element, i) => {
              return (
                <div className="OneOrderDetail ProfileOneOrder">
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
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
};

export default ProfileOrders;
