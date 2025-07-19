import React from "react";
import { LuTrash2, LuTrendingUp, LuTrendingDown, LuUtensils } from "react-icons/lu";
import moment from "moment";

const TransactionInfoCard = ({
  title,
  date,
  amount,
  type,
  icon,
  onDelete,
  hideDeleteBtn,
}) => {
  const getAmountStyles = () => {
    return type === "income"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  return (
    <div
      className="flex items-center justify-between w-full mb-3 p-3 rounded-lg group cursor-pointer hover:bg-yellow-100 transition"
      onClick={() => console.log("Transaction clicked")}
    >
      <div className="flex items-center gap-3">
        <div className="bg-gray-100 p-2 rounded-full text-xl w-10 h-10 flex items-center justify-center">
          {icon ? (
            <img
              src={icon}
              alt="icon"
              className="w-7 h-7 object-contain"
            />
          ) : (
            <LuUtensils />
          )}
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p className="text-xs text-gray-400 mt-1">{date}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!hideDeleteBtn && (
          <button
            className="text-gray-400 group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
            onClick={onDelete}
          >
            <LuTrash2 size={18} />
          </button>
        )}

        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()} hover:brightness-90 hover:scale-105 transition duration-200`}
        >
          <h6 className="text-xs font-medium">
            {type === "income" ? "+" : "-"} ₹{amount}
          </h6>
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
