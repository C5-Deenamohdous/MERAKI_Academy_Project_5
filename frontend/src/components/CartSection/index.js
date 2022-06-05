import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, changeQuantity } from "../../redux/reducers/cart";
import AddToCartButton from "../AddToCart";
const CartSection = () => {
  const [productQuantity, setProductQuantity] = useState();

  const dispatch = useDispatch();
  const { cart, token, userId } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
      userId: state.auth.userId,
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

  const changeQuantityInCart = (product_id, updatedQuantity) => {
    console.log(updatedQuantity);
    axios
      .put(
        `http://localhost:5000/cart/change_quantity/${product_id}`,
        {
          quantityInCart: updatedQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(
          changeQuantity({
            product_id: product_id,
            quantityInCart: updatedQuantity,
          })
        );
        console.log(result, "UPDATE QUANTITY");
      })
      .catch((err) => {
        console.log(err, "ERR IN ADDTOCART");
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
              <AddToCartButton productId={element.product_id} />
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
                <div>
                  <button
                    onClick={() => {
                      // setProductQuantity(element.quantityInCart + 1);
                      changeQuantityInCart(
                        element.product_id,
                        element.quantityInCart + 1
                      );
                    }}
                  >
                    +
                  </button>
                  <span>x{element.quantityInCart}</span>
                  <button
                    onClick={() => {
                      setProductQuantity(element.quantityInCart - 1);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <p>For Test {productQuantity}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CartSection;
