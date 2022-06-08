import { useNavigate } from "react-router-dom";
import React from "react";
import Category from "../Category";
import Brand from "../Brand";
import "./style.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Category />
      <Brand />
      <span
        className="shopNowButton"
        onClick={() => {
          navigate("/Product");
        }}
      >
        Shop Now
      </span>
    </>
  );
};

export default Home;
