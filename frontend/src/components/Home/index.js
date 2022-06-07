import { useNavigate } from "react-router-dom";
import React from 'react'
import Category from "../Category";
import Brand from "../Brand";
import "./style.css";
const Home = () => {
    const navigate=useNavigate();
  return (
    <div>
      
          <Category />
          <Brand />
          <button className="shopNowButton" onClick={()=>{
navigate("/Product")
          }}>Shop Now</button>
    </div>
  )
}

export default Home