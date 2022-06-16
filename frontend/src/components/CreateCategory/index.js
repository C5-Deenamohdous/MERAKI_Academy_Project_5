import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { addCategory } from "../../redux/reducers/admin";
import Category from "../Category";
import { BiCategory } from "react-icons/bi";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const CreateCategory = () => {
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  const navigate = useNavigate();

  const [categoryName, setcategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const NewCategory = async () => {
    try {
      const category = {
        categoryName,
      };
      const result = await axios.post(
        `https://infintyzone.herokuapp.com/admin/create_category`,
        category,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        console.log("CatgCreated");
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

  useEffect(() => {}, []);

  return (
    <div className="creatCateg-Container-A">
      <div className="newCategBar">
        <span>
          <BiCategory />
        </span>
        <span>Create New Category</span>
      </div>

      <div className="Container-CreateCategory-A">
        <div className="Label-Input-B">
          <label>Category Name</label>
          <input
            onChange={(e) => {
              setcategoryName(e.target.value);
            }}
          />
        </div>

        <div className="BtnToCreate-B">
          <button
            onClick={() => {
              NewCategory();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;