const Expense = require("../models/expense");
const xlsx = require("xlsx");

// Add Expense
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        // Validation
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date),
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    try {
        const expense = await Expense.findOneAndDelete({ _id: id, userId });
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    
    }
};

// Download Excel of Expenses
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

   try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        const data = expenses.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();                      // Create workbook
        const ws = xlsx.utils.json_to_sheet(data);             // Convert JSON to sheet
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");      // Append sheet
        xlsx.writeFile(wb, "expense_details.xlsx");            // Save file
        res.download("expense_details.xlsx");                  // Send download
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};