const express = require("express");

const productRouter = express.Router();

const {  getOneProductById,getAllProduct, getProductByCategory,getProductByBrand} = require("../controllers/product");

productRouter.get("/:id", getOneProductById);
productRouter.get("/",getAllProduct);
productRouter.get("/category/:id",getProductByCategory)
productRouter.get("/brand/:id",getProductByBrand)

module.exports = productRouter;