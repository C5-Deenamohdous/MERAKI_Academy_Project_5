const express = require("express");

const ratingRouter = express.Router();
//
const { addRatingToProduct } = require("../controllers/rating");
const authentication = require("../middlewares/authentication");

ratingRouter.post("/:id", authentication, addRatingToProduct);

module.exports = ratingRouter;
