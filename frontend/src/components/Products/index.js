import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartButton from "../addToCart"
import { setProducts } from "../../redux/reducers/products";
import { useNavigate } from "react-router-dom";
import { setCart } from "../../redux/reducers/cart";
const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const { products, cart, token } = useSelector((state) => {
    return {
      products: state.products.products,
      cart: state.cart.cart,
      token: state.auth.token,
    };
  });

  const getProductInCart = () => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `CARTFORUSER`);
        dispatch(setCart(result.data.result));
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };
  const getAllProducts = async () => {
    axios
      .get("http://localhost:5000/product/?page=1&limit=3")

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
  const nextPage = () => {
    axios
      .get("http://localhost:5000/product/?page=2&limit=3", 
      )
      .then((result) => {
        dispatch(setProducts(result.data.result));
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };
  useEffect(() => {
    getAllProducts();
    getProductInCart();
  }, []);

  return (
    <div>
      <p>All products</p>

      <div className="Container">
        <div className="row-Container">
          {products &&
            products.map((products, i) => {
              return (
                <>
                  <AddToCartButton productId={products.id} />
                  <div
                    key={i}
                    className="product-box"
                    onClick={() => {
                      navigate(`/OneProduct/${products.id}`);
                    }}
                  >
                    <div className="image-Container">
                      <img
                        className="productImage"
                        src={products.productImage}
                      />
                    </div>
                    <div className="datails-Container">
                      <p>{products.title}</p>
                      <p>{products.categoryName}</p>
                      <p>{products.description}</p>
                      <p>{products.price}</p>
                      <p>{products.brandName}</p>
                    </div>
                    
                  </div>
                </>
               
              );
            })}
        </div>
      </div>
      <button
          className="nextButton"
          onClick={() => {
            
            setPage(2);
            setLimit(3);
            nextPage();
          }}
        >
          <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
    </div>
  
  );
  
};

export default Product;
