import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Modal from "react-modal";

const FilterCatgAndBrand = ({ setIsFilterClicked }) => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [activeCatg, setActiveCatg] = useState("");

  const getAllCategories = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err, "ERR IN FILTERPOPUP");
      });
  };

  //navigate(`/category/${catgId2}`);
  // navigate(`/brand/${element.id}`);

  const getAllBrand = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/brandName`)
      .then((result) => {
        setBrand(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllCategories();
    getAllBrand();
  }, []);

  return (
    <Modal
      ariaHideApp={false}
      className={"FILTERPOPUP"}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setIsFilterClicked(false);
      }}
    >
      <div className="Close">
        <span
          onClick={() => {
            setIsOpen(false);
            setIsFilterClicked(false);
          }}
        >
          X
        </span>
      </div>
      <div className="CONTAINER_FILTERPOPUP">
        <div className="HEADER_">
          <h2>CATEGORIES</h2>
        </div>
        <div className="Container_Catg">
          {category &&
            category.map((element) => {
              return (
                <>
                  <span
                    className={
                      element.id == id && location.pathname.includes("category")
                        ? "ACTIVE_SPAN"
                        : ""
                    }
                    onClick={() => {
                      setActiveCatg(element.categoryName);
                      setIsFilterClicked(false);
                      setIsOpen(false);
                      navigate(`/category/${element.id}`);
                    }}
                  >
                    {element.categoryName}
                  </span>
                </>
              );
            })}
        </div>
        <div className="HEADER_">
          <h2>BRANDS</h2>
        </div>
        <div className="Container_Catg">
          {brand &&
            brand.map((element) => {
              return (
                <>
                  <span
                    className={
                      element.id == id && location.pathname.includes("brand")
                        ? "ACTIVE_SPAN"
                        : ""
                    }
                    onClick={() => {
                      setActiveCatg(element.categoryName);
                      setIsFilterClicked(false);
                      setIsOpen(false);
                      navigate(`/brand/${element.id}`);
                    }}
                  >
                    {element.brandName}
                  </span>
                </>
              );
            })}
        </div>
      </div>
    </Modal>
  );
};

export default FilterCatgAndBrand;
