const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.login);
authRouter.get("/me",authController.authenticateToken,authController.getMe);

module.exports = { authRouter };
