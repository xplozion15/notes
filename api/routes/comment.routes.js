const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");
const { authenticateToken } = require("../controllers/auth.controller");
const { validateSendComment } = require("../validators/validateSendComment");

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
