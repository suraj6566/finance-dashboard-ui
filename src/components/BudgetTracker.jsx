import { budgetData } from "../data/mockData";
import { memo } from "react";

const BudgetTracker = memo(() => {
  return (
    <div className="bg-linear-to-br from-white to-green-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in w-full min-w-0">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">
        📋 Budget Overview
      </h3>

      <div className="space-y-5 w-full min-w-0">
        {budgetData.map((item, idx) => (
          <div
            key={idx}
            className="space-y-3 animate-fade-in w-full min-w-0"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 min-w-0 w-full">
              <span className="font-bold text-gray-900 truncate min-w-0 max-w-full wrap-break-word">{item.category}</span>
              <span className="text-sm font-semibold text-gray-600 min-w-0 max-w-full wrap-break-word">
                ₹{item.spent.toLocaleString()} / ₹{item.budget.toLocaleString()}
              </span>
            </div>

            <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden shadow-sm">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  item.percent > 100
                    ? 'bg-linear-to-r from-red-400 to-red-600'
                    : item.percent > 75
                    ? 'bg-linear-to-r from-yellow-400 to-orange-500'
                    : 'bg-linear-to-r from-green-400 to-green-600'
                }`}
                style={{ width: `${Math.min(item.percent, 100)}%` }}
              />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 text-xs text-gray-500 w-full">
              <span className="min-w-0 max-w-full wrap-break-word">
                {item.percent > 100 ? '⚠️ Over Budget' : '✅ On Track'} • {item.percent}%
              </span>
              <span className={`min-w-0 max-w-full wrap-break-word font-bold ${
                item.percent > 100 ? 'text-red-500' : 'text-green-500'
              }`}>
                {item.percent > 100 
                  ? `₹${(item.spent - item.budget).toLocaleString()} over`
                  : `₹${(item.budget - item.spent).toLocaleString()} left`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

BudgetTracker.displayName = 'BudgetTracker';

export default BudgetTracker;
