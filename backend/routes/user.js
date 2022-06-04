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

UserRouter.get("/:id", getUserById); //!
/* UserRouter is a router that is used to handle all the user routes. */
UserRouter.get("/users", getAllusers); //!done
/* Deleting a user by id. */
UserRouter.delete("/delete_user/:id", deleteUserById); //!done
UserRouter.put("/:id", updateUserById); //!done


module.exports = UserRouter;
