const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");
const { authenticateToken } = require("../controllers/auth.controller");

categoryRouter.get("/",categoryController.fetchCategories);

categoryRouter.get(
  "/:categoryId/posts",
  categoryController.fetchPostsByCategory,
);
categoryRouter.post(
  "/",
  authenticateToken,
  categoryController.createNewCategory,
);

module.exports = { categoryRouter };
