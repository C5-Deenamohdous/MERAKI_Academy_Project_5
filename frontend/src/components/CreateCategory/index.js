import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import {addCategory} from "../../redux/reducers/admin"
import Category from "../Category";
import { BiCategory } from "react-icons/bi";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const CreateCategory = ()=>{
    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => {
      return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
    });
  
    const navigate = useNavigate();
  
    const [categoryName, setcategoryName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    const NewCategory = async (e) => {
      e.preventDefault();
      try {
        const category = {
            categoryName,
        };
        const result = await axios.post(
          `http://localhost:5000/admin/create_category`,
          category,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.success) {
          setStatus(true);
          setMessage(`${categoryName} created`);
          console.log(result.data.result.insertId);
          dispatch(addCategory(category));
        }
        console.log(category);
      } catch (error) {
        if (!error.response.data.success) {
          setStatus(false);
          setMessage(error.response.data.message);
        }
      }
    };
    
    useEffect(() => {},[]);
  
    return (
      <div className="categoryContainer1">
              <div className="creatnewBrandBar">
        <p >
         <BiCategory/>       Create New category
        </p>
      </div>

      <div className="categoryReturn">
        <form className="NewCategory" onSubmit={NewCategory
        
        }>
          <h1>  specify the category of your Brand</h1>
          <br />
          <input
          className="NewCategoryInput"
            type="text"
            placeholder="category Name here"
            onChange={(e) => setcategoryName(e.target.value)}
          />
          <br />

          <br />
          <button className="CreateNewCategoryBtn">Create New category</button>
        </form>
        <br />
        <div className="CreateNewCategoryMessage">
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
          </div>
      </div>
      </div>
    );
  };
  
  export default CreateCategory;



