const express = require("express");
const authRouter = express.Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");



  authRouter.post("/register",authController.registerUser);

  module.exports = {authRouter};