import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setOneProduct, updateOneProduct } from "../../redux/reducers/admin";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import Cloud from "../Cloud";
import {  BsCheckCircleFill ,BsFillTelephoneFill } from "react-icons/bs";
import { RiArrowGoBackFill } from "react-icons/ri";

const UpdateProduct = () => {
  const [category, setCategory] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const [categName, setCatgName] = useState("");
  //set For Update ,
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
  const [isOpen, setIsOpen] = useState(false);



  const { oneProduct } = useSelector((state) => {
    return {
      oneProduct: state.admin.oneProduct,
    };
  });

  const CategoryInsideUpdate = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/categoryName`)
      .then((result) => {
        setCategory(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getOneProduct = () => {
    axios
      .get(`https://infintyzone.herokuapp.com/product/${id}`)
      .then((result) => {
        console.log(result, "******one product");
        dispatch(setOneProduct(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOneProduct();
    CategoryInsideUpdate();
  }, []);

  const updateProduct = (productId) => {
    let newImg = url || productImage;
    axios
      .put(`https://infintyzone.herokuapp.com/admin/update_product/${productId}`, {
        title,
        description,
        productImage: newImg,
        price,
        quantity,
        category_id,
        brand_id,
      })
      .then((result) => {
        console.log(result);
        setMessage("UPDATED");
        dispatch(
          updateOneProduct({
            id: productId,
            title,
            description,
            productImage: newImg,
            price,
            quantity,
            categoryName: categName,
            category_id,
            brand_id,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Center-ContainerUpdateProduct">
      <div className="updateHeader">Update product </div>
      {oneProduct &&
        oneProduct.map((element, i) => {
          return (
            <>
              <div className="UpdateProductContainer">
                <div className="photoContainer-Up">
                  <img className="IMAGE" src={element.productImage} />
                  <div className="cloudSpace">
                {" "}<p>*Upload Image </p>
                <Cloud
                  setProductImage={setProductImage}
                  url={url}
                  setUrl={setUrl}
                />
              </div>
                </div>

                <div className="INFO">
                  <div className="flexDiv">
                    <p>Product Title: </p>
                    <input className="inputOfUpdateProduct"
                      defaultValue={element.title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p >Product Description:</p>
                    <input  className="inputOfUpdateProduct"
                      defaultValue={element.description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p>Price:</p>
                    <input className="inputOfUpdateProduct"
                      type="number"
                      defaultValue={element.price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </div>
                  <div className="flexDiv">
                    <p>In Stock:</p>
                    <input  className="inputOfUpdateProduct"
                      type="number"
                      defaultValue={element.quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
           
    
              <div className="Test">
                <button  className="updateBTNAdmin"
                  onClick={() => {
                    updateProduct(oneProduct[0].id);
                    setIsOpen(true);
              setTimeout(() => {
                setIsOpen(false);
              }, 3000);
                  }}
                >
                  UPDATE
                </button>

              </div>
            
            </>
          );
        })}
         <Modal
  ariaHideApp={false}
  className={"popUpUpdate"}
  isOpen={isOpen}
  onRequestClose={() => setIsOpen(false)}
>
  <div className="popUpContainerUpdate">
    <div className="paragrapghUpdated">
<p ><b>Product has been Updated</b> </p>

</div>
<span className="imgGreen"> <BsCheckCircleFill/> </span>
</div>
</Modal>
    </div>
  );
};

export default UpdateProduct;
