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
      url: "https://i0.wp.com/www.smartprix.com/bytes/wp-content/uploads/2021/11/download-4.jpg?fit=1440%2C960&ssl=1",
    },
    {
      url: "https://www.pngall.com/wp-content/uploads/1/Electronic-Download-PNG.png",
    },
    {
      url: "https://9to5mac.com/wp-content/uploads/sites/6/2022/05/iphonerender3.png",
    },
    {
      url: "https://www.apple-wd.com/wp-content/uploads/2022/01/iPhone-14-Pro-1.jpg",
    },
  ];
  //
  const [catg1, setCatg1] = useState("");
  const [catg1Name, setCatg1Name] = useState("");
  //
  const [catg2, setCatg2] = useState("");
  const [catg2Name, setCatg2Name] = useState("");
  //
  const [catg3, setCatg3] = useState("");
  const [catg3Name, setCatg3Name] = useState("");
  //
  const [catg4, setCatg4] = useState("");
  const [catg4Name, setCatg4Name] = useState("");

  //

  const [isCatg1, setIsCatg1] = useState(true);
  const [isCatg2, setIsCatg2] = useState(false);
  const [isCatg3, setIsCatg3] = useState(false);
  const [isCatg4, setIsCatg4] = useState(false);

  const navigate = useNavigate();

  const getCatg1 = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/category/1`)
      .then((result) => {
        console.log(result, "Catg1");
        // [...result.data.articles].sort((a, b) => 0.5 - Math.random()
        setCatg1([...result.data.result].sort((a, b) => 0.5 - Math.random()));
        setCatg1Name(result.data.result[0].categoryName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg2 = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/category/34`)
      .then((result) => {
        console.log(result, "Catg2");
        setCatg2([...result.data.result].sort((a, b) => 0.5 - Math.random()));
        setCatg2Name(result.data.result[0].categoryName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg3 = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/category/44`)
      .then((result) => {
        console.log(result, "Catg3");
        setCatg3([...result.data.result].sort((a, b) => 0.5 - Math.random()));
        setCatg3Name(result.data.result[0].categoryName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCatg4 = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/category/54`)
      .then((result) => {
        console.log(result, "Catg4");
        setCatg4([...result.data.result].sort((a, b) => 0.5 - Math.random()));
        setCatg4Name(result.data.result[0].categoryName);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductInWishlist = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/Wishlist`, {
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
      .get(`https://infintyzone.herokuapp.com/cart`, {
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
      <div className="CONTANER">
        <div className="Card-Container">
          {catg1 &&
            catg1.slice(0, 8).map((element) => {
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
      </div>
    );
  };

  const Catg2 = () => {
    return (
      <div className="CONTANER">
        <div className="Card-Container">
          {catg2 &&
            catg2.slice(0, 8).map((element) => {
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
      </div>
    );
  };
  const Catg3 = () => {
    return (
      <div className="CONTANER">
        <div className="Card-Container">
          {catg3 &&
            catg3.slice(0, 8).map((element) => {
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
      </div>
    );
  };

  const Catg4 = () => {
    return (
      <div className="CONTANER">
        <div className="Card-Container">
          {catg4 &&
            catg4.slice(0, 8).map((element) => {
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
      </div>
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
          {catg1Name}
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
          {catg2Name}
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
          {catg3Name}
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
          {catg4Name}
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
