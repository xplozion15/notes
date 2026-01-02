const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");

commentRouter.post("/", commentController.addCommentToPost);
commentRouter.delete("/:commentId",commentController.deleteComment);
commentRouter.update("/:commentId",commentController.updateComment);


module.exports = { commentRouter };
