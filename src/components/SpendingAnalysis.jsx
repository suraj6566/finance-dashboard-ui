import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { categoryData } from "../data/mockData";
import { memo, useMemo } from "react";

const SpendingAnalysis = memo(() => {
  // Memoize total spending calculation
  const totalSpent = useMemo(() => {
    return categoryData.reduce((sum, item) => sum + item.spent, 0);
  }, []);

  return (
    <div className="bg-linear-to-br from-white to-orange-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800">
        📊 Spending by Category
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} isAnimationActive={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: '12px'
                }}
                formatter={(value) => `₹${value.toLocaleString()}`}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar
                dataKey="spent"
                fill="#6366F1"
                radius={[8, 8, 0, 0]}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="p-3 sm:p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Total Spent</p>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-1">
              ₹{(totalSpent/1000).toFixed(0)}k
            </p>
          </div>

          <div className="space-y-2">
            {categoryData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-150 animate-fade-in gap-2"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div
                    className="w-2 sm:w-3 h-2 sm:h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                    {item.name}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 flex-shrink-0">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

SpendingAnalysis.displayName = "SpendingAnalysis";

export default SpendingAnalysis;
