import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategAndBrand = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [brand1, setBrand1] = useState("");
  const [brand2, setBrand2] = useState("");
  const [brand3, setBrand3] = useState("");
  const [catgName1, setCatgName1] = useState("");
  const [catgName2, setCatgName2] = useState("");
  const [catgName3, setCatgName3] = useState("");
  const [catgId1, setCatgId1] = useState("");
  const [catgId2, setCatgId2] = useState("");
  const [catgId3, setCatgId3] = useState("");

  let test;

  const getRandomCatWithBrand = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        let random = Math.random();
        setCategory(
          [...result.data.result].sort((a, b) => 0.5 - random).slice(0, 3)
        );
        test = [...result.data.result].sort((a, b) => 0.5 - random).slice(0, 3);
        test.forEach((element, i) => {
          axios
            .get(`https://infintyzone.herokuapp.com/product/brand_for_catg/${element.id}`)
            .then((result) => {
              if (i == 0) {
                setBrand1(result.data.result.slice(0, 4));
                setCatgId1(element.id);
                setCatgName1(element.categoryName);
              }
              if (i == 1) {
                setBrand2(result.data.result.slice(0, 4));
                setCatgId2(element.id);
                setCatgName2(element.categoryName);
              }
              if (i == 2) {
                setBrand3(result.data.result.slice(0, 4));
                setCatgId3(element.id);
                setCatgName3(element.categoryName);
              }
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRandomCatWithBrand();
  }, []);

  return (
    <>
      <div className="Container-DropDown">
        <div className="CatgNameHeader">
          <h2
            className="DropDown-Btns"
            onClick={() => {
              navigate(`/category/${catgId1}`);
            }}
          >
            {catgName1}
          </h2>
          {brand1 &&
            brand1.map((element) => {
              return (
                <p
                  className="DropDown-Btns"
                  onClick={() => {
                    navigate(`/brand/${element.id}`);
                  }}
                >
                  {element.brandName}
                </p>
              );
            })}
        </div>
        <div className="CatgNameHeader">
          <h2
            className="DropDown-Btns"
            onClick={() => {
              navigate(`/category/${catgId2}`);
            }}
          >
            {catgName2}
          </h2>
          {brand2 &&
            brand2.map((element) => {
              return (
                <p
                  className="DropDown-Btns"
                  onClick={() => {
                    navigate(`/brand/${element.id}`);
                  }}
                >
                  {element.brandName}
                </p>
              );
            })}
        </div>

        <div className="CatgNameHeader">
          <h2
            className="DropDown-Btns"
            onClick={() => {
              navigate(`/category/${catgId3}`);
            }}
          >
            {catgName3}
          </h2>
          {brand3 &&
            brand3.map((element) => {
              return (
                <p
                  className="DropDown-Btns"
                  onClick={() => {
                    navigate(`/brand/${element.id}`);
                  }}
                >
                  {element.brandName}
                </p>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default CategAndBrand;
