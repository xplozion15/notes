const { body } = require("express-validator");

const validateNewPost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Post title cannot be empty")
    .isLength({ min: 5, max: 90 })
    .withMessage("Post title length must be between 5 to 90 characters"),

  body("categoryId").isInt().withMessage("Select a valid category"),

  body("postBody").notEmpty().withMessage("Post body cannot be empty"),
];

module.exports = { validateNewPost };
