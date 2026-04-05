import { useMemo } from "react";
import { useSelector } from "react-redux";
import SectionCard from "./SectionCard";
import { getFinanceSummary, getTopCategory } from "../utils/finance";
import { formatCurrency } from "../utils/formatters";

export default function Insights() {
  const transactions = useSelector((state) => state.finance.transactions);

  const summary = useMemo(() => getFinanceSummary(transactions), [transactions]);
  const topCategory = useMemo(() => getTopCategory(transactions), [transactions]);
  const savingsRate = summary.income
    ? Math.round(((summary.income - summary.expense) / summary.income) * 100)
    : 0;

  const insightCards = [
    {
      label: "Saving score",
      value: `${savingsRate}%`,
      helper: "Higher means you are keeping more of your income.",
    },
    {
      label: "Most spending happened in",
      value: topCategory?.name ?? "No category yet",
      helper: topCategory ? `${formatCurrency(topCategory.value)} spent here.` : "No expense category yet.",
    },
    {
      label: "Total entries",
      value: `${transactions.length}`,
      helper: "Every income and expense record is saved locally.",
    },
  ];
  const balanceStatus =
    summary.balance >= 0 ? "You are spending within your income." : "Your spending is higher than your income.";

  return (
    <SectionCard eyebrow="Insights" title="Simple takeaways">
      <div className="grid gap-4">
        {insightCards.map((card, index) => (
          <div
            key={card.label}
            className={`rounded-[1.5rem] border border-slate-200 p-4 transition-all duration-200 hover:shadow-lg dark:border-slate-700/70 ${
              index === 0
                ? "bg-gradient-to-br from-violet-50 to-blue-50 dark:from-sky-500 dark:via-blue-500 dark:to-cyan-500"
                : index === 1
                  ? "bg-gradient-to-br from-rose-50 to-orange-50 dark:from-red-500 dark:via-orange-500 dark:to-amber-500"
                  : "bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-violet-500 dark:via-purple-500 dark:to-cyan-500"
            }`}
          >
            <p className="text-sm font-medium text-slate-500 dark:text-white/85">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{card.value}</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-white/90">{card.helper}</p>
          </div>
        ))}

        <div className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-5 dark:border-slate-700/70 dark:bg-[#18233a]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-cyan-300">
            Quick overview
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">
            Your money story at a glance
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">Income vs spending</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {formatCurrency(summary.income)} in and {formatCurrency(summary.expense)} out
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p className="text-sm text-slate-500 dark:text-slate-400">Current status</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                {balanceStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
