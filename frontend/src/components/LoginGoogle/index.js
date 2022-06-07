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
    console.log(email, "hhhhhhhhhhhhhh");
    axios
      .post("http://localhost:5000/LoginGoogle", {
        email: email,
      })
      .then((result) => {
        console.log(result.data.token, "resulutttttt of login goooglllleeee");
        dispatch(setlogin(result.data));
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("userId", result.data.userId);
        navigate("/Product");
      })
      .catch((err) => {
        console.log(err,"rrrrrrr");
      });
  };
  const onSuccess = (res) => {
    console.log(res.profileObj.email, "||||||||||");
    console.log("login success current user :", res);
    Google(res.profileObj.email);
  };
  const onFailure = (res) => {
    console.log("login failed  :", res);
  };
  return (
    <div>
      <GoogleLogin
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
