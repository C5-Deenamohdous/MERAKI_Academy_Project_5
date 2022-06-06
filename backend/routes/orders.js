const express = require("express");

const ordersRouter = express.Router();

const {
  addToOrders,
  getAllOrders,
  getAllOrdersWithDetails,
  getOneOrderDetail,
} = require("../controllers/orders");
//
const authentication = require("../middlewares/authentication");

ordersRouter.post("/", authentication, addToOrders);
ordersRouter.get("/all", getAllOrders);
ordersRouter.get("/all_details", getAllOrdersWithDetails);
ordersRouter.get("/one_order/:id", getOneOrderDetail);

module.exports = ordersRouter;
