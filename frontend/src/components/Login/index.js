import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setlogin } from "../../redux/reducers/auth";
import LoginGoogle from "../LoginGoogle";
const Login = () => {
  const dispatch = useDispatch();

  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const[isClick,setIsClick]=useState(false)

  const login = async (e) => {
    e.preventDefault();
    console.log("Login:");
    try {
      const res = await axios.post("https://infintyzone.herokuapp.com/login", {
        email,
        password,
      });
      console.log(res);
      if (res) {
        setMessage("");
        dispatch(setlogin(res.data));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        localStorage.setItem("role_id", res.data.role_id);
        navigate("/");
        // saveToken(res.data.token);
      
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
    }
  });
  return (
    <>
      <div className="center">
      {!isClick  ?
        <ul className="login-Register-Menu">
          <li  className="login" onClick={()=>{
         navigate("/Login") 
        }}> Login  </li>
          <li className="loginInRegister" onClick={()=>{
         navigate("/Register") 
        }}> Register  </li>
        </ul>
          : ""  }
       
          <br />

          <div className="inputLabel">
             
            <input className="emailInput"
            placeholder="Email"
              type="text"
              required="required"
              onChange={(e) => setEmail(e.target.value)}
            />
           
          </div>

          <br />
          <div className="inputLabel">
         
            <input className="passwordInput"
              type="password"
              placeholder="Password"
              required="required"
              onChange={(e) => setPassword(e.target.value)}
            />
           
          </div>
          <br />
          <button
            className="loginButton"
            onClick={(e) => {
              login(e);
            }}
          >
            LOGIN
          </button>

          {status
            ? message && <div className="SuccessMessage">{message}</div>
            : message && <div className="ErrorMessage">{message}</div>}
   
        <LoginGoogle />
      </div>
    </>
  );
};

export default Login;
