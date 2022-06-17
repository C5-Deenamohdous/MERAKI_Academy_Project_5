import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  setCategory,
  setOneCategory,
  setProducts,
} from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../addToWishlistButton";
import FilterCatgAndBrand from "../FilterCatgAndBrand";
const OneCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [sectionName, setSectionName] = useState("");
  ////
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [saveResult, setSaveResult] = useState("");
  //Test
  const [isFilter1, setIsFilter1] = useState(false);
  const [isFilter2, setIsFilter2] = useState(false);
  //
  const [firstFilter, setFirstFilter] = useState("");
  const [secondFilter, setSecondFilter] = useState("");
  ///

  const [brandsForCateg, setBrandsForCateg] = useState("");

  const { oneCategory, products } = useSelector((state) => {
    return {
      oneCategory: state.products.oneCategory,
      products: state.products.products,
    };
  });
  const getOneCategory = () => {
    console.log();
    axios
      .get(`https://infintyzone.herokuapp.com/product/category/${id}`)
      .then((result) => {
        console.log(result, "******one category by id ");
        dispatch(setOneCategory(result.data.result));
        setSaveResult(result.data.result);
        setSectionName(result.data.result[0].categoryName);
        setMessage("one category");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };

  const getAllBrandsForCateg = () => {
    console.log();
    axios
      .get(`https://infintyzone.herokuapp.com/product/brand_for_catg/${id}`)
      .then((result) => {
        console.log(result, "ALL BRAANDS");
        setBrandsForCateg(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOneCategory();
    getAllBrandsForCateg();
  }, [id]);
  return (
    <div className="CONTANER">
      <div className="Section-Header">
        {/* using State To set Section Header */}
        <h2>{sectionName ? sectionName : ""} </h2>
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
                  dispatch(setCategory([...secondFilter]));
                } else {
                  dispatch(setOneCategory([...saveResult]));
                  setIsFilter1(false);
                  setFirstFilter([...saveResult]);
                }
              }
              if (e.target.value == "2") {
                if (isFilter2) {
                  dispatch(
                    setOneCategory(
                      [...secondFilter].sort((a, b) => a.price - b.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => a.price - b.price)
                  );
                } else {
                  dispatch(
                    setOneCategory(
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
                    setOneCategory(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneCategory(
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
                    setOneCategory(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneCategory(
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
                    setOneCategory(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneCategory(
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
          <select
            onChange={(e) => {
              setIsFilter2(true);
              if (isFilter1) {
                console.log("FIRST", firstFilter);
                dispatch(
                  setOneCategory(
                    firstFilter.filter(
                      (element) => element.brandName === e.target.value
                    )
                  )
                );
                setSecondFilter(
                  firstFilter.filter(
                    (element) => element.brandName === e.target.value
                  )
                );
              } else {
                dispatch(
                  setOneCategory(
                    saveResult.filter(
                      (element) => element.brandName === e.target.value
                    )
                  )
                );
                setSecondFilter(
                  saveResult.filter(
                    (element) => element.brandName === e.target.value
                  )
                );
              }
            }}
          >
            <option disabled selected>
              All Brands
            </option>
            {brandsForCateg &&
              brandsForCateg.map((element) => {
                return (
                  <option value={element.brandName}>{element.brandName}</option>
                );
              })}
          </select>
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
        {oneCategory &&
          oneCategory.map((element) => {
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
    </div>
  );
};
export default OneCategory;
