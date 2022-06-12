import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link, useNavigate } from "react-router-dom";
import { GiUbisoftSun, GiHeraldicSun } from "react-icons/gi";
const AdminNavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="Links-Admin1">
            <div
        className="LOGO1"
      >
        <span className="LOGOTEST">ADA</span>
        <span className="ICON1">
          <GiUbisoftSun />
        </span>
      </div>
      <div className="span">
        <span>
          Admin<b> DashBoard </b>
        </span>
      </div>
    </div>
  );
};

export default AdminNavBar;
