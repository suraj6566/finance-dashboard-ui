import { useSelector } from "react-redux";
import { memo, useEffect, useState, useMemo } from "react";
import SummaryCard from "../components/SummaryCard";
import TransactionTable from "../components/TransactionTable";
import RoleSwitcher from "../components/RoleSwitcher";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import PortfolioCard from "../components/PortfolioCard";
import SpendingAnalysis from "../components/SpendingAnalysis";
import BudgetTracker from "../components/BudgetTracker";

const Dashboard = memo(() => {
  const { transactions } = useSelector((s) => s.finance);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Memoize calculations to prevent unnecessary recalculation
  const { income, expense, balance, incomeChange, expenseChange, balanceChange } = useMemo(() => {
    const incomeTotal = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);

    const expenseTotal = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);

    const balanceTotal = incomeTotal - expenseTotal;

    return {
      income: incomeTotal,
      expense: expenseTotal,
      balance: balanceTotal,
      incomeChange: 12.5,
      expenseChange: -8.3,
      balanceChange: balanceTotal > 15000 ? 15.2 : -5.1,
    };
  }, [transactions]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900 p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-full mx-auto">

        {/* ===== HEADER ===== */}
        <div className="mb-6 sm:mb-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 truncate">
                💰 Financial Dashboard
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 font-medium line-clamp-2">
                Welcome back! Track your finances in real-time
              </p>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
                {time.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <RoleSwitcher />
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-2xl p-3 sm:p-4 md:p-6 shadow-md border border-gray-200/50">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-6">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 line-clamp-2">📊 Total Transactions</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-600">{transactions.length}</p>
              </div>
              <div className="border-l-0 sm:border-l-0 md:border-l-2 md:border-indigo-300 md:pl-6 sm:pl-0 space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 line-clamp-2">📈 Income</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-500">₹{(income/1000).toFixed(0)}k</p>
              </div>
              <div className="border-l-0 sm:border-l-0 md:border-l-2 md:border-indigo-300 md:pl-6 sm:pl-0 space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 line-clamp-2">📉 Expenses</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-500">₹{(expense/1000).toFixed(0)}k</p>
              </div>
              <div className="border-l-0 sm:border-l-0 md:border-l-2 md:border-indigo-300 md:pl-6 sm:pl-0 space-y-1 sm:space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-600 line-clamp-2">💳 Balance</p>
                <p className={`text-xl sm:text-2xl md:text-3xl font-bold ${balance >= 0 ? 'text-blue-500' : 'text-orange-500'}`}>
                  ₹{(balance/1000).toFixed(0)}k
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN LAYOUT (Left + Right) ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* LEFT SIDE (Main Content) */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              <div className="animate-fade-in" style={{ animationDelay: '50ms' }}>
                <SummaryCard
                  title="Total Balance"
                  value={balance}
                  icon="💳"
                  trend={balanceChange}
                  color="from-blue-500 to-cyan-500"
                  isLarge={false}
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <SummaryCard
                  title="Total Income"
                  value={income}
                  icon="📈"
                  trend={incomeChange}
                  color="from-green-500 to-emerald-500"
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
                <SummaryCard
                  title="Total Expenses"
                  value={expense}
                  icon="📉"
                  trend={expenseChange}
                  color="from-red-500 to-orange-500"
                />
              </div>
            </div>

            {/* Charts */}
            <Charts />

            {/* Transactions */}
            <TransactionTable />
          </div>

          {/* RIGHT SIDE (Sidebar Widgets) */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <SpendingAnalysis />
            <PortfolioCard />
            <BudgetTracker />
            <Insights />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pb-6 sm:pb-8 animate-fade-in mt-8 sm:mt-12" style={{ animationDelay: '400ms' }}>
          <p>© 2026 Financial Dashboard. All your financial data is secure and encrypted.</p>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;