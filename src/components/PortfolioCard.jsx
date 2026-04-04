import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { investmentData } from "../data/mockData";
import { memo, useMemo } from "react";

const PortfolioCard = memo(() => {
  const COLORS = ["#6366F1", "#EC4899", "#F59E0B", "#8B5CF6"];

  // Memoize chart data and total investment
  const { chartData, totalInvestment } = useMemo(() => {
    const total = investmentData.reduce((sum, item) => sum + item.value, 0);
    const data = investmentData.map(item => ({
      name: item.name,
      value: item.value
    }));
    return { chartData: data, totalInvestment: total };
  }, []);

  return (
    <div className="bg-linear-to-br from-white to-purple-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-800">
        💼 Investment Portfolio
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-linear-to-r from-indigo-50 to-purple-50 rounded-lg">
            <p className="text-xs sm:text-sm text-gray-600">Total Investment</p>
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 mt-1">
              ₹{(totalInvestment/1000).toFixed(0)}k
            </p>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {investmentData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow duration-150 gap-2">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-sm sm:text-base font-medium text-gray-800 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">₹{(item.value/1000).toFixed(0)}k</p>
                  </div>
                </div>
                <div className={`text-sm sm:text-base font-semibold flex-shrink-0 ${item.return >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {item.return >= 0 ? '+' : ''}{item.return}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

PortfolioCard.displayName = 'PortfolioCard';

export default PortfolioCard;
