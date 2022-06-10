import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const CategAndBrand = () => {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [brand1, setBrand1] = useState("");
  const [brand2, setBrand2] = useState("");
  const [brand3, setBrand3] = useState("");
  const [index, setIndex] = useState("");
  let test;

  const getRandomCatWithBrand = () => {
    axios
      .get(`http://localhost:5000/product/categoryName`)
      .then((result) => {
        console.log(result, "****** ");
        let random = Math.random();
        setCategory(
          [...result.data.result].sort((a, b) => 0.5 - random).slice(0, 3)
        );
        test = [...result.data.result].sort((a, b) => 0.5 - random).slice(0, 3);
        console.log(test, "TEESTARRAAY");
        test.forEach((element, i) => {
          axios
            .get(`http://localhost:5000/product/brand_for_catg/${element.id}`)
            .then((result) => {
              if (i == 0) {
                setBrand1(result.data.result);
              }
              if (i == 1) {
                setBrand2(result.data.result);
              }
              if (i == 2) {
                setBrand3(result.data.result);
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
      <div>
        <h2>CATG1 </h2>
        {brand1 &&
          brand1.map((element) => {
            return <p>NAAME{element.brandName}</p>;
          })}
      </div>
      <div>
        <h2>CATG2 </h2>
        {brand2 &&
          brand2.map((element) => {
            return <p>NAAME{element.brandName}</p>;
          })}
      </div>

      <div>
        <h2>CATG3 </h2>
        {brand3 &&
          brand3.map((element) => {
            return <p>NAAME{element.brandName}</p>;
          })}
      </div>
    </>
  );
};

export default CategAndBrand;
