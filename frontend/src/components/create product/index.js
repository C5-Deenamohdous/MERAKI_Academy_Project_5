import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setProduct } from "../../redux/reducers/admin";
import { useNavigate, useParams } from "react-router-dom";
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
        axios
            .post(`http://localhost:5000/admin/add_product`,

                {
                    title,
                    description,
                    productImage,
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
                        productImage,
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
        <>
            <div className="center">
                <>
                    <h1>add_product
                        <br />add_product here </h1>
                    <center >
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
                        <button onClick={() => {
                            add_product();
                        }}>add_product</button>
                    </center>
                </>
            </div>
            
            <button onClick={() => {
                setIsClicked(true);
            }}> choose category to add Brand</button>
            {isClicked ?
                category &&
                category.map((element, i) => {
                    return (
                        <p onClick={() => {
                            setCategory_id(element.id)
                            console.log(category_id);
                            setIsClicked(false)
                        }}>
                            category name : {element.categoryName}
                        </p>
                    )
                })
                : ""}
                
                <button onClick={() => {
                setIsClicked(true);
            }}> choose Brand to add product</button>
            {isClicked ?
                Brand &&
                Brand.map((element, i) => {
                    return (
                        <button onClick={() => {
                            setBrand_id(element.id)
                            console.log(brand_id);
                            setIsClicked(false)
                        }}>
                            {/* <sas>sasaas</sas> */}
                            Brand name : {element.brandName}
                            
                        </button>
                    )
                })
                : ""}

        </>
    );
};
export default CreateProduct;
