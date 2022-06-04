import "./style.css";
import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart } from "../../redux/reducers/cart";

const CartSection = () => {
  const dispatch = useDispatch();
  const { cart, token } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
    };
  });

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
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  useEffect(() => {
    getProductInCart();
  }, []);

  return (
    <div>
      <h2>For Test</h2>
      {cart &&
        cart.map((element) => {
          return (
            <div className="CartContainer">
              <div className="CartOneProduct">
                <div className="ImageInCart">
                  <img src={element.productImage} />
                </div>
                <div className="infoInCart">
                  <p>{element.title}</p>
                  <p>{element.description}</p>
                </div>
                <div className="Price">
                  <p>Price</p>
                  <p>{element.price}</p>
                </div>
                <div className="InputInCart">
                  <p>Quantity</p>
                  <input type="number" defaultValue="1" />
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartSection;
