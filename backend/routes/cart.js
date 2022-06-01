const express = require("express");

const cartRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");
const { addToCart, getUserCart } = require("../controllers/cart");

cartRouter.post("/:id", authentication, addToCart);
cartRouter.get("/", authentication, getUserCart);

module.exports = cartRouter;
