import { useSelector } from "react-redux";
import { memo, useMemo } from "react";

const Insights = memo(() => {
  const { transactions } = useSelector((s) => s.finance);

  // Memoize calculations to prevent recalculation on every render
  const insights = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const income = transactions.filter((t) => t.type === "income");

    const totalExpense = expenses.reduce((sum, t) => sum + t.amount, 0);
    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);

    // Category breakdown
    const categorySpending = {};
    expenses.forEach((e) => {
      categorySpending[e.category] = (categorySpending[e.category] || 0) + e.amount;
    });

    const highestCategory = Object.keys(categorySpending).length > 0
      ? Object.keys(categorySpending).reduce((a, b) =>
          categorySpending[a] > categorySpending[b] ? a : b
        )
      : "N/A";

    const highestAmount = categorySpending[highestCategory] || 0;
    const avgDailySpending = expenses.length > 0 ? (totalExpense / transactions.length).toFixed(2) : 0;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100).toFixed(1) : 0;

    return [
      {
        icon: "📊",
        label: "Highest Spending",
        value: highestCategory,
        detail: `₹${highestAmount.toLocaleString()}`,
        gradient: "from-red-400 to-pink-500"
      },
      {
        icon: "📉",
        label: "Avg Daily Spend",
        value: `₹${avgDailySpending}`,
        detail: "Based on all transactions",
        gradient: "from-orange-400 to-red-500"
      },
      {
        icon: "💰",
        label: "Savings Rate",
        value: `${savingsRate}%`,
        detail: "% of income saved",
        gradient: "from-green-400 to-emerald-500"
      },
      {
        icon: "✨",
        label: "Total Transactions",
        value: transactions.length,
        detail: `${expenses.length} expenses, ${income.length} income`,
        gradient: "from-blue-400 to-indigo-500"
      },
    ];
  }, [transactions]);

  // Memoize savings rate for recommendation logic
  const savingsRate = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    return income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0;
  }, [transactions]);

  // Memoize highest category for recommendation
  const highestCategory = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categorySpending = {};
    expenses.forEach((e) => {
      categorySpending[e.category] = (categorySpending[e.category] || 0) + e.amount;
    });
    return Object.keys(categorySpending).length > 0
      ? Object.keys(categorySpending).reduce((a, b) =>
          categorySpending[a] > categorySpending[b] ? a : b
        )
      : "spending";
  }, [transactions]);

  const getRecommendation = () => {
    const rate = parseFloat(savingsRate);
    if (rate >= 30) {
      return `🚀 Excellent! You're saving ${savingsRate}% of your income. Keep up this healthy financial habit!`;
    } else if (rate >= 20) {
      return `📈 Good job! You're saving ${savingsRate}% of your income. Try to push it to 30%+ for better financial health.`;
    } else {
      return `💡 Consider reducing ${highestCategory} spending to increase your savings rate.`;
    }
  };

  return (
    <div className="bg-linear-to-br from-white to-indigo-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">
        💡 Financial Insights
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`bg-linear-to-br ${insight.gradient} text-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-150 animate-fade-in`}
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <span className="text-xl sm:text-2xl">{insight.icon}</span>
            </div>
            <p className="text-xs font-medium opacity-90 mb-1 line-clamp-2">
              {insight.label}
            </p>
            <p className="text-sm sm:text-base font-bold line-clamp-1">
              {insight.value}
            </p>
            <p className="text-xs opacity-80 mt-1 line-clamp-2">
              {insight.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Smart recommendations */}
      <div className="p-3 sm:p-4 md:p-5 bg-linear-to-r from-indigo-100 to-purple-100 rounded-xl border-2 border-indigo-300">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-2xl sm:text-3xl flex-shrink-0">🎯</span>
          <div className="min-w-0">
            <p className="font-bold text-gray-800 mb-1 text-sm sm:text-base">Smart Recommendation</p>
            <p className="text-xs sm:text-sm text-gray-700 line-clamp-4">
              {getRecommendation()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Insights.displayName = 'Insights';

export default Insights;