import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addRate, setRate } from "../../redux/reducers/rate";
const Rate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [rateNew, setNewRate] = useState("");
  const [isRate, setIsRate] = useState(false);
  const array0 = [];
  const array1 = [];
  const array2 = [];
  const array3 = [];
  const array4 = [];
  const array5 = [];
  const { products, rate, token } = useSelector((state) => {
    return {
      products: state.products.products,
      rate: state.rate.rate,
      token: state.auth.token,
    };
  });
  const addRating = () => {
    axios
      .post(
        `http://localhost:5000/rating/${id}`,
        {
          rate: rateNew,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
         
        console.log(result, "rate resultttt");
        dispatch(addRate({ value: rateNew, product_id: id }));
        setIsRate(true)
         console.log(isRate,"0000000000");
      })
      .catch((err) => {
        // setMessage(err.response.data.message);
      });
  };
  const getRate = () => {
    axios
      .get(`http://localhost:5000/rating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, "555555555555");
        dispatch(setRate(result.data.result));
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getRate();
  }, [isRate]);

  let sum = 0;

  return (
    <div>
      {console.log(rate, "888888")}
      {rate &&
        rate.map((el, i) => {
          return (
            <>
            <div className="TestRating">              {el.value === "0" ? array0.push(el.value) : ""}
              {el.value === "1" ? array1.push(el.value) : ""}
              {el.value === "2" ? array2.push(el.value) : ""}
              {el.value === "3" ? array3.push(el.value) : ""}
              {el.value === "4" ? array4.push(el.value) : ""}
              {el.value === "5" ? array5.push(el.value) : ""}
              </div>


              {console.log(sum, "7777777777")}
            </>
          );
        })}
      <p
        onClick={() => {
          addRating();
        }}
      >
        Rate
      </p>
      <input
        placeholder="rate it from 0-5"
        onChange={(e) => {
          setNewRate(e.target.value);
        }}
      />
      <div>
        <span>
          Rating =
     
          {
        //   Math.round
          ((
              array0.length +
            array1.length * 1 +
            array3.length * 3 +
            array4.length * 4 +
            array5.length * 5) /
            (array0.length +
              array1.length +
              array2.length +
              array3.length +
              array4.length +
              array5.length))}
        </span>
      </div>
    </div>
  );
};
export default Rate;
