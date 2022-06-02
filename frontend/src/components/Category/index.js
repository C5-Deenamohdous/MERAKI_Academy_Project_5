import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategory } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

const Category=()=>{
const navigate=useNavigate();
const dispatch = useDispatch();
const [message, setMessage] = useState("");
const { category } =useSelector((state) => {
  return {
    category:state.products.category,
  };
});
const getAllCategory=()=>{

}
}
module.exports=Category;