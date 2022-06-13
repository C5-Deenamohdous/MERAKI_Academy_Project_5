import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { GiUbisoftSun, GiHeraldicSun } from "react-icons/gi";


const Footer = () => {
    const navigate = useNavigate();

  return (
    <>

<footer className="footer">
{/* 
    <div className="footerLeft">
        <div className="logofooter">
       <p
        className="LOGO"
        onClick={() => {
          navigate("/");
        }}
      >
        <span className="LOGOTEST">ADA</span>
        <span className="ICON">
          <GiUbisoftSun />
        </span>
      </p>
      </div>
<div className="footercontent">
<p onClick={()=>{
     navigate("/profaile");
    }}>AboutUs</p>

<p onClick={()=>{
     navigate("/");
    }}>Products</p>

<p
onClick={()=>{
    navigate("/contactUs");
   }}>Contacts</p>
</div>


    </div>
<div className="colom22">
    <p className="copyright" >© 2021 ADA All Right Reserved.</p> */}
    {/* </div> */}
</footer>
    </>
  );
};

export default Footer;
