import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link, useNavigate } from "react-router-dom";
import { GiUbisoftSun, GiHeraldicSun } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { BsCart, BsStars, BsArrowDownShort } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePoweroff, AiOutlineSearch } from "react-icons/ai";
import { CgInfinity } from "react-icons/cg";

import { logout } from "../../redux/reducers/auth";

const AdminNavBar = () => {
  const { isLoggedIn, userId } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="Links-Admin1">
        <div className="LOGO1">
        <div className="LOGOTEST1">
          <span className="ICON1">
            <CgInfinity />
          </span>
          </div>
          <div className="Cont-Log1">
          <span className="Infin1">Infinity</span>
          <span className="Zone1">Zone</span>
          </div>
      </div>
      <div className="span">
        <span>
          Admin<b> DashBoard </b>
        </span>
      </div>

      <div className="homeCenter">
        <span
          className="HomeAdmin"
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </span>
 
        <span
          className="analysis"
          onClick={() => {
            navigate("/admin/Analysis");
          }}
        >
          Analysis
        </span>
       <div className="Login-LogoutAdmin">
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
     </div>
    
       

     
    </div>
  );
};

export default AdminNavBar;
