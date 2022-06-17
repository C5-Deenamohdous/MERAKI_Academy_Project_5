import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist,removeFromWishlist } from "../../redux/reducers/WishList";
import { AiFillStar , AiOutlineStar } from "react-icons/ai";


const AddToWishlistButton = ({ productId }) => {
  const dispatch = useDispatch();
  const { productInWishlist, token } = useSelector((state) => {
    return {
      Wishlist: state.Wishlist.Wishlist,
      productInWishlist: state.Wishlist.productInWishlist,
      token: state.auth.token,
    };
  });
  const AddToWishlist = (id) => {
    axios
      .post(
        `https://infintyzone.herokuapp.com/Wishlist/${id}`,
        {
          product_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(addToWishlist({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR IN ADDTOWishlist");
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
        dispatch(removeFromWishlist({product_id:id}));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM Wishlist");
      });
  };
  return (
    <>
      {productInWishlist.includes(productId) ? (
        <span className="CartBtns"
          onClick={() => {
            deleteFromWishlist(productId);
          }}
        >
          <AiFillStar />
        </span>
      ) : (
        <span className="CartBtns"
          onClick={() => {
            AddToWishlist(productId);
          }}
        >
          <AiOutlineStar />
        </span>
      )}
    </>
  );
};

export default AddToWishlistButton;
