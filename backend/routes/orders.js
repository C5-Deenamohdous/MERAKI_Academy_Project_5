const express = require("express");

const ordersRouter = express.Router();

const { addToOrders } = require("../controllers/orders");
//
const authentication = require("../middlewares/authentication");

ordersRouter.post("/", authentication, addToOrders);

module.exports = ordersRouter;
