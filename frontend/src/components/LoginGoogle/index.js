import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { setlogin } from "../../redux/reducers/auth";
import axios from "axios";
const clientId =
  "171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com";

const LoginGoogle = () => {
  const { token, isLoggedIn } = useSelector((state) => {
    return {
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Google = (email) => {
    axios
      .post("https://infintyzone.herokuapp.com/LoginGoogle", {
        email: email,
      })
      .then((result) => {
        dispatch(setlogin(result.data));
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        localStorage.setItem("role_id", result.data.role_id);
        navigate("/Product");
      })
      .catch((err) => {
        console.log(err,);
      });
  };
  const onSuccess = (res) => {
  
    console.log("login success current user :", res);
    Google(res.profileObj.email);
  };
  const onFailure = (res) => {
    console.log("login failed  :", res);
  };
  return (
    <div className="main">
      <GoogleLogin className="googleLogin"
        clientId={clientId}
        buttonText="Login"
      
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default LoginGoogle;
