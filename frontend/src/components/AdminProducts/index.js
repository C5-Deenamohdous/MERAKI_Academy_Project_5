import "./style.css";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setProduct, deleteProduct } from "../../redux/reducers/admin";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
const AdminProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Product } = useSelector((state) => {
    return {
      Product: state.admin.Product,
    };
  });

  const getAllProducts = async () => {
    axios

      .get(`https://infintyzone.herokuapp.com/product/?page=1&limit=12`)

      .then((result) => {
        console.log(`INSIDE REQUEST`);
        let temp = result.data.result;
        dispatch(setProduct(temp.reverse()));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const productDelete = (productId) => {
    axios
      .delete(`https://infintyzone.herokuapp.com/admin/delete_product/${productId}`)
      .then((result) => {
        dispatch(deleteProduct(productId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  console.log(Product, "PPP");

  return (
    <div className="Center-Container-productAdmin">
      <div className="productsBarHeader">
        <p>
          <MdProductionQuantityLimits /> Products
        </p>
      </div>
      {/* <div className="ProductsInControlPanel"> */}
      <table className="productTables">
        <tr>
          {/* <div className="details-Product-row"> */}
          <th className="table2">#</th>
          <th className="table2">ProductName</th>
          <th className="table2">Category</th>
          <th className="table2">Brand</th>
          <th></th>
        </tr>
        {/* </div> */}
        {Product &&
          Product.map((element, i) => {
            return (
              <>
                {/* <div className="details-Product-row"> */}
                {/* <div className="details-Oneproduct"> */}
                <tr>
                  <td className="table2">{i + 1}</td>
                  <td className="table2">{element.title}</td>
                  <td className="table2">{element.categoryName}</td>
                  <td className="table2">{element.brandName}</td>
                  <td>
                    <div className="Btns-A">
                      <p
                        className="BtnDeleteIcon"
                        onClick={() => {
                          productDelete(element.id);
                        }}
                      >
                        <RiDeleteBin6Line />
                      </p>
                      <p
                        className="BtnDUpdateIcon"
                        onClick={() => {
                          navigate(`/admin/product/${element.id}`);
                        }}
                      >
                        <BiEdit />
                      </p>
                    </div>
                  </td>
                  {/* </div> */}
                </tr>
                {/* </div> */}
              </>
            );
          })}
      </table>
      {/* </div> */}
    </div>
  );
};

export default AdminProducts;
