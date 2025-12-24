const express = require("express");
const postRouter = express.Router();
const postController =  require("../controllers/post.controller");

postRouter.get("/:postId",postController.fetchPostById);

module.exports = {postRouter};