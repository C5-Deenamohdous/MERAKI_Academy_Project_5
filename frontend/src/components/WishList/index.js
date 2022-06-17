import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToWishlist,
  setWishlist,
  removeFromWishlist,
} from "../../redux/reducers/WishList";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../../components/addToWishlistButton";

const WishlistSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Wishlist, token, userId, subTotal } = useSelector((state) => {
    return {
      Wishlist: state.Wishlist.Wishlist,
      token: state.auth.token,
      userId: state.auth.userId,
      subTotal: state.Wishlist.subTotal,
    };
  });
  const getProductInWishlist = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/Wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `WishlistFORUSER`);
        dispatch(setWishlist(result.data.result));
        // subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER Wishlist`);
      });
  };

  const deleteFromWishlist = (id) => {
    axios
      .delete(`https://infintyzone.herokuapp.com/Wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(removeFromWishlist({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM Wishlist");
      });
  };

  useEffect(() => {
    getProductInWishlist();
  }, []);

  return (
    <div className="WishlistContainer">
      <div className="Header-Container">
        <h1>Your Shopping Wishlist</h1>
      </div>

      <table className="WishlistTable">
        <tr>
          <th></th>
          <th>Product</th>
          <th>Price</th>
          <th>Remove/AddToCart</th>
        </tr>

        {Wishlist &&
          Wishlist.map((element) => {
            return (
              <tr>
                <td className="T-Photo">
                  <img src={element.productImage} />
                </td>
                <td className="T-title">{element.title}</td>
                <td className="T-price">{element.price}</td>

                <td className="T-icon">
                  <AddToWishlistButton productId={element.product_id} />
                  <AddToCartButton productId={element.product_id} />
                </td>
              </tr>
            );
          })}
      </table>
      <div className="TotalForWishlist">
        <button
          className="Continue"
          onClick={() => {
            navigate("/");
          }}
        >
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
};

export default WishlistSection;
