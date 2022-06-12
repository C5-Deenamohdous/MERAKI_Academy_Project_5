import "./style.css";
import React, { useState, useEffect } from "react";
import CategAndBrand from "../NavCategory";
import axios from "axios";

import { AiOutlinePoweroff, AiOutlineSearch } from "react-icons/ai";
import { FiLogIn } from "react-icons/fi";
import { BsCart, BsStars, BsArrowDownShort } from "react-icons/bs";
import { GiUbisoftSun, GiHeraldicSun } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";
import { logout } from "../../redux/reducers/auth";
import { useNavigate } from "react-router-dom";
// import Wishlist from "../../redux/reducers/WishList";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState("");
  const [isHover, setIsHover] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, cart, userId, Wishlist, subTotal } = useSelector(
    (state) => {
      return {
        isLoggedIn: state.auth.isLoggedIn,
        cart: state.cart.cart,
        userId: state.auth.userId,
        Wishlist: state.Wishlist.Wishlist,
        subTotal: state.cart.subTotal,
      };
    }
  );
  // {productRouter.get("/search", SearshGetAllProduct);
  const [result, setResult] = useState("");
  const [search, setSearch] = useState(false);
  const [searchtext, setSearchtext] = useState("");

  const SearshGetAllProduct = async () => {
    axios
      .get(`http://localhost:5000/product/search`)

      .then((result) => {
        console.log(result, "search all product");
        setResult(result.data.result);
        // setMessage("ALL products");
      })
      .catch((err) => {
        console.log(err);
        // setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    SearshGetAllProduct();
  }, []);

  return (
    <div className="NavBar">
      <div
        className="LOGO"
        onClick={() => {
          navigate("/");
        }}
      >
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
        <div
          className="Catg-IconCont"
          style={isHover ? { color: "#ff4136" } : {}}
        >
          <span>Categories</span>
          <div className="DropIcon">
            <span>
              <BsArrowDownShort />
            </span>
          </div>
        </div>

        <span
          onClick={() => {
            navigate(`/user/${userId}`);
          }}
        >
          Profile
        </span>
        <div className="SEARCH-Container">
          <input
            className="serch"
            type="text"
            placeholder="Search.."
            name="search"
            onChange={(e) => {
              setSearchtext(e.target.value);
              setSearch(true);
            }}
          />
          <p className="SEARCH-ICON">
            <AiOutlineSearch />
          </p>
        </div>
        <div
          className="DropDev"
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <CategAndBrand />
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
          <span
            onClick={() => {
              navigate("/Wishlist");
            }}
          >
            <BsStars />
          </span>
        </div>
        <div
          className="CART-NAV"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <span className="Number">{isLoggedIn ? cart.length : 0}</span>
          <span>
            <BsCart />
          </span>
        </div>
      </div>
      <Modal
        ariaHideApp={false}
        className={"CartPopUp"}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div className="CONTAINER_CARTPOPUP">
          <div className="Btn-SideCart">
            <span
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </span>
          </div>
          {cart &&
            cart.map((element) => {
              return (
                <div className="sideCart">
                  <div className="sideCartImg">
                    <img src={element.productImage} />
                  </div>
                  <div className="Title_Price">
                    <span>{element.title}</span>
                    <span className="Quan">
                      {element.quantityInCart} x {element.price}
                    </span>
                  </div>
                </div>
              );
            })}
          <div className="Total">
            <span className="T_">Total</span>
            <span className="Num">${subTotal}</span>
          </div>
          <div className="View-C">
            <button
              className="Vi"
              onClick={() => {
                navigate("/cart");
                setIsOpen(false);
              }}
            >
              View Cart
            </button>
            <button className="Ch">Checkout</button>
          </div>
        </div>
      </Modal>
      {search && searchtext !== "" ? (
        <div>
          {" "}
          {result &&
            result.map((element, index) => {
              return (
                <>
                  {element.title
                    .toLowerCase()
                    .includes(searchtext.toLowerCase()) ? (
                    <div className="searchoutbout">
                      <span
                        onClick={() => {
                          navigate(`/oneProduct/${element.id}`);
                          setSearchtext("");
                        }}
                      >
                        {element.title};
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NavBar;
