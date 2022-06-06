const express = require("express");

const WishListRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");
const {
    addToWishList,
    getUserWishList,
    removeProductFromWshList,
} = require("../controllers/wishlist");

WishListRouter.post("/:id", authentication, addToWishList);
WishListRouter.get("/", authentication, getUserWishList);
WishListRouter.delete("/:id", authentication, removeProductFromWshList);
module.exports = WishListRouter;
