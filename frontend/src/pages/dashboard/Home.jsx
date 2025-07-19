import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import InfoCard from "../../components/cards/InfoCard";
import { API_PATHS } from "../../utils/api-path";
import axiosInstance from "../../utils/axiosInstance";
import useUserAuth from "../../hooks/useUserAuth"; // to protect route
import { LuHandCoins,LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";


const Home = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useUserAuth(); // ✅ ensures user is authenticated

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      setDashboardData(response.data); // ✅ assuming response.data has totalBalance, totalIncome, etc.
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  console.log("Dashboard Data →", dashboardData);


  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
           <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-orange-500"
          />
           <InfoCard
            icon={< LuHandCoins />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome|| 0)}
            color="bg-red-500"
          />
        
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
       <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onSeeMore={() => navigate("/expense")}  // navigates to expense when onseemore clicked
        /> 
        <FinanceOverview
  totalBalance={dashboardData?.totalBalance || 0}
  totalIncome={dashboardData?.totalIncome || 0}
  totalExpense={dashboardData?.totalExpenses || 0}
/>
  
  <ExpenseTransactions 
        transactions={dashboardData?.last30DaysExpenses?.transactions}
        onSeeMore={() => navigate("/expense")}
      />
     <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
        />  
  <RecentIncomeWithChart
  data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4)||[]}
  totalIncome={dashboardData?.totalIncome||0}
 

/>
<RecentIncome
  transactions={dashboardData?.last60DaysIncome?.transactions || []}
  onSeeMore={() => navigate("/income")}
/>


      </div>
  </div>
    </DashboardLayout>
  );
};

export default Home;
