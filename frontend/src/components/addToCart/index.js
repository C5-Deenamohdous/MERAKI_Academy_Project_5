import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import { addToCart } from "../../redux/reducers/cart";

const AddToCartButton = ({ element }) => {
  
  const dispatch = useDispatch();

  return <button onClick={() => {

  }}></button>;
};

export default AddToCartButton;
