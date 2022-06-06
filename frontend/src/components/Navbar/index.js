import "./style.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Category from "../Category";
import Brand from "../Brand";
import { logout } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
// import Wishlist from "../../redux/reducers/WishList";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, cart,userId,Wishlist } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      cart: state.cart.cart,
      userId:state.auth.userId,
      Wishlist: state.Wishlist.Wishlist,

    };
  });
  return (
    <div className="NavBar">
      NavBar
      {/* <Category /> */}
      <br />
      {/* <Brand /> */}
      <p onClick={()=>{
        navigate(`/user/${userId}`)
      }}>profile</p>
      <br />
      {isLoggedIn ? (
        <p
          className="logout"
          onClick={() => {
            dispatch(logout());
            navigate("/Home");
          }}
        >
          Logout
        </p>
      ) : (
        ""
      )}
      <br />
      <p
        className="TempClass"
        onClick={() => {
          navigate("/cart");
        }}
      >
        Items In Cart {cart.length}
      </p>

      <p
        className="TempClassss"
        onClick={() => {
          navigate("/Wishlist");
        }}
      >
        Items In whish {Wishlist.length}
      </p>
    </div>
  );
};

export default NavBar;
