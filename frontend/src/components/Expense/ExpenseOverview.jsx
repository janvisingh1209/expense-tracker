import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);  // transactions given to fn prepare a chart 
    setChartData(result);  // data updated in chart form 

    return () => {};
  }, [transactions]);  // renders whenever transaction updates

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div className="">
          <h5 className="text-lg">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your expenses over time and analyze your spending trends.
          </p>
        </div>

        <button className="add-btn" onClick={onAddExpense}>  
          <LuPlus className="text-lg" />
          Add Expense
        </button>
      </div>
      <CustomLineChart data={chartData} />
      <div className="mt-10"></div>
    </div>
  );
};

export default ExpenseOverview;
