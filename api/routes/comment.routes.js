const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");
const { validateSendComment } = require("../validators/validateSendComment");
const { authenticateToken } = require("../middlewares/authenticateToken");

commentRouter.post(
  "/",
  validateSendComment,
  authenticateToken,

  commentController.addCommentToPost,
);
commentRouter.delete(
  "/:commentId",
  authenticateToken,
  commentController.deleteComment,
);
commentRouter.patch(
  "/:commentId",
  authenticateToken,
  commentController.updateComment,
);

module.exports = { commentRouter };
