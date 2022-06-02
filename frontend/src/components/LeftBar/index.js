import "./style.css";
import React from "react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="Links-Admin">
      <Link to={"/admin/users"}>All Users</Link>
    </div>
  );
};

export default LeftSideBar;
