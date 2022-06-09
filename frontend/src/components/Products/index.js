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
            products.map((products, i) => {
              return (
                <>
                <div class="card">
                <div class="content">
                <div class="front">
                
  <div className="image-Container">
                      <img
                        // onClick={() => {
                        //   navigate(`/OneProduct/${products.id}`);
                        // }}
                        className="productImage"
                        src={products.productImage}
                      />
                    </div>
                   <div className="datails-Container">
                      <p>{products.title}</p>
                      {/* <p>{products.categoryName}</p> */}
                      {/* <p>{products.description}</p> */}
                      <p>{products.price}</p>
                      {/* <p>{products.brandName}</p> */}
                    </div> 
                   
                    
                </div>
                <div class="back">
                  <button>Shop Now</button>
                   {/* <div key={i} className="product-box">
                    <AddToCartButton productId={products.id} />
                    <AddToWishlistButton productId={products.id} /> */}
                     {/* </div> */}
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
