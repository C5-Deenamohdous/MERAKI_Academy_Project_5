import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist,setWishlist, removeFromWishlist } from "../../redux/reducers/WishList";

import AddToWishlistButton from "../../components/addToWishlistButton";


const WishlistSection = () => {
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
        .get(`http://localhost:5000/Wishlist`, {
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
        .delete(`http://localhost:5000/Wishlist/${id}`, {
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
        <div className="WishlistOneProduct">
          <div className="ContainerInfoAndImage">
            <p className="WishlistHeader-P Bottom">Product</p>
          </div>
          <div className="WishlistPrice Bottom">
            <p className="WishlistHeader-P Bottom">Price</p>
          </div>
        </div>
        {Wishlist &&
          Wishlist.map((element) => {
            return (
              <div className="WishlistOneProduct">
                <div className="ContainerInfoAndImage">
                  <div className="Image">
                    <img src={element.productImage} />
                  </div>
                  <div className="infoInWishlist">
                    <p>{element.title}</p>
                    <p>{element.description}</p>
                  </div>
                </div>
  
                <div className="WishlistPrice">
                  <p>{element.price}</p>
                </div>
  
                <div className="WishlistTotal">
                  <AddToWishlistButton productId={element.product_id} />
                  <p>{element.quantityInWishlist * element.price}</p>
                </div>
              </div>
            );
          })}
      </div>
    );
  };
  
  export default WishlistSection;