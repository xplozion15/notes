const { body } = require("express-validator");

const validateRegister = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name should not be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("First name length should be between 3 to 15 characters only"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("First name should not be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("First name length should be between 3 to 15 characters only"),

  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username should not be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username must be 3 to 15 characters only"),

  body("email").isEmail().withMessage("Enter a valid email"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 3, max: 15 })
    .withMessage("Password must be 3 to 15 characters only"),
];

module.exports = { validateRegister };
