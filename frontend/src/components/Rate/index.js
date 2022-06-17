import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { addRate, setRate, updateRate } from "../../redux/reducers/rate";
import Modal from "react-modal";

import ReactStars from "react-stars";

const Rate = () => {
  //
  const [checkArray, setCheckArray] = useState("");
  //
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  // const [rateNew, setNewRate] = useState("");
  const [isRatingDone, setIsRatingDone] = useState(false);

  const ratingChanged = (newRating) => {
    setIsRatingDone(true);
    addRating(newRating.toString());
  };

  const ratingChangedForUpdate = (newRating) => {
    setIsRatingDone(true);
    updateRating(newRating.toString());
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isRate, setIsRate] = useState(false);
  const array0 = [];
  const array1 = [];
  const array2 = [];
  const array3 = [];
  const array4 = [];
  const array5 = [];
  const { rate, token, userId } = useSelector((state) => {
    return {
      rate: state.rate.rate,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });
  const addRating = (RecivedRate) => {
    console.log(RecivedRate, "==========");
    axios
      .post(
        `https://infintyzone.herokuapp.com/rating/${id}`,
        {
          rate: RecivedRate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result, "rate resultttt");
        dispatch(addRate({ value: RecivedRate, product_id: id }));
        setIsRate(!isRate);
        console.log(isRate, "0000000000");
        setTimeout(() => {
          setIsOpen(false);
          setIsRatingDone(false);
        }, 2500);
      })
      .catch((err) => {
        // setMessage(err.response.data.message);
      });
  };

  const updateRating = (updatedValue) => {
    console.log(updatedValue, "===UPDATED VALUE ===");
    axios
      .put(
        `https://infintyzone.herokuapp.com/rating/${id}`,
        {
          rate: updatedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(updateRate({ user_id: userId, value: updatedValue }));
        setIsRate(!isRate);
        console.log(isRate, "EFFECT USED");
        console.log(result, "UPDATE RATE RESULT[");
      })
      .catch((err) => {
        console.log(err, "err in updating ");
      });
  };

  const getRate = () => {
    console.log("RENDERD");
    axios
      .get(`https://infintyzone.herokuapp.com/rating/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, "555555555555");
        dispatch(setRate(result.data.result));
        setCheckArray(
          result.data.result.filter((element) => element.user_id == userId)
        );
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
    <div className="rateContainer">
      {rate &&
        rate.map((el, i) => {
          return (
            <>
              <div className="TestRating">
                {" "}
                {el.value === "0" ? array0.push(el.value) : ""}
                {el.value === "1" ? array1.push(el.value) : ""}
                {el.value === "2" ? array2.push(el.value) : ""}
                {el.value === "3" ? array3.push(el.value) : ""}
                {el.value === "4" ? array4.push(el.value) : ""}
                {el.value === "5" ? array5.push(el.value) : ""}
              </div>
            </>
          );
        })}

      <Modal
        ariaHideApp={false}
        className={"AddRatePopUp"}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
      >
        <div>
          {isRatingDone ? (
            <>
              <span>Thanks For Your Rating</span>
            </>
          ) : (
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              color2={"#ffd700"}
              half={false}
            />
          )}
        </div>
      </Modal>
      {/* Update */}
      <Modal
        ariaHideApp={false}
        className={"AddRatePopUp"}
        isOpen={isOpen2}
        onRequestClose={() => setIsOpen2(false)}
      >
        <div>
          {isRatingDone ? (
            <>
              <span>Thanks For Your Rating</span>
              <p className="A-Hide">
                {setTimeout(() => {
                  setIsOpen2(false);
                  setIsRatingDone(false);
                }, 2500)}
              </p>
            </>
          ) : (
            <div>
              <span>
                Your Previous Rating {checkArray.length && checkArray[0].value}
              </span>
              <ReactStars
                count={5}
                onChange={ratingChangedForUpdate}
                size={40}
                color2={"#ffd700"}
                half={false}
              />
            </div>
          )}
        </div>
      </Modal>

      <div className="RateContainer-1">
        {checkArray.length ? (
          <button
            onClick={() => {
              setIsOpen2(true);
            }}
          >
            Change Your Rate
          </button>
        ) : (
          <button
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Rate Product
          </button>
        )}
        <div className="row-rate">
          <span className="RounderNumber">
            {
              //   Math.round
              (sum =
                Math.round(
                  ((array0.length +
                    array1.length * 1 +
                    array2.length * 2 +
                    array3.length * 3 +
                    array4.length * 4 +
                    array5.length * 5) /
                    (array0.length +
                      array1.length +
                      array2.length +
                      array3.length +
                      array4.length +
                      array5.length)) *
                    100
                ) / 100) || 0
            }
            /5
          </span>
        </div>
        <div className="Flex-Rate">
          <ReactStars
            count={5}
            size={24}
            color2={"#ffd700"}
            half={true}
            edit={false}
            value={sum}
          />
          <span>
            {rate.length ? `Reviews ${rate.length}` : "There's No Reviews yet"}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Rate;
