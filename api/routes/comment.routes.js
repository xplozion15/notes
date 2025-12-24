const express = require("express");
const commentRouter = express.Router();
const commentController = require("../controllers/comment.controller");


commentRouter.post("/", commentController.addCommentToPost);

module.exports = {commentRouter};