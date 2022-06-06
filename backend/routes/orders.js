const express = require("express");

const ordersRouter = express.Router();

const { addToOrders, getAllOrders } = require("../controllers/orders");
//
const authentication = require("../middlewares/authentication");

ordersRouter.post("/", authentication, addToOrders);
ordersRouter.get("/all", getAllOrders);

module.exports = ordersRouter;
