const express = require("express");

const cartRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");
const { addToCart } = require("../controllers/cart");

cartRouter.post("/:id", authentication, addToCart);

module.exports = cartRouter;
