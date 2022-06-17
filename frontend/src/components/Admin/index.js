import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllUsers } from "../../redux/reducers/admin";
import LeftSideBar from "../LeftBar";
import AdminNavBar from "../AdminNavBar";
const AdminPanel = () => {
  const { role_id, isLoggedIn } = useSelector((state) => {
    return {
      role_id: state.auth.role_id,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  return (
    <>
      {role_id == 4 && isLoggedIn ? (
        <>
          <div className="AdminPanelContainer1">
            <AdminNavBar />
          </div>
          <div className="AdminPanelContainer">
            <LeftSideBar />
          </div>
        </>
      ) : (
        <div className="AUTHIMAGE">
          <img src="https://i.pinimg.com/originals/94/f1/dc/94f1dc2bad6923a6d36927f5766abf87.png" />
        </div>
      )}
    </>
  );
};

export default AdminPanel;
