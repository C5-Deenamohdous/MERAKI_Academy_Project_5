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
        `http://localhost:5000/admin/create_brand/${catId}`,

        {
          brandName: brandName,
          category_id: catId
        }
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(`${brandName} created`);
        dispatch(addBrand({
          brandName: brandName,
          category_id: catId
        }));
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
      .get(`http://localhost:5000/product/categoryName`)
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

    
    <div className="BrandContainer1"> 
      <div className="creatnewBrandBar">
        <p >
        <SiBrandfolder/>   Create New Brand
        </p>
      </div>

      <div className="BrandReturn">
   


      <button className="CreateNewBrandBtn" onClick={() => {
          setIsClicked(true);
        }}> choose category to add Brand</button>
        {isClicked ?
          category &&
          category.map((element, i) => {
            return (
              <button className="listofCat" onClick={() => {
                setCatId(element.id);
                setcategoryName(element.categoryName)
                console.log(catId);
                setIsClicked(false)
              }}>
              {element.categoryName}
              </button>
            )
          })
          : ""}


        <form className="CreateBrand">
          <br />
          <input className="NewBrandInput"
            type="text"
            placeholder="Brand Name here"
            onChange={(e) => setbrandName(e.target.value)}
          />
          <button className="CreateNewBrandBtn" onClick={() => {
            CreateNewBrand(catId);
          }}>Create New Brand for {categoryName}</button>
        </form>
        <br />
        <div className="BrandMessage">

        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
          </div>
        <div className="BrandMessage">
          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;



