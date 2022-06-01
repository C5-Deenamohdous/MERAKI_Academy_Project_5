const express = require("express");

const productRouter = express.Router();

const {  getOneProductById,getAllProduct, getProductByCategory} = require("../controllers/product");

productRouter.get("/:id", getOneProductById);
productRouter.get("/",getAllProduct);
productRouter.get("/category/:id",getProductByCategory)
module.exports = productRouter;