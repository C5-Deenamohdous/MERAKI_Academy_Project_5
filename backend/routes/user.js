/* Importing the express module. */
const express = require("express");

const UserRouter = express.Router();

/* Importing the functions from the user.js file. */
const {
  getUserById,
  getAllusers,
  deleteUserById,
  updateUserById,
} = require("../controllers/user");

UserRouter.get("/:id", getUserById);
UserRouter.get("/users", getAllusers);
UserRouter.delete("/:id", deleteUserById); 
UserRouter.put("/:id", updateUserById); 


module.exports = UserRouter;
