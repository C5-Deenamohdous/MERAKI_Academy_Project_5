import "./style.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SimpleImageSlider from "react-simple-image-slider";
import AddToCartButton from "../AddToCart";
import AddToWishlistButton from "../addToWishlistButton";

import { setCart } from "../../redux/reducers/cart";
import { setWishlist } from "../../redux/reducers/WishList";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });

  const images = [
    {
      url: "https://www.pngall.com/wp-content/uploads/1/Electronic-High-Quality-PNG.png",
    },
    {
      url: "https://www.pngall.com/wp-content/uploads/1/Electronic-Download-PNG.png",
    },
  ];
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

  const getProductInWishlist = () => {
    axios
      .get(`http://localhost:5000/Wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `WishlistFORUSER`);
        dispatch(setWishlist(result.data.result));
        // subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER Wishlist`);
      });
  };

  const getProductInCart = () => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `CARTFORUSER`);
        dispatch(setCart(result.data.result));
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  useEffect(() => {
    getCatg1();
    getCatg2();
    getCatg3();
    getCatg4();
    getProductInCart();
    getProductInWishlist();
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
                  <div class="back">
                    <div className="Flip">
                      <div className="Cart-Btns">
                        <AddToCartButton productId={element.id} />
                        <AddToWishlistButton productId={element.id} />
                      </div>
                      <button className="Show-More">Show More</button>
                    </div>
                  </div>
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
      <div className="Slider">
        <SimpleImageSlider
          style={{ width: "80%" }}
          width={"100%"}
          height={"90vh"}
          images={images}
          showBullets={true}
          showNavs={true}
          slideDuration={1}
          autoPlayDelay={7}
          navStyle={2}
          bgColor={"#f3f3f5"}
          autoPlay={true}
        />
      </div>
      {/* <div className="Header-Photo">
        <div className="Image-H">
          <img src="https://www.pngall.com/wp-content/uploads/2016/05/Laptop-Free-Download-PNG.png" />
        </div>
      </div> */}
      <span
        className="shopNowButton"
        onClick={() => {
          navigate("/Product");
        }}
      >
        Shop Now
      </span>
      <div className="HomeBtns">
        <span
          className={isCatg1 ? "Active_HomeP" : ""}
          onClick={() => {
            setIsCatg1(true);
            setIsCatg2(false);
            setIsCatg3(false);
            setIsCatg4(false);
          }}
        >
          Catg1
        </span>
        <span
          className={isCatg2 ? "Active_HomeP" : ""}
          onClick={() => {
            setIsCatg1(false);
            setIsCatg2(true);
            setIsCatg3(false);
            setIsCatg4(false);
          }}
        >
          Categ2
        </span>

        <span
          className={isCatg3 ? "Active_HomeP" : ""}
          onClick={() => {
            setIsCatg1(false);
            setIsCatg2(false);
            setIsCatg3(true);
            setIsCatg4(false);
          }}
        >
          Catg3
        </span>
        <span
          className={isCatg4 ? "Active_HomeP" : ""}
          onClick={() => {
            setIsCatg1(false);
            setIsCatg2(false);
            setIsCatg3(false);
            setIsCatg4(true);
          }}
        >
          Catg4
        </span>
      </div>
      {isCatg1 ? (
        <div className="Cards-Container">
          <Catg1 />
        </div>
      ) : (
        ""
      )}
      {isCatg2 ? (
        <div className="Cards-Container">
          <Catg2 />
        </div>
      ) : (
        ""
      )}
      {isCatg3 ? (
        <div className="Cards-Container">
          <Catg3 />
        </div>
      ) : (
        ""
      )}
      {isCatg4 ? (
        <div className="Cards-Container">
          <Catg4 />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
