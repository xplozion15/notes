const express = require("express");
const statsRouter = express.Router();
const statsController = require("../controllers/stats.controller");
const { authenticateToken } = require("../controllers/auth.controller");

statsRouter.get("/", authenticateToken, statsController.fetchStats);

module.exports = { statsRouter };
