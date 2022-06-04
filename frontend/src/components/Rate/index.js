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
  const [ratingNum, setRatingNum] = useState("");
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
          console.log(result,"555555555555");
        dispatch(setRate(result.data.result));
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getRate();
  }, []);

  let sum = 0;

  return (
      
    <div>
        {console.log(rate,"888888")}
      {rate &&
        rate.map((el, i) => {
          return (
            <>
              {(sum = +el.value + +sum )}
             {console.log(sum,"7777777777")}
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
        <span>Rating {sum.toString()} </span>
      </div>
    </div>
  );
};
export default Rate;
