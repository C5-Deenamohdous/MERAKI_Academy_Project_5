import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { addBrand } from "../../redux/reducers/admin";
import axios from "axios";
import Category from "../Category";
import Brand from "../Brand";
import { SiBrandfolder } from "react-icons/si";

import { useSelector, useDispatch } from "react-redux";
const CreateBrand = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  const navigate = useNavigate();
  const [catId, setCatId] = useState("");
  const [categoryName, setcategoryName] = useState("");

  const [brandName, setbrandName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const CreateNewBrand = async (catId) => {
    try {
      const result = await axios.post(
        `https://infintyzone.herokuapp.com/admin/create_brand/${catId}`,

        {
          brandName: brandName,
          category_id: catId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(`${brandName} created`);
        dispatch(
          addBrand({
            brandName: brandName,
            category_id: catId,
          })
        );
      }
      console.log(Brand);
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  const [category, setCategory] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const CategoryInsideCreatBrand = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CategoryInsideCreatBrand();
  }, []);

  return (
    <>
      <div className="creatCateg-Container-A">
        <div className="newCategBar">
          <span>
            <SiBrandfolder />
          </span>
          <span>Create New Brand</span>
        </div>

        <div className="Container-CreateCategory-A">
          <div className="Label-Input-B">
            <label>Brand Name</label>
            <input onChange={(e) => setbrandName(e.target.value)} />
          </div>
          <div>
            <select
              className="SELECT_Brand"
              onChange={(e) => {
                setCatId(e.target.value);
              }}
            >
              <option disabled selected>
                Select Category
              </option>
              {category &&
                category.map((element, i) => {
                  return (
                    <option value={element.id}>{element.categoryName}</option>
                  );
                })}
            </select>
          </div>
          <div className="BtnToCreate-B">
            <button
              onClick={() => {
                CreateNewBrand(catId);
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );

  // <div className="BrandContainer1">
  //   <div className="creatnewBrandBar">
  //     <p >
  //       <SiBrandfolder />   Create New Brand
  //     </p>
  //   </div>

  //   <div className="BrandReturn">

  //     <h1 >
  //       In order to create new brand you have to choose the category for your product
  //     </h1>
  //     <select className="listofCat" onChange={(e) => {
  //       setCatId(e.target.value);
  //     }}>
  //       {category &&
  //         category.map((element, i) => {
  //           return (
  //             <option value={element.id} >

  //               {element.categoryName}
  //             </option>
  //           )
  //         })}
  //     </select>
  //     <div className="CreateBrand">

  //       <div>
  //         <input
  //           placeholder="Brand Name here"
  //           className="input-data-textarea"
  //           onChange={(e) => setbrandName(e.target.value)}
  //         />
  //       </div>

  //       <button className="CreateNewBrandBTN" onClick={() => {
  //         CreateNewBrand(catId);
  //       }}>Create New Brand {categoryName}</button>
  //     </div>
  //   </div>
  // </div>
};

export default CreateBrand;

{
  /* <div className="creatP-Container-A">
      <div className="newProductBar">
        <span>
          <MdCreateNewFolder />
        </span>
        <span>Create New Product</span>
      </div>
      <div className="Container-CreatePruduct-A">
        <div className="Label-Input-A">
          <label>Product Name</label>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="Label-Input-A">
          <label>Product Description</label>
          <input onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="Price-And-Quantity-A">
          <div className="Label-Input-A">
            <label>Product Quantity</label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="Label-Input-A">
            <label>Product Price</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div className="Select-Section-A">
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setCategory_id(e.target.value);
            }}
          >
            <option disabled selected>
              CategoryName
            </option>
            {category &&
              category.map((element, i) => {
                return (
                  <option value={element.id}>{element.categoryName}</option>
                );
              })}
          </select>
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setBrand_id(e.target.value);
            }}
          >
            <option disabled selected>
              BrandName
            </option>
            {Brand &&
              Brand.map((elem) => {
                return <option value={elem.id}>{elem.brandName}</option>;
              })}
          </select>
        </div>
        <div className="Label-Image-A">
          <label>Product Image</label>
          <Cloud setProductImage={setProductImage} url={url} setUrl={setUrl} />
        </div>
        <div className="BtnToCreate-A">
          <button
            onClick={() => {
              add_product();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div> */
}
