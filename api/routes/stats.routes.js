const express = require("express");
const statsRouter = express.Router();
const statsController = require("../controllers/stats.controller");
const { authenticateToken } = require("../middlewares/authenticateToken");
statsRouter.get("/", authenticateToken, statsController.fetchStats);

module.exports = { statsRouter };
