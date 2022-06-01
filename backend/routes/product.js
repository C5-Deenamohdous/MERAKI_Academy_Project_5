const express = require("express");

const productRouter = express.Router();

const {  getOneProductById} = require("../controllers/product");

productRouter.get("/:id", getOneProductById);

module.exports = productRouter;