import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { balanceHistory } from "../data/mockData";
import { memo } from "react";

const Charts = memo(() => {
  const latestBalance = balanceHistory[balanceHistory.length - 1]?.balance || 0;
  const previousBalance = balanceHistory[0]?.balance || 0;
  const changePercent = ((latestBalance - previousBalance) / previousBalance * 100).toFixed(2);

  return (
    <div className="bg-linear-to-br from-white to-blue-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            📈 Balance Trend
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Last 16 days performance
          </p>
        </div>
        <div className={`text-right flex-shrink-0 ${changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          <p className="text-lg sm:text-2xl font-bold">{changePercent >= 0 ? '+' : ''}{changePercent}%</p>
          <p className="text-xs text-gray-500">vs previous</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <AreaChart 
          data={balanceHistory} 
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          isAnimationActive={false}
        >
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9ca3af"
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#fff",
            }}
            formatter={(value) => [`₹${value.toLocaleString()}`, "Balance"]}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366F1"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBalance)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

Charts.displayName = 'Charts';

export default Charts;