import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { addBrand } from "../../redux/reducers/admin";
import axios from "axios";

//=========================Redux======================================

import { useSelector, useDispatch } from "react-redux";
const CreateBrand = ()=>{

    const dispatch = useDispatch();
    const { token, isLoggedIn } = useSelector((state) => {
      return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
    });
  
    const navigate = useNavigate();
  
    const [brandName, setbrandName] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
  
    //===============================================================
  
    const CreateNewBrand = async (e) => {
      e.preventDefault();
      try {
        const Brand = {
            brandName,
        };
        const result = await axios.post(
          `http://localhost:5000/admin/create_brand/:id`,
          Brand,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result.data.success) {
          setStatus(true);
          setMessage(`${brandName} created`);
          dispatch(addBrand(Brand));
        }
        console.log(Brand);
      } catch (error) {
        if (!error.response.data.success) {
          setStatus(false);
          setMessage(error.response.data.message);
        }
      }
    };
  
    //===============================================================
  
    useEffect(() => {},[]);
  
    //===============================================================
    return (
      <>
        <form onSubmit={CreateNewBrand}>
          <br />
          <input
            type="text"
            placeholder="Brand Name here"
            onChange={(e) => setbrandName(e.target.value)}
          />
          <br />

          <br />
          <button>Create New Brand</button>
        </form>
        <br />
        {status
          ? message && <div className="SuccessMessage">{message}</div>
          : message && <div className="ErrorMessage">{message}</div>}
      </>
    );
  };
  
  export default CreateBrand;



