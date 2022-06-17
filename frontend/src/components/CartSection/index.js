import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCart,
  changeQuantity,
  removeFromCart,
} from "../../redux/reducers/cart";
import AddToCartButton from "../AddToCart";
// import CheckOut from "../CheckOut";
const CartSection = () => {
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
  // const [subTotal, setSubTotal] = useState(0);

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
        // subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  const changeQuantityInCart = (product_id, updatedQuantity) => {
    axios
      .put(
        `https://infintyzone.herokuapp.com/cart/change_quantity/${product_id}`,
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

  const deleteFromCart = (id) => {
    axios
      .delete(`https://infintyzone.herokuapp.com/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(removeFromCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM CART");
      });
  };

  useEffect(() => {
    getProductInCart();
  }, []);

  return (
    <div className="CartContainer">
      <div className="Header-Container">
        <h1>Your Shopping Cart</h1>
      </div>

      <table className="CartTable">
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Remove</th>
        </tr>

        {cart &&
          cart.map((element) => {
            return (
              <tr>
                <td className="T-Photo">
                  <img src={element.productImage} />
                </td>
                <td className="T-title">{element.title}</td>
                <td className="T-price">{element.price}</td>
                <td className="T-quantity">
                  <div className="PlusBtns">
                    <button
                      onClick={() => {
                        changeQuantityInCart(
                          element.product_id,
                          element.quantityInCart - 1
                        );
                        if (element.quantityInCart - 1 == 0) {
                          deleteFromCart(element.product_id);
                        }
                      }}
                    >
                      -
                    </button>

                    <span>x{element.quantityInCart}</span>
                    <button
                      onClick={() => {
                        changeQuantityInCart(
                          element.product_id,
                          element.quantityInCart + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="T-total">
                  {element.quantityInCart * element.price}
                </td>
                <td className="T-icon">
                  <AddToCartButton productId={element.product_id} />
                </td>
              </tr>
            );
          })}
      </table>
      <div className="TotalForCart">
        <button className="Continue">CONTINUE SHOPPING</button>
        <div className="ForBorder">
          <h2 className="Header-Total">CART TOTALS</h2>{" "}
        </div>
      </div>
      <div className="SubTotal">
        <div className="PriceAndTotal">
          <span className="PlaceHolder">TOTAL</span>
          <span className="Co-">${subTotal}</span>
        </div>
        <div className="BtnToCheckOutPage">
          <button
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Proced to Checkot
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSection;
