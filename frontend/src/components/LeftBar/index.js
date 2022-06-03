import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link ,useNavigate} from "react-router-dom";
import AdminProducts from "../AdminProducts";
import CreateCategory from "../CreateCategory";
import CreateBrand from "../CreateBrand";

const LeftSideBar = () => {
  const navigate = useNavigate()
  const [productsSection, setProductsSection] = useState(false);
  const [userSection, setUserSection] = useState(false);

  const [CreateCategorySection, setCreateCategorySection] = useState(false);
  const [CreateBrandSection, setCreateBrandSection] = useState(false);

  return (
    <>
      <div className="Links-Admin">
        <a
          onClick={() => {
            setProductsSection(true);
            setUserSection(false);
            setCreateCategorySection(false);
            setCreateBrandSection(false);
          }}
        >
          Products
        </a>
        <a
          onClick={() => {
            setUserSection(true);
            setProductsSection(false);
            setCreateCategorySection(false);
            setCreateBrandSection(false);
          }}
        >
          Users
        </a>
        <a
          onClick={() => {
            setUserSection(false);
            setProductsSection(false);
            setCreateCategorySection(true);
            setCreateBrandSection(false);
          }}
        >
          Create Category
        </a>
        <a
          onClick={() => {
            setUserSection(false);
            setProductsSection(false);
            setUserSection(false);
            setProductsSection(false);
            setCreateCategorySection(false);
            setCreateBrandSection(true);
          }}
        >
          Create Brand
        </a>
      </div>
      {productsSection ? <AdminProducts /> : ""}
      {userSection ? <UsersControlPanel /> : ""}
      {CreateCategorySection ? <CreateCategory /> : ""}
      {CreateBrandSection ? <CreateBrand /> : ""}
      

    </>
  );
};

export default LeftSideBar;
