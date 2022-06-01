const express = require("express");

const productRouter = express.Router();

const {  getOneProductById,getAllProduct} = require("../controllers/product");

productRouter.get("/:id", getOneProductById);
productRouter.get("/",getAllProduct)
module.exports = productRouter;