import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProduct } from "../../redux/reducers/admin";
import { useNavigate, useParams } from "react-router-dom";
import Cloud from "../Cloud";

//creteProduct
const CreateProduct = () => {
  const { token, isLoggedIn } = useSelector((state) => {
    return { token: state.auth.token, isLoggedIn: state.auth.isLoggedIn };
  });

  const [catId, setCatId] = useState("");
  const [BrandtId, setBrandtId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_id, setCategory_id] = useState("");
  const [brand_id, setBrand_id] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const { Product } = useSelector((state) => {
    return {
      Product: state.admin.Product,
    };
  });

  const add_product = () => {
    let newImg = url || productImage;

    axios
      .post(
        `http://localhost:5000/admin/add_product`,

        {
          title,
          description,
          productImage: newImg,
          price,
          quantity,
          category_id: category_id,
          brand_id: brand_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result);
        setMessage("created");
        dispatch(
          setProduct({
            title,
            description,
            productImage: newImg,
            price,
            quantity,
            category_id: category_id,
            brand_id: brand_id,
          })
        );
        // navigate("/admin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [category, setCategory] = useState("");

  const CategoryInsideCreatProduct = () => {
    axios
      .get(`http://localhost:5000/product/categoryName`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [Brand, setBrand] = useState("");

  const BrandsInsideCreatProduct = () => {
    axios
      .get(`http://localhost:5000/product/brandName`)
      .then((result) => {
        setBrand(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CategoryInsideCreatProduct();
    BrandsInsideCreatProduct();
  }, []);

  return (
    <div className="creareP-Container">
      <div className="center">
        <>
          <h1>
            add_product
            <br />
            add_product here{" "}
          </h1>
          <center>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setTitle(e.target.value)}
              />
              <span>enter the title here</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setDescription(e.target.value)}
              />
              <span>enter the description here</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setProductImage(e.target.value)}
              />
              <span>enter the Product Image</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setPrice(e.target.value)}
              />
              <span>enter the price here</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                required="required"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <span>Quantity</span>
            </div>
            <Cloud
              setProductImage={setProductImage}
              url={url}
              setUrl={setUrl}
            />
            <div className="Select-C">
              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setCategory_id(e.target.value);
                }}
              >
                <option disabled selected>
                  CategoryName
                </option>
                {category &&
                  category.map((element, i) => {
                    return (
                      <option value={element.id}>{element.categoryName}</option>
                    );
                  })}
              </select>

              <select
                onChange={(e) => {
                  console.log(e.target.value);
                  setBrand_id(e.target.value);
                }}
              >
                <option disabled selected>
                  BrandName
                </option>
                {Brand &&
                  Brand.map((elem) => {
                    return <option value={elem.id}>{elem.brandName}</option>;
                  })}
              </select>
            </div>

            <button
              onClick={() => {
                add_product();
              }}
            >
              add_product
            </button>
          </center>
        </>
      </div>
    </div>
  );
};
export default CreateProduct;
