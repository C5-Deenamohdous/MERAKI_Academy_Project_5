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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(false);

  const [method1, setMethod1] = useState(false);
  const [method2, setMethod2] = useState(false);

  const [isConfirm, setIsConfirm] = useState(false);

  const getProductInCart = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `CARTFORUSER`);
        dispatch(setCart(result.data.result));
        setFirstName(result.data.result[0].firstName);
        setLastName(result.data.result[0].lastName);
        setPhoneNumber(result.data.result[0].phoneNumber);
        setEmail(result.data.result[0].email);
        // subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  const addToOrders = () => {
    axios
      .post(
        `https://infintyzone.herokuapp.com/order`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, `ORDER CHECKOUT`);
        dispatch(setCart([]));
        setIsOpen1(false);
        setIsOpen(true);
        setIsConfirm(true);
      })
      .catch((err) => {
        console.log(err, "ERR IN ORDER CHECKOUT");
      });
  };

  useEffect(() => {
    getProductInCart();
  }, []);

  return (
    <div className="CheckOuContainer">
      <div className="CheckOutPage">
        <div className="UserShippingInfo-L">
          <div className="ContactInfo">
            <span>Contanct Information</span>
            <div className="Input-Label">
              <label>Email</label>
              <input defaultValue={email} />
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
              <input defaultValue={firstName} />
            </div>
            <div className="Input-Label F">
              <label>Last Name</label>
              <input defaultValue={lastName} />
            </div>
          </div>
          <div className="Input-Label Ph">
            <label>Phone Number</label>
            <input defaultValue={phoneNumber} />
          </div>
          <div className="B-Contaier">
            <div>
              <p
                onClick={() => {
                  navigate("/cart");
                }}
              >
                Back To Cart
              </p>
            </div>
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
          {method1 ? (
            <div className="CashPayment">
              <button
                onClick={() => {
                  setIsOpen1(true);
                }}
              >
                Checkout
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="OrdersInfo-R">
          {cart &&
            cart.map((element) => {
              return (
                <>
                  <div className="CheckOutSideCart">
                    <div className="checkOutSidCartImage">
                      <img src={element.productImage} />
                    </div>
                    <div className="Title_PriceInCheckOut">
                      <span className="T-B">{element.title}</span>
                      <span className="QuanInCheckOut">
                        {element.quantityInCart} x {element.price}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          {cart.length == 0 && method2 ? (
            <Modal
              ariaHideApp={false}
              className={"MessageAfterPayment"}
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
            >
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
                  className="BackTo"
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

          <Modal
            ariaHideApp={false}
            className={"ConfirmationMessagePopUp"}
            isOpen={isOpen1}
            onRequestClose={() => setIsOpen1(false)}
          >
            <div className="Cont-Confi">
              <div>
                <p>Are you sure From Your informations ? </p>
                <div className="BtnsConfirmation">
                  <button
                    className="CancelBtn"
                    onClick={() => {
                      setIsOpen1(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="Confirm"
                    onClick={() => {
                      addToOrders();
                    }}
                  >
                    Confirm Order
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          {isConfirm && method1 ? (
            <Modal
              ariaHideApp={false}
              className={"MessageAfterPayment"}
              isOpen={isOpen}
              onRequestClose={() => setIsOpen(false)}
            >
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
                  className="BackTo"
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
          <div className="Total">
            <span className="T_">Total</span>
            <span className="Num">${subTotal}</span>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

export default CheckOutPage;
