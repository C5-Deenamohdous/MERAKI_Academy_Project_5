/* Importing the express module. */
const express = require("express");

const UserRouter = express.Router();

/* Importing the functions from the admin.js file. */
const {
  getAllusers,
  deleteUserById,
} = require("../controllers/user");
/* AdminRouter is a router that is used to handle all the admin routes. */
adminRouter.get("/users", getAllusers); //!done
/* Deleting a user by id. */
adminRouter.delete("/delete_user/:id", deleteUserById); //!done

module.exports = UserRouter;
