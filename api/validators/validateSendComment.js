const { body } = require("express-validator");

const validateSendComment = [
  body("comment")
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Comment cannot exceed 500 characters"),

  body("postId").isInt().withMessage("PostId is not valid"),
];

module.exports = { validateSendComment };
