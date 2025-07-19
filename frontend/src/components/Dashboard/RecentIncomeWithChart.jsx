import React, { useEffect, useState } from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => {
      console.log("Transaction item:", item);  // Log each item to check fields

      return {
        name: item?.category || item?.source || item?.title || "Unknown", // fallback if keys vary
        amount: item?.amount || 0,
      };
    });

    setChartData(dataArr);
    console.log("Income Chart Data:", dataArr);
  };

  useEffect(() => {
    prepareChartData();
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`${totalIncome.toLocaleString('en-IN')}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
