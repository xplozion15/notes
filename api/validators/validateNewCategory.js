const { body } = require("express-validator");

const validateNewCategory = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title should not be empty")
    .isLength({ max: 14 })
    .withMessage("Title length should be less than 14 characters"),
];

module.exports = { validateNewCategory };
