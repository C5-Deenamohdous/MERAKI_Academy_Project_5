import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneProduct } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../Comments";
import Rate from "../Rate";
const OneProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const { oneProduct } = useSelector((state) => {
    return {
      oneProduct: state.products.oneProduct,
    };
  });
  const getOneProduct = () => {
    axios
      .get(`http://localhost:5000/product/${id}`)
      .then((result) => {
        console.log(result, "******one product");
        dispatch(setOneProduct(result.data.result));
        setMessage("one product");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getOneProduct();
  }, []);
  return (
    <div className="container">
      {oneProduct &&
        oneProduct.map((product, i) => {
          return (
            <>
              <div className="container1"><div className="ONEproductImage">
                  <img src={product.productImage} />
                </div>
               
                
                  <div className="details_Rate">
                    <div className="details-Container">
                      <p className="title1">{product.title}</p>
                      <p className="category1">{product.categoryName}</p>
                      <p className="description1">{product.description}</p>
                      <p  className="price">{product.price}</p>
                      <p className="brandName1">{product.brandName}</p>{" "}
                    </div>
                    <div className="rate">
                      <Rate id={product.product_id} />{" "}
                  
                  </div>
                </div>

               
              </div>
              <div className="comment">
                <Comment id={product.product_id} />{" "}
              </div>
            </>
          );
        })}
    </div>
  );
};

export default OneProduct;
