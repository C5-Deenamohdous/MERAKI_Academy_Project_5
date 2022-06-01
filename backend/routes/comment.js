const express = require("express");
const {
  getAllCommentsById,
  createNewComment,
  updatCommentById,
  deleteComment,
 
} = require("../controllers/comment");

const commentRouter = express.Router();

// controllers And middleware
const authentication = require("../middlewares/authentication");

commentRouter.get("/:id", getAllCommentsById);
commentRouter.post("/:id", authentication, createNewComment);
commentRouter.put("/:id", authentication, updatCommentById);
commentRouter.delete("/:id",authentication, deleteComment);
module.exports = commentRouter;
