import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../addToWishlistButton";
import { setProducts } from "../../redux/reducers/products";
import { useNavigate } from "react-router-dom";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

//====
import FilterCatgAndBrand from "../FilterCatgAndBrand";
//====

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ======
  const [allCategory, setAllCategory] = useState("");
  // =>
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [saveResult, setSaveResult] = useState("");

  const [isFilter1, setIsFilter1] = useState(false);
  const [isFilter2, setIsFilter2] = useState(false);

  const [firstFilter, setFirstFilter] = useState("");
  const [secondFilter, setSecondFilter] = useState("");

  // ======

  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
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
      .get(`https://infintyzone.herokuapp.com/product/?page=1&limit=12`)

      .then((result) => {
        console.log(result, "}/!!!!}}");
        dispatch(setProducts(result.data.result));
        setSaveResult(result.data.result);
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  //
  const nextPage = (page) => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/?page=${page}&limit=12`)
      .then((result) => {
        dispatch(setProducts(result.data.result));
      })
      .catch((error) => {
        setMessage(error.response.data.message);
      });
  };

  const getAllCategories = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        setAllCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err, "ERR IN FILTERPOPUP");
      });
  };

  useEffect(() => {
    getAllProducts();
    getAllCategories();
  }, []);

  return (
    <div className="CONTANER">
      <div className="Section-Header">
        <h2>All Products</h2>
      </div>

      <div className="FilterBtns">
        <div>
          <span>Sory by</span>
          <select
            onChange={(e) => {
              setIsFilter1(true);
              if (e.target.value == "1") {
                if (isFilter2) {
                  setIsFilter1(false);
                  dispatch(setProducts([...secondFilter]));
                } else {
                  dispatch(setProducts([...saveResult]));
                  setIsFilter1(false);
                  setFirstFilter([...saveResult]);
                }
              }
              if (e.target.value == "2") {
                if (isFilter2) {
                  dispatch(
                    setProducts(
                      [...secondFilter].sort((a, b) => a.price - b.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => a.price - b.price)
                  );
                } else {
                  dispatch(
                    setProducts(
                      [...saveResult].sort((a, b) => a.price - b.price)
                    )
                  );
                  setFirstFilter(
                    [...saveResult].sort((a, b) => a.price - b.price)
                  );
                }
              }
              if (e.target.value == "3") {
                if (isFilter2) {
                  console.log("SEET");
                  console.log("Second", secondFilter);
                  dispatch(
                    setProducts(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setProducts(
                      [...saveResult].sort((a, b) => b.price - a.price)
                    )
                  );
                  setFirstFilter(
                    [...saveResult].sort((a, b) => b.price - a.price)
                  );
                }
              }
              if (e.target.value == "4") {
                if (isFilter2) {
                  dispatch(
                    setProducts(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setProducts(
                      [...saveResult].sort((a, b) =>
                        a.title.localeCompare(b.title)
                      )
                    )
                  );
                  setFirstFilter(
                    [...saveResult].sort((a, b) =>
                      a.title.localeCompare(b.title)
                    )
                  );
                }
              }
              if (e.target.value == "5") {
                if (isFilter2) {
                  dispatch(
                    setProducts(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setProducts(
                      [...saveResult].sort((a, b) =>
                        b.title.localeCompare(a.title)
                      )
                    )
                  );
                  setFirstFilter(
                    [...saveResult].sort((a, b) =>
                      b.title.localeCompare(a.title)
                    )
                  );
                }
              }
            }}
          >
            <option value="1">Best Selling</option>
            <option value="2">Lowest Price</option>
            <option value="3">Highest Price</option>
            <option value="4">A-Z</option>
            <option value="5">Z-A</option>
          </select>
          {/* ============================= */}
          {/* <select
            onChange={(e) => {
              setIsFilter2(true);
              if (isFilter1) {
                console.log("FIRST", firstFilter);
                dispatch(
                  setProducts(
                    firstFilter.filter(
                      (element) => element.categoryName === e.target.value
                    )
                  )
                );
                setSecondFilter(
                  firstFilter.filter(
                    (element) => element.categoryName === e.target.value
                  )
                );
              } else {
                dispatch(
                  setProducts(
                    saveResult.filter(
                      (element) => element.categoryName === e.target.value
                    )
                  )
                );
                setSecondFilter(
                  saveResult.filter(
                    (element) => element.categoryName === e.target.value
                  )
                );
              }
            }}
          >
            <option disabled selected>
              All Categories
            </option>
            {allCategory &&
              allCategory.map((element) => {
                return (
                  <option value={element.categoryName}>
                    {element.categoryName}
                  </option>
                );
              })}
          </select> */}
        </div>

        <span
          className="F_"
          onClick={() => {
            setIsFilterClicked(true);
          }}
        >
          FILTER
        </span>
      </div>
      <div className="Card-Container">
        {products &&
          products.map((element) => {
            return (
              <div className="card">
                <div className="content">
                  <div className="front">
                    <div className="imgContainer">
                      <img src={element.productImage} />
                    </div>
                    <div className="Price-Title">
                      <p>{element.title}</p>
                      <p className="card_Price">${element.price}</p>
                    </div>
                  </div>
                  <div className="back">
                    <div className="Flip">
                      <div className="FlippedImg">
                        <img src={element.productImage} />
                      </div>
                      <div className="Cart-Btns">
                        <AddToWishlistButton productId={element.id} />
                        <AddToCartButton
                          productId={element.id}
                          price={element.price}
                          productImage={element.productImage}
                          title={element.title}
                        />
                      </div>
                      <button
                        className="Show-More"
                        onClick={() => {
                          navigate(`/oneProduct/${element.id}`);
                        }}
                      >
                        Show More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {isFilterClicked ? (
        <FilterCatgAndBrand setIsFilterClicked={setIsFilterClicked} />
      ) : (
        ""
      )}
<div className="nextback">
      {clickNext ? (
        <span
          className="backButton"
          onClick={() => {
            setPage(page - 1);
            setLimit(12);
            nextPage(page - 1);
          }}
        >
          <FcPrevious/>
        </span>
      ) : (
        ""
      )}

      <span
        className="nextButton"
        onClick={() => {
          setPage(page + 1);
          setLimit(12);
          nextPage(page + 1);
          setClickNext(true);
        }}
      >
       <FcNext/>
      </span>
    </div>
    </div>
  );
};

export default Product;
