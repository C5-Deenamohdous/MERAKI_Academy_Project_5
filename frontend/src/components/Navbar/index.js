import "./style.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BsCartDash } from "react-icons/bs";
import { TbJewishStar } from "react-icons/tb";

//BsCartDash
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
  <p im="#default" class="logo" img src = "https://mir-s3-cdn-cf.behance.net/projects/404/45459367470591.Y3JvcCwxMDA5LDc4OSwxMDksMTE3.jpg"></p>
  <div class="header-right">
      {/* <Category /> */}
      {/* <Brand /> */}
      {isLoggedIn ? (
        <>
        <p
          className="Home"
          onClick={() => {
            navigate("/Product");
          }}
        >
          Home
        </p>
<p onClick={()=>{
  navigate(`/user/${userId}`)
}}>profile</p> 

        <p
          className="Login/Logout"
          onClick={() => {
            dispatch(logout());
            navigate("/Home");
          }}
        >
          Logout
        </p>
        <p className="cart" >
        < BsCartDash
                onClick={() => {
          navigate("/cart");
        }}
        /></p>
         {/* {cart.length} */}
< p className="Wishlist">
  <TbJewishStar
        onClick={() => {
          navigate("/Wishlist");
        }}/>
      </p>
        {/* Items In whish {Wishlist.length} */}
        <input className="serch" type="text" placeholder="Search.." name="search"/>
        <p
          className="admin"
          onClick={() => {
            navigate("/admin");
          }}
        >
          Admin panel 
        </p>
        </>
      ) : (
        <>
            <p
          className="Home"
          onClick={() => {
            navigate("/Product");
          }}
        >
          Home
        </p>
        <p
        className="Login/Logout"
        onClick={() => {
          navigate("/Login");
        }}
      >
        login
      </p>
      <input className="serch" type="text" placeholder="Search.." name="search"/>

      </>
      )}
         </div>
 
    </div>
  );
};

export default NavBar;
