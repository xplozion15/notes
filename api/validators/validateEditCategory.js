const { body } = require("express-validator");

const validateEditCategory = [
  body("categoryId").isInt().withMessage("Category id should be a number"),
  body("categoryTitle")
    .trim()
    .notEmpty()
    .withMessage("Category title should not be empty")
    .isLength({ min: 1, max: 15 })
    .withMessage("Category title length should be 1 to 15 characters"),
];

module.exports = { validateEditCategory };
