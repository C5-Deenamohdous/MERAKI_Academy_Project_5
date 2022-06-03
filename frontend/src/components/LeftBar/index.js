import "./style.css";
import React, { useState } from "react";
import UsersControlPanel from "../AllUsers";
import { Link ,useNavigate} from "react-router-dom";
import AdminProducts from "../AdminProducts";
import CreateCategory from "../CreateCategory";
import CreateBrand from "../CreateBrand";
import CreateProduct from "../create product";

const LeftSideBar = () => {
  const navigate = useNavigate()
  const [productsSection, setProductsSection] = useState(false);
  const [userSection, setUserSection] = useState(false);

  const [CreateCategorySection, setCreateCategorySection] = useState(false);
  const [CreateBrandSection, setCreateBrandSection] = useState(false);
  const [CreateProductSection, setCreateProductSection] = useState(false);


  return (
    <>
      <div className="Links-Admin">
        <a
          onClick={() => {
            setProductsSection(true);
            setUserSection(false);
            setCreateCategorySection(false);
            setCreateBrandSection(false);
            setCreateProductSection(false);
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
            setCreateProductSection(false);
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
            setCreateProductSection(false);
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
            setCreateProductSection(false);
          }}
        >
          Create Brand
        </a>
        <a
          onClick={() => {
            setUserSection(false);
            setProductsSection(false);
            setUserSection(false);
            setProductsSection(false);
            setCreateCategorySection(false);
            setCreateBrandSection(false);
            setCreateProductSection(true);
          }}
        >
          Create Product
        </a>
      </div>
      {productsSection ? <AdminProducts /> : ""}
      {userSection ? <UsersControlPanel /> : ""}
      {CreateCategorySection ? <CreateCategory /> : ""}
      {CreateBrandSection ? <CreateBrand /> : ""}
      {CreateProductSection ? <CreateProduct /> : ""}

      

    </>
  );
};

export default LeftSideBar;
