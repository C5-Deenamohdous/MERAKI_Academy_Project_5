import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { addBrand } from "../../redux/reducers/admin";
import axios from "axios";
import Category from "../Category";
import Brand from "../Brand";
//=========================Redux======================================

import { useSelector, useDispatch } from "react-redux";
//   CreateBrand  222222

const CreateBrand = () => {

  {/* <Brand/> */ }

  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  const navigate = useNavigate();
  const [catId, setCatId] = useState("");

  const [brandName, setbrandName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  //===============================================================

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
  //===============================================================

  useEffect(() => {
    CategoryInsideCreatBrand();
  }, []);

  //===============================================================
  console.log(category);
  return (
    <div className="categoryContainer1">
    <div className="categoryReturn">
      <form className="CreateBrand">
        <br />
        <input
          type="text"
          placeholder="Brand Name here"
          onChange={(e) => setbrandName(e.target.value)}
        />
        <button onClick={()=>{
       CreateNewBrand(catId);
        }}>Create New Brand</button>
      </form>
      <br />
      {status
        ? message && <div className="SuccessMessage">{message}</div>
        : message && <div className="ErrorMessage">{message}</div>}
      <button onClick={() => {
        setIsClicked(true);
      }}> choose category to add Brand</button>
      {isClicked ?
        category &&
        category.map((element, i) => {
          return (
            <p onClick={() => {
              setCatId(element.id)
              console.log(catId);
              setIsClicked(false)
            }}>
             category name : {element.categoryName}
            </p>
          )
        })
        : ""}
         {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
    </div>
      </div>
  );
};

export default CreateBrand;



