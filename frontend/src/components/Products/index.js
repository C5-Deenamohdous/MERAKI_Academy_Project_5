import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProducts } from "../../redux/reducers/products";

const Product = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { products } = useSelector((state) => {
    return {
      products: state.products.products,
    };
  });
  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/product/")

      .then((result) => {
        console.log(result, "}/!!!!}}");
        dispatch(setProducts(result.data.result));
        setMessage("ALL products");
      })
      .catch((err) => {
          console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return <div>
       <p>All products</p>
      {products && 
      products.map((products,i)=>{
          return (
              <div key={i}>
<p>{products.title}</p>
<p>{products.categoryName}</p>
<p>{products.description}</p>
<p>{products.price}</p>
<p>{products.brandName}</p>
<p>{products.productImage}</p>
              </div>
          )
      })}
  </div>;
};

export default Product;
