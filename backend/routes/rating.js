const express = require("express");

const ratingRouter = express.Router();
//
const {
  addRatingToProduct,
  getProductRating,
  updateRate,
} = require("../controllers/rating");
const authentication = require("../middlewares/authentication");

ratingRouter.post("/:id", authentication, addRatingToProduct);

ratingRouter.get("/:id", getProductRating);

ratingRouter.put("/:id", authentication, updateRate);

module.exports = ratingRouter;
