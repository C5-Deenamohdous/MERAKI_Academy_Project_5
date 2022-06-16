import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcInfo } from "react-icons/fc";
import Modal from "react-modal";

const ProfileOrders = ({ order_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState("");
  const getAllDetails = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/order/one_order/${order_id}`)
      .then((result) => {
        setDetails(result.data.result);
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
      <span
        className=""
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <FcInfo />
      </span>

      <Modal
        ariaHideApp={false}
        className={"Profile-ContainerForTable"}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="Col-Cont-P">
          <table className="Detail-T-Profile">
            <tr className="TR-PROFILE">
              <th>Product</th>
              <th>Product Details</th>
              <th>Order Date</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
            {details &&
              details.map((element) => {
                return (
                  <tr className="TR-PROFILE">
                    <td className="T-CT">
                      <div className="NameAndImg-T">
                        <div className="ImgContainer-T">
                          <img src={element.productImage} />
                        </div>
                        <span>{element.title}</span>
                      </div>
                    </td>
                    <td>{element.description}</td>
                    <td>{element.orderDate.substring(0, 10)}</td>
                    <td>
                      {element.quantityInCart}x{element.price}
                    </td>
                    <td> {element.quantityInCart * element.price}</td>
                  </tr>
                );
              })}
          </table>

        </div>
      </Modal>
    </>
  );
};

export default ProfileOrders;