const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const { authenticateToken } = require("../controllers/auth.controller");

postRouter.get("/", postController.fetchPosts);
postRouter.get("/:postId", postController.fetchPostById);
postRouter.get("/:postId/comments",postController.fetchCommentsByPostId);
postRouter.post("/", authenticateToken, postController.createPost);
postRouter.patch("/:postId", authenticateToken, postController.updatePost);
postRouter.delete("/:postId", authenticateToken, postController.deletePost);



module.exports = { postRouter };
