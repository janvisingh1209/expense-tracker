import React from "react";
//for pie chart
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CFF", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance (INR)", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}  // all three inc exp bal passed
        label="Total Balance (INR)"
       totalAmount={`${totalBalance.toLocaleString('en-IN')}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
