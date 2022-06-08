const express = require("express");

const ordersRouter = express.Router();

const {
  addToOrders,
  getAllOrders,
  getAllOrdersWithDetails,
  getOneOrderDetail,
  completedOrders,
  unCompletedOrders,
  getAllUnCompletedOrdersByUser,
  getAllCompletedOrdersByUser,
  getAllOrdersByUser,
  changeOrderToCompleted,
  changeOrderToUnCompleted,
} = require("../controllers/orders");
//
const authentication = require("../middlewares/authentication");

ordersRouter.post("/", authentication, addToOrders);
ordersRouter.get("/all_details", getAllOrdersWithDetails);
ordersRouter.get("/all", getAllOrders);
ordersRouter.get("/one_order/:id", getOneOrderDetail);
ordersRouter.get("/all_completed", completedOrders);
ordersRouter.get("/all_uncompleted", unCompletedOrders);
ordersRouter.get("/user/:id", getAllOrdersByUser);
ordersRouter.get("/user_completed/:id", getAllCompletedOrdersByUser);
ordersRouter.get("/user_unCompleted/:id", getAllUnCompletedOrdersByUser);
//change Status
ordersRouter.put("/status_complete/:id", changeOrderToCompleted);
ordersRouter.put("/status_uncomplete/:id", changeOrderToUnCompleted);

module.exports = ordersRouter;
