import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneCategory, setProducts } from "../../redux/reducers/products";
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
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [optionValue, setOptionValue] = useState("");
  const [saveResult, setSaveResult] = useState("");

  const { oneCategory, products } = useSelector((state) => {
    return {
      oneCategory: state.products.oneCategory,
      products: state.products.products,
    };
  });
  const getOneCategory = () => {
    console.log();
    axios
      .get(`http://localhost:5000/product/category/${id}`)
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
  useEffect(() => {
    getOneCategory();
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
              if (e.target.value == "1") {
                dispatch(setOneCategory([...saveResult]));
              }
              if (e.target.value == "2") {
                dispatch(
                  setOneCategory(
                    [...saveResult].sort((a, b) => a.price - b.price)
                  )
                );
              }
              if (e.target.value == "3") {
                dispatch(
                  setOneCategory(
                    [...saveResult].sort((a, b) => b.price - a.price)
                  )
                );
              }
              if (e.target.value == "4") {
                dispatch(
                  setOneCategory(
                    [...saveResult].sort((a, b) =>
                      a.title.localeCompare(b.title)
                    )
                  )
                );
              }
              if (e.target.value == "5") {
                dispatch(
                  setOneCategory(
                    [...saveResult].sort((a, b) =>
                      b.title.localeCompare(a.title)
                    )
                  )
                );
              }
            }}
            // users.sort((a, b) => a.firstname.localeCompare(b.firstname))
          >
            <option value="1">Best Selling</option>
            <option value="2">Lowest Price</option>
            <option value="3">Highest Price</option>
            <option value="4">A-Z</option>
            <option value="5">Z-A</option>
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
                      <p>{element.price}</p>
                    </div>
                  </div>
                  <div className="back">
                    <div className="Flip">
                      <div className="Cart-Btns">
                        <AddToWishlistButton productId={element.id} />
                        <AddToCartButton
                          productId={element.id}
                          price={element.price}
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
