import "./style.css";
import React, { useContext } from "react";
import CategAndBrand from "../NavCategory";

import { AiOutlinePoweroff, AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BsCart, BsStars, BsArrowDownShort } from "react-icons/bs";
import { GiUbisoftSun, GiHeraldicSun } from "react-icons/gi";

// BsCart
// FiLogIn
// AiOutlinePoweroff << LogOut

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
  const { isLoggedIn, cart, userId, Wishlist } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      cart: state.cart.cart,
      userId: state.auth.userId,
      Wishlist: state.Wishlist.Wishlist,
    };
  });
  {
    /* <Category /> */
  }
  {
    /* <Brand /> */
  }
  return (
    <div className="NavBar">
      <div className="LOGO">
        <span className="LOGOTEST">ADA</span>
        <span className="ICON">
          <GiUbisoftSun />
        </span>
      </div>

      <div className="CENTER-NAV">
        <span
          className="Home"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
        <div className="Catg-IconCont">
          <span>Categories </span>
          <div className="DropIcon">
            <span>
              <BsArrowDownShort />
            </span>
          </div>
        </div>

        <span>Profile</span>
        <div className="SEARCH-Container">
          <input
            className="serch"
            type="text"
            placeholder="Search.."
            name="search"
          />
          <p className="SEARCH-ICON">
            <AiOutlineSearch />
          </p>
        </div>
      </div>

      <div className="RIGT-NAV">
        <div className="Login-Logout">
          {isLoggedIn ? (
            <span
              onClick={() => {
                dispatch(logout());
                navigate("/");
              }}
            >
              <AiOutlinePoweroff />
            </span>
          ) : (
            <span
              onClick={() => {
                navigate("/Login");
              }}
            >
              <FiLogIn />
            </span>
          )}
        </div>
        <div className="WISH-NAV">
          <span className="Number">{isLoggedIn ? Wishlist.length : 0}</span>
          <span>
            <BsStars />
          </span>
        </div>
        <div className="CART-NAV">
          <span className="Number">{isLoggedIn ? cart.length : 0}</span>
          <span>
            <BsCart />
          </span>
        </div>
      </div>
      <CategAndBrand />
    </div>
  );
};

export default NavBar;

//  <div class="header-right">
//         {isLoggedIn ? (
//           <>
//             <p
// onClick={() => {
//   navigate(`/user/${userId}`);
// }}
//             >
//               profile
//             </p>

//             <p
//               className="Login/Logout"
//               onClick={() => {
//                 dispatch(logout());
//                 navigate("/Home");
//               }}
//             >
//               Logout
//             </p>
//             <p className="cart">
//               <span>{cart.length}</span>
//               <BsCartDash
//                 onClick={() => {
//                   navigate("/cart");
//                 }}
//               />
//             </p>
//             <p className="Wishlist">
//               <TbJewishStar
//                 onClick={() => {
//                   navigate("/Wishlist");
//                 }}
//               />
//             </p>
//             <p
//               className="admin"
//               onClick={() => {
//                 navigate("/admin");
//               }}
//             >
//               Admin panel
//             </p>
//           </>
//         ) : (
//           <>
//             <p
//               className="Home"
//               onClick={() => {
//                 navigate("/Product");
//               }}
//             >
//               Home
//             </p>
//             <p
//               className="Login/Logout"
//               onClick={() => {
//                 navigate("/Login");
//               }}
//             >
//               login
//             </p>
//             <input
//               className="serch"
//               type="text"
//               placeholder="Search.."
//               name="search"
//             />
//           </>
//         )}
//       </div>
