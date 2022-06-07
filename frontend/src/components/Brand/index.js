import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setBrand } from "../../redux/reducers/products";
import { useNavigate, useParams } from "react-router-dom";

const Brand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { brand } = useSelector((state) => {
    return {
      brand: state.products.brand,
    };
  });
  const [message, setMessage] = useState("");

  const getAllBrand=()=>{
      axios.get(`http://localhost:5000/product/brandName`).then((result) => {
        console.log(result, "!!!!!!! all  brands");
        dispatch(setBrand(result.data.result));
        setMessage("ALL Brands");
      })
      .catch((err) => {
        console.log(err);
        setMessage(err.response.data.message);
      });
  };
  useEffect(() => {
    getAllBrand();
  }, []);

  return(
    <div>
    <p className="introOfBrandPath">Explore Popular Brand |</p>
      <div className="allBrands">
{
    brand &&
    brand.map((brand, i) => {
      return (
        <div className="returnDiv"
          onClick={() => {
            navigate(`/brand/${brand.id}`);
          }}
        >
          <img className="brandImg" src="https://thumbs.dreamstime.com/z/silver-apple-brand-logo-icon-shadow-isolated-white-background-127321063.jpg"/>
          <p className="brand">{brand.brandName}</p>
        </div>
      );
    })
}

      </div>
      </div>
  )
};
export default Brand;
