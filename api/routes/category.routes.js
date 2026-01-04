const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");

categoryRouter.get(
  "/:categoryId/posts",
  categoryController.fetchPostsByCategory,
);
categoryRouter.post("/", categoryController.createNewCategory);

module.exports = { categoryRouter };
