const express = require("express");

const {
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//  Add expense - POST /api/v1/expense/add
router.post("/add",protect, addExpense);

//  Get all expenses - GET /api/v1/expense/get
router.get("/get", protect, getAllExpense);

//  Delete expense - DELETE /api/v1/expense/:id
router.delete("/:id", protect, deleteExpense);

//  Download expense as Excel - GET /api/v1/expense/downloadExcel
router.get("/downloadExcel", protect, downloadExpenseExcel);

module.exports = router;
