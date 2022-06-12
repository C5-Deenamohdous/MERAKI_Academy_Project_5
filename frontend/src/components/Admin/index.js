import "./style.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { setAllUsers } from "../../redux/reducers/admin";
import LeftSideBar from "../LeftBar";
import AdminNavBar from "../AdminNavBar"
const AdminPanel = () => {
  return (
    <>
    <div className="AdminPanelContainer1" >
        <AdminNavBar/>
    </div>
    <div className="AdminPanelContainer">
    
        <LeftSideBar />
    </div>
    </>
  );
};

export default AdminPanel;
