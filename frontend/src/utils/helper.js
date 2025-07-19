// src/utils/helper.js
import moment from "moment";
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // checks whether email is valid or not
  return regex.test(email);
};
// Get initials from name
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];  // returns initials and runs upto max two words
  }

  return initials.toUpperCase();
};


export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString('default', { month: 'short' }); // e.g., "Jul"
    
    return {
      month, // required for X-axis
      category: item?.category,
      amount: item?.amount,
    };
  });

  return chartData;
};



export const prepareIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));  // sort income datewise

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('DD MM'),   // converting income data into apt bar chart 
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format('DD MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};




