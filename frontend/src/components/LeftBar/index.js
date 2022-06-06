import "./style.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          Products
        </a>
        <a
          onClick={() => {
            navigate("/admin/all_users");
          }}
        >
          Users
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateCategory");
          }}
        >
          Create Category
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateBrand");
          }}
        >
          Create Brand
        </a>
        <a
          onClick={() => {
            navigate("/admin/CreateProduct");
          }}
        >
          Create Product
        </a>
        <a
          onClick={() => {
            navigate("/admin/all_orders");
          }}
        >
          Orders
        </a>
      </div>
    </>
  );
};

export default LeftSideBar;
