import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/reducers/cart";
import Payment from "../payment/payment";
import Modal from "react-modal";
import CheckOut from "../CheckOut";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, token, userId, subTotal } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
      userId: state.auth.userId,
      subTotal: state.cart.subTotal,
    };
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [method1, setMethod1] = useState(false);
  const [method2, setMethod2] = useState(false);

  const getProductInCart = () => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `CARTFORUSER`);
        dispatch(setCart(result.data.result));
        setFirstName(result.data.result[0].firstName);
        setLastName(result.data.result[0].lastName);
        // subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  useEffect(() => {
    getProductInCart();
  }, []);

  return (
    <div className="CheckOuContainer">
      {cart &&
        cart.map((element) => {
          return (
            <div className="CheckOutPage">
              <div className="UserShippingInfo-L">
                <div className="ContactInfo">
                  <span>Contanct Information</span>
                  <div className="Input-Label">
                    <label>Email</label>
                    <input defaultValue={element.email} />
                  </div>
                </div>
                <div className="shippingAdress">
                  <span>Shipping Information</span>
                  <div className="Input-Label">
                    <label>Adress</label>
                    <input defaultValue={"Adress For User After Added "} />
                  </div>
                </div>
                <div className="FirstAndLastName">
                  <div className="Input-Label F">
                    <label>FirstName</label>
                    <input defaultValue={element.firstName} />
                  </div>
                  <div className="Input-Label F">
                    <label>Last Name</label>
                    <input defaultValue={element.lastName} />
                  </div>
                </div>
                <div className="Input-Label Ph">
                  <label>Phone Number</label>
                  <input defaultValue={element.phoneNumber} />
                </div>
                <div className="PaymentMethod">
                  <div className="selectContainer">
                    <select
                      onChange={(e) => {
                        if (e.target.value == 1) {
                          setMethod1(true);
                          setMethod2(false);
                        }
                        if (e.target.value == 2) {
                          setMethod2(true);
                          setMethod1(false);
                        }
                      }}
                    >
                      <option disabled selected>
                        Payment Method
                      </option>
                      <option value="1">Cash On Delivery</option>
                      <option value="2">Online Payment</option>
                    </select>
                  </div>
                </div>
                {method2 ? (
                  <div className="PaypalInCheckoutPage">
                    <Payment />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/*  */}
              <div className="OrdersInfo-R"></div>
            </div>
          );
        })}
      {cart.length == 0 && method2 ? (
        <Modal
          ariaHideApp={false}
          className={"MessageAfterPayment"}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
        >
          {/* {setTimeout(() => {
            setIsOpen(false);
            navigate("/");
          }, 3000)} */}
          <div className="messageContainer">
            <div className="ceneteInsidePopUp">
              <span>
                {firstName} {lastName} ,,
              </span>
            </div>
            <div className="ceneteInsidePopUp">
              <span>thank you for choosing us</span>
            </div>
            <div className="ceneteInsidePopUp">
              <span>You Can Check Your Order Status From Your Profile</span>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/");
              }}
            >
              Back To Shopping
            </button>
          </div>
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};

export default CheckOutPage;
