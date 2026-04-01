const express = require("express");
const categoryRouter = express.Router();
const categoryController = require("../controllers/category.controller");
const { validateEditCategory } = require("../validators/validateEditCategory");
const { validateNewCategory } = require("../validators/validateNewCategory");
const { authenticateToken } = require("../middlewares/authenticateToken");

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
  validateNewCategory,
  authenticateToken,
  categoryController.createNewCategory,
);

categoryRouter.patch(
  "/:categoryId",
  validateEditCategory,
  authenticateToken,
  categoryController.updateCategory,
);

module.exports = { categoryRouter };
