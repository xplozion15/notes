const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const { validateRegister } = require("../validators/validateRegister");
const { validateLogin } = require("../validators/validateLogin");
const { authenticateToken } = require("../middlewares/authenticateToken");

authRouter.post("/register", validateRegister, authController.registerUser);
authRouter.post("/login", validateLogin, authController.login);
authRouter.get("/me", authenticateToken, authController.getMe);

module.exports = { authRouter };
