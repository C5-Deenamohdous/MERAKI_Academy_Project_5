import "./style.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Category from "../Category";
// import Brand from "../Brand";
import axios from "axios";
const Home = () => {
  const [catg1, setCatg1] = useState("");
  const [catg2, setCatg2] = useState("");
  const [catg3, setCatg3] = useState("");
  const [catg4, setCatg4] = useState("");

  const [isCatg1, setIsCatg1] = useState(true);
  const [isCatg2, setIsCatg2] = useState(false);
  const [isCatg3, setIsCatg3] = useState(false);
  const [isCatg4, setIsCatg4] = useState(false);

  const navigate = useNavigate();

  const getCatg1 = () => {
    axios
      .get(`http://localhost:5000/product/category/1`)
      .then((result) => {
        console.log(result, "Catg1");
        // [...result.data.articles].sort((a, b) => 0.5 - Math.random()
        setCatg1([...result.data.result].sort((a, b) => 0.5 - Math.random()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg2 = () => {
    axios
      .get(`http://localhost:5000/product/category/2`)
      .then((result) => {
        console.log(result, "Catg2");
        setCatg2([...result.data.result].sort((a, b) => 0.5 - Math.random()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg3 = () => {
    axios
      .get(`http://localhost:5000/product/category/3`)
      .then((result) => {
        console.log(result, "Catg3");
        setCatg3([...result.data.result].sort((a, b) => 0.5 - Math.random()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg4 = () => {
    axios
      .get(`http://localhost:5000/product/category/4`)
      .then((result) => {
        console.log(result, "Catg4");
        setCatg4([...result.data.result].sort((a, b) => 0.5 - Math.random()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCatg1();
    getCatg2();
    getCatg3();
    getCatg4();
  }, []);

  const Catg1 = () => {
    return (
      <>
        {catg1 &&
          catg1.slice(0, 8).map((element) => {
            return (
              <div class="card">
                <div class="content">
                  <div class="front">
                    <div className="imgContainer">
                      <img src={element.productimage} />
                    </div>
                    <div className="Price-Title">
                      <p>{element.title}</p>
                      <p>{element.price}</p>
                    </div>
                  </div>
                  <div class="back">Back!</div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const Catg2 = () => {
    return (
      <>
        {catg2 &&
          catg2.slice(0, 8).map((element) => {
            return (
              <div class="card">
                <div class="content">
                  <div class="front">
                    <div className="imgContainer">
                      <img src={element.productImage} />
                    </div>
                    <div className="Price-Title">
                      <p className="Title">{element.title}</p>
                      <p className="Price">{element.price}$</p>
                    </div>
                  </div>
                  <div class="back">Back!</div>
                </div>
              </div>
            );
          })}
      </>
    );
  };
  const Catg3 = () => {
    return (
      <>
        {catg3 &&
          catg3.slice(0, 8).map((element) => {
            return (
              <div class="card">
                <div class="content">
                  <div class="front">
                    <div className="imgContainer">
                      <img src={element.productImage} />
                    </div>
                    <div className="Price-Title">
                      <p className="Title">{element.title}</p>
                      <p className="Price">{element.price}$</p>
                    </div>
                  </div>
                  <div class="back">Back!</div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  const Catg4 = () => {
    return (
      <>
        {catg4 &&
          catg4.slice(0, 8).map((element) => {
            return (
              <div class="card">
                <div class="content">
                  <div class="front">
                    <div className="imgContainer">
                      <img src={element.productImage} />
                    </div>
                    <div className="Price-Title">
                      <p className="Title">{element.title}</p>
                      <p className="Price">{element.price}$</p>
                    </div>
                  </div>
                  <div class="back">Back!</div>
                </div>
              </div>
            );
          })}
      </>
    );
  };

  return (
    <>
      <div className="Header-Photo">
        <div className="Image-H">
          <img src="https://www.pngall.com/wp-content/uploads/2016/05/Laptop-Free-Download-PNG.png" />
        </div>
      </div>
      <span
        className="shopNowButton"
        onClick={() => {
          navigate("/Product");
        }}
      >
        Shop Now
      </span>
      <div className="HomeBtns">
        <span className={isCatg1 ? "Active_HomeP" : ""}>Catg1</span>
        <span className={isCatg2 ? "Active_HomeP" : ""}>Categ2</span>
        <span className={isCatg3 ? "Active_HomeP" : ""}>Catg3</span>
        <span className={isCatg4 ? "Active_HomeP" : ""}>Catg4</span>
      </div>
      {isCatg1 ? (
        <div className="Cards-Container">
          <Catg2 />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
