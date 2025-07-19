// ✅ dashboardRoutes.js
const express = require("express");
const router = express.Router();
const { getDashboardData } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");


// GET dashboard data (requires auth)
router.get("/", protect, getDashboardData);

module.exports = router;
