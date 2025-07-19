const express = require("express");

const {
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add income - POST /api/v1/income/add
router.post("/add", protect, addIncome);

// Get all income - GET /api/v1/income/get
router.get("/get", protect, getAllIncome);

// Delete income - DELETE /api/v1/income/:id
router.delete("/:id", protect, deleteIncome);

// Download income as Excel - GET /api/v1/income/downloadExcel
router.get("/downloadExcel", protect, downloadIncomeExcel);

module.exports = router;