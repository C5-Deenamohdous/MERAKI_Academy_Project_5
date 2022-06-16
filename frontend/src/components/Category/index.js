import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setCategory } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { category } = useSelector((state) => {
    return {
      category: state.products.category,
    };
  });
  const getAllCategory = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        console.log(result, "****** category");
        dispatch(setCategory(result.data.result));
        setMessage("ALL Category");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <>
      <p className="Paragraph">Explore Popular Category |</p>
      <div className="Main-Container">
        {category &&
          category.map((category, i) => {
            return (
              <div
                className="PhotoAndTitle"
                onClick={() => {
                  navigate(`/category/${category.id}`);
                }}
              >
                <div className="Image">
                  <img
                    className="categoryImg"
                    src="https://ichef.bbci.co.uk/news/2048/cpsprodpb/16452/production/_110781219_gettyimages-1190190284.jpg"
                  />
                </div>
                <div className="Title-H">
                  <p className="category">{category.categoryName}</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Category;
