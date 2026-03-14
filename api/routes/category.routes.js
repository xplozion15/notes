const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");
const { authenticateToken } = require("../controllers/auth.controller");

categoryRouter.get("/", categoryController.fetchCategories);
categoryRouter.delete(
  "/:categoryId",
  authenticateToken,
  categoryController.deleteCategory,
);
categoryRouter.get(
  "/:categoryId/posts",
  categoryController.fetchPostsByCategory,
);
categoryRouter.post(
  "/",
  authenticateToken,
  categoryController.createNewCategory,
);

categoryRouter.patch(
  "/:categoryId",
  authenticateToken,
  categoryController.updateCategory,
);

module.exports = { categoryRouter };
