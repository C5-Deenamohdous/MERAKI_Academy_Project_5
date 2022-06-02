import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Category  from "../Category"

const NavBar = () => {

    const dispatch = useDispatch();


  return (

    <div className="NavBar">NavBar</div>

    <div>NavBar
      <Category/>
    </div>

  )
}

export default NavBar