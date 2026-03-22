const { body } = require("express-validator");

const validateLogin = [
  body("username")
    .trim()
    .isEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3, max: 16 })
    .withMessage("Username must be 3 to 16 characters only"),

  body("password").trim(),
  isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 3, max: 16 })
    .withMessage("Password must be 3 to 16 characters only"),
];

module.exports = { validateLogin };
