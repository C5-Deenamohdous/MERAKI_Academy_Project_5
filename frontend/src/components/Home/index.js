import { useNavigate } from "react-router-dom";
import React from "react";
import Category from "../Category";
import Brand from "../Brand";
import "./style.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="Header-Photo">
        <div className="Image-H">
          <img src="https://images.unsplash.com/photo-1524289286702-f07229da36f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGFwcGxlJTIwcHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80" />
        </div>
      </div>
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
