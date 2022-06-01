const express = require("express");
const { getAllCommentsById,createNewComment } = require("../controllers/comment");

const commentRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");



commentRouter.get("/:id", getAllCommentsById);
commentRouter.post("/:id",authentication,createNewComment );
module.exports = commentRouter;
