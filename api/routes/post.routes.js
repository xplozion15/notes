const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const { authenticateToken } = require("../controllers/auth.controller");
const { validateEditPost } = require("../validators/validateEditPost");
const { validateNewPost } = require("../validators/validateNewPost");

postRouter.get("/", postController.fetchPosts);
postRouter.get("/search", postController.fetchSearchedPosts);
postRouter.get("/:postId", postController.fetchPostById);
postRouter.get("/:postId/comments", postController.fetchCommentsByPostId);
postRouter.post(
  "/",
  validateNewPost,
  authenticateToken,
  postController.createPost,
);
postRouter.patch(
  "/:postId",
  validateEditPost,
  authenticateToken,
  postController.updatePost,
);
postRouter.delete("/:postId", authenticateToken, postController.deletePost);

module.exports = { postRouter };
