import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneBrand, setProducts } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../addToWishlistButton";
import FilterCatgAndBrand from "../FilterCatgAndBrand";
const OneBrand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sectionName, setSectionName] = useState("");
  const [saveResult, setSaveResult] = useState("");

  // ===Filter

  // =>
  const [allCategory, setAllCategory] = useState("");
  // =>
  const [isFilterClicked, setIsFilterClicked] = useState(false);
  const [optionValue, setOptionValue] = useState("");

  const [isFilter1, setIsFilter1] = useState(false);
  const [isFilter2, setIsFilter2] = useState(false);

  const [firstFilter, setFirstFilter] = useState("");
  const [secondFilter, setSecondFilter] = useState("");

  //===Filter

  const { oneBrand, products } = useSelector((state) => {
    return {
      oneBrand: state.products.oneBrand,
      products: state.products.products,
    };
  });
  const getOneBrand = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/brand/${id}`)
      .then((result) => {
        console.log(result, "******one brand by id ");
        dispatch(setOneBrand(result.data.result));
        setSectionName(result.data.result[0].brandName);
        setSaveResult(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategories = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/0000/filter_All_Categ`)
      .then((result) => {
        let tempArray = [];
        let test = result.data.result;
        setAllCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err, "ERR IN FILTERPOPUP");
      });
  };

  useEffect(() => {
    getOneBrand();
    getAllCategories();
  }, [id]);
  return (
    <div className="CONTANER">
      <div className="Section-Header">
        {/* using State To set Section Header */}
        <h2>{sectionName ? sectionName : ""} </h2>
      </div>

      <div className="FilterBtns">
        {/* COPIED TO HERE */}
        <div>
          <span>Sory by</span>
          <select
            onChange={(e) => {
              setIsFilter1(true);
              if (e.target.value == "1") {
                if (isFilter2) {
                  setIsFilter1(false);
                  // dispatch(setCategory([...secondFilter]));
                } else {
                  dispatch(setOneBrand([...saveResult]));
                  setIsFilter1(false);
                  setFirstFilter([...saveResult]);
                }
              }
              if (e.target.value == "2") {
                if (isFilter2) {
                  dispatch(
                    setOneBrand(
                      [...secondFilter].sort((a, b) => a.price - b.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => a.price - b.price)
                  );
                } else {
                  dispatch(
                    setOneBrand(
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
                    setOneBrand(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setFirstFilter(
                    [...firstFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneBrand(
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
                    setOneBrand(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneBrand(
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
                    setOneBrand(
                      [...secondFilter].sort((a, b) => b.price - a.price)
                    )
                  );
                  setSecondFilter(
                    [...secondFilter].sort((a, b) => b.price - a.price)
                  );
                } else {
                  dispatch(
                    setOneBrand(
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
                  setOneBrand(
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
                  setOneBrand(
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
              allCategory
                .filter((element) => element.brandName == sectionName)
                .map((element) => {
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
        {oneBrand &&
          oneBrand.map((element) => {
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
export default OneBrand;
