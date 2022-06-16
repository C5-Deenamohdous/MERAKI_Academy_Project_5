import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProduct } from "../../redux/reducers/admin";
import { useNavigate, useParams } from "react-router-dom";
import Cloud from "../Cloud";
import { MdCreateNewFolder } from "react-icons/md";

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
        `https://infintyzone.herokuapp.com/admin/add_product`,

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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [category, setCategory] = useState("");

  const CategoryInsideCreatProduct = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
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
      .get(`https://infintyzone.herokuapp.com/product/brandName`)
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
    <div className="creatP-Container-A">
      <div className="newProductBar">
        <span>
          <MdCreateNewFolder />
        </span>
        <span>Create New Product</span>
      </div>
      <div className="Container-CreatePruduct-A">
        <div className="Label-Input-A">
          <label>Product Name</label>
          <input onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="Label-Input-A">
          <label>Product Description</label>
          <input onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="Price-And-Quantity-A">
          <div className="Label-Input-A">
            <label>Product Quantity</label>
            <input
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="Label-Input-A">
            <label>Product Price</label>
            <input type="number" onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>

        <div className="Select-Section-A">
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
        <div className="Label-Image-A">
          <label>Product Image</label>
          <Cloud setProductImage={setProductImage} url={url} setUrl={setUrl} />
        </div>
        <div className="BtnToCreate-A">
          <button
            onClick={() => {
              add_product();
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateProduct;
