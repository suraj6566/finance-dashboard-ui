import SectionCard from "./SectionCard";
import { budgetData } from "../data/mockData";
import { formatCurrency } from "../utils/formatters";

export default function BudgetTracker() {
  return (
    <SectionCard eyebrow="Budgets" title="Budget guardrails">
      <div className="grid gap-4">
        {budgetData.map((item) => {
          const statusColor =
            item.percent > 100
              ? "from-rose-500 to-orange-500"
              : item.percent > 75
                ? "from-amber-400 to-orange-500"
                : "from-emerald-400 to-emerald-500";

          return (
            <div
              key={item.category}
              className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.category}</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    {formatCurrency(item.spent)} of {formatCurrency(item.budget)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-slate-200">{item.percent}%</p>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className={`h-full rounded-full bg-gradient-to-r ${statusColor}`} style={{ width: `${Math.min(item.percent, 100)}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
