const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");

categoryRouter.get("/:categoryId/posts",categoryController.fetchPostsByCategory);


module.exports = {categoryRouter};