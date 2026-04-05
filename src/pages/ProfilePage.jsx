import { useMemo } from "react";
import { useSelector } from "react-redux";
import SectionCard from "../components/SectionCard";
import { getFinanceSummary, getTopCategory } from "../utils/finance";
import { formatCurrency } from "../utils/formatters";

export default function ProfilePage() {
  const user = useSelector((state) => state.auth.user);
  const { role, transactions } = useSelector((state) => state.finance);

  const summary = useMemo(() => getFinanceSummary(transactions), [transactions]);
  const topCategory = useMemo(() => getTopCategory(transactions), [transactions]);

  return (
    <div className="space-y-6">
      <SectionCard eyebrow="Profile" title="User workspace">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-900 p-6 text-white">
            <p className="text-sm text-white/70">Account</p>
            <h2 className="mt-2 text-3xl font-semibold">{user?.name ?? "Suraj"}</h2>
            <p className="mt-2 text-sm text-white/70">{user?.email ?? "demo@financeflow.app"}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/70">Access level</p>
                <p className="mt-2 text-xl font-semibold capitalize">{role}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <p className="text-sm text-white/70">Transactions tracked</p>
                <p className="mt-2 text-xl font-semibold">{transactions.length}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.75rem] border border-white/50 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-sm text-gray-500 dark:text-slate-400">Current balance</p>
              <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(summary.balance)}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/50 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80">
              <p className="text-sm text-gray-500 dark:text-slate-400">Top expense driver</p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                {topCategory?.name ?? "No expense data"}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
                {topCategory ? formatCurrency(topCategory.value) : "Add more data to unlock insights."}
              </p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
