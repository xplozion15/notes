const { body } = require("express-validator");

const validateLogin = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 to 15 characters only"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 3, max: 15})
    .withMessage("Password must be 3 to 15 characters only"),
];

module.exports = { validateLogin };
