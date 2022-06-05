import React from "react";
import { GoogleLogin } from "react-google-login";
const clientId =
  "171142303177-dlklu0me533t11g37ll28pjmd603vh8c.apps.googleusercontent.com";
const LoginGoogle = () => {
  const onSuccess = (res) => {
    console.log(res);
    console.log("login success current user :", res);
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
