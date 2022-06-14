import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/reducers/cart";

import CheckOut from "../CheckOut";

const CheckOutPage = () => {
  const dispatch = useDispatch();
  const { cart, token, userId, subTotal } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
      userId: state.auth.userId,
      subTotal: state.cart.subTotal,
    };
  });

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
                  <div className="Input-Label">
                    <label>FirstName</label>
                    <input defaultValue={element.firstName} />
                  </div>
                  <div className="Input-Label">
                    <label>Last Name</label>
                    <input defaultValue={element.lastName} />
                  </div>
                </div>
                <div className="Input-Label">
                  <label>Phone Number</label>
                  <input defaultValue={element.phoneNumber} />
                </div>
                <div className="PaymentMethod">
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
              {/*  */}
              <div className="OrdersInfo-R"></div>
            </div>
          );
        })}
    </div>
  );
};

export default CheckOutPage;
