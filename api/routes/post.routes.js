const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");

postRouter.get("/:postId", postController.fetchPostById);


postRouter.post("/",postController.createPost);

module.exports = { postRouter };
