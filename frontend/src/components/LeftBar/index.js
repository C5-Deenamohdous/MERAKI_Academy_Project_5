import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link, useNavigate } from "react-router-dom";
import { MdProductionQuantityLimits } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { BiCategory } from "react-icons/bi";
import { SiBrandfolder } from "react-icons/si";
import { VscListOrdered } from "react-icons/vsc";
import { MdCreateNewFolder } from "react-icons/md";




const LeftSideBar = () => {
  const navigate = useNavigate();
  return (
    <>

      <div className="Links-Admin">
        <a
          onClick={() => {
            navigate("/admin/products");
          }}
        >
          <MdProductionQuantityLimits /> Products
        </a>
        <a
          onClick={() => {
            navigate("/admin/all_users");
          }}
        >
        <ImUsers/>  Users
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateCategory");
          }}
        >
      <BiCategory/>    Create Category
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateBrand");
          }}
        >
       <SiBrandfolder/>   Create Brand
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateProduct");
          }}
        >
        <MdCreateNewFolder/>  Create Product
        </a>
        <a
          onClick={() => {
            navigate("/admin/all_orders");
          }}
        >
        <VscListOrdered/>  Orders
        </a>
      </div>
    </>
  );
};

export default LeftSideBar;
