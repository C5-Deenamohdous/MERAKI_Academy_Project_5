const express = require("express");

const productRouter = express.Router();

const {
  getOneProductById,
  getAllProduct,
  getProductByCategory,
  getProductByBrand,
  getAllCategory,
  getAllBrands,
  SearshGetAllProduct,
  getBrandByCategory,
  filterGetAllCategories,
} = require("../controllers/product");

productRouter.get("/0000/filter_All_Categ",filterGetAllCategories);
productRouter.get("/search", SearshGetAllProduct);
productRouter.get("/categoryName", getAllCategory);
productRouter.get("/brandName", getAllBrands);
productRouter.get("/:id", getOneProductById);
productRouter.get("/", getAllProduct);
productRouter.get("/category/:id", getProductByCategory);
productRouter.get("/brand/:id", getProductByBrand);
productRouter.get("/brand_for_catg/:id" , getBrandByCategory);

module.exports = productRouter;
