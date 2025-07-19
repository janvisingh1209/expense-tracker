const xlsx= require("xlsx")
const Income= require("../models/income")

exports.addIncome = async (req, res) => {
    const userId = req.user.id;         // ✅ Extract userId from auth middleware
    
    
    try {
        const { icon, source, amount, date } = req.body;
        
        // Validation: Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // function to add new income with 
        const newIncome = new Income({
            userId,  // given by backend
            icon,
            source,
            amount,
            date: new Date(date)
        });
        
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;
    
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });   // gets income and sort by date
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }


}



exports.deleteIncome = async (req, res) => {
    
    const userId = req.user.id;
    const { id } = req.params;


       try {
        const income = await Income.findOneAndDelete({ _id: id, userId });
          res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
// Download Excel
exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;

    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        // Prepare data for Excel
        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();  //creates excel workbook
        const ws = xlsx.utils.json_to_sheet(data);  //Converts the data array to a worksheet, the data is initially json then keys converted to cols
        xlsx.utils.book_append_sheet(wb, ws, "Income"); //Adds the worksheet (ws) to the workbook (wb) with the tab name "Income".
        xlsx.writeFile(wb, "income_details.xlsx"); // adds workbook to root directory
        res.download("income_details.xlsx");  // makes it downloadable 
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
