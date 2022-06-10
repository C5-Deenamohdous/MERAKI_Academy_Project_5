import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../addToWishlistButton";
import { setProducts } from "../../redux/reducers/products";
import { useNavigate } from "react-router-dom";


const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [clickNext, setClickNext] = useState(false);

  const { products, token } = useSelector((state) => {
    return {
      products: state.products.products,
      cart: state.cart.cart,
      Wishlist: state.Wishlist.Wishlist,
      token: state.auth.token,
    };
  });
 
  const getAllProducts = async () => {
    axios
      .get(`http://localhost:5000/product/?page=1&limit=15`)

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
  const nextPage = (page) => {
    axios
      .get(`http://localhost:5000/product/?page=${page}&limit=15`)
      .then((result) => {
        dispatch(setProducts(result.data.result));
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="Container">
        <div className="row-Container">
          {products &&
            products.map((element, i) => {
              return (
                <>
                   <div class="card">
                <div class="content">
                  <div class="front">
                    <div className="imgContainer">
                      <img src={element.productImage} />
                    </div>
                    <div className="Price-Title">
                      <p>{element.title}</p>
                      <p>{element.price}</p>
                    </div>
                  </div>
                  <div class="back">
                    <div className="Flip">
                      <div className="Cart-Btns">
                        <AddToCartButton productId={element.id} />
                        <AddToWishlistButton productId={element.id} />
                      </div>
                      <button onClick={()=>{
                        navigate(`/oneProduct/${element.id}`)
                      }} className="Show-More">Show More</button>
                    </div>
                  </div>
                </div>
              </div>
                </>
              );
            })}
        </div>
      </div>
      {clickNext ? (
        <button
          className="backButton"
          onClick={() => {
            setPage(page - 1);
            setLimit(15);
            nextPage(page - 1);
          }}
        >
          back
        </button>
      ) : (
        ""
      )}
      <button
        className="nextButton"
        onClick={() => {
          setPage(page + 1);
          setLimit(15);
          nextPage(page + 1);
        }}
      >
        next
      </button>
    </div>
  );
};

export default Product;
