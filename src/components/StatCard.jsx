import { formatCompactCurrency } from "../utils/formatters";

export default function StatCard({
  label,
  value,
  helper,
  accent,
  colorClass = "from-indigo-500 via-blue-500 to-cyan-500",
  softClass = "from-indigo-50 to-cyan-50",
  darkCardClass = "dark:from-indigo-500 dark:via-blue-500 dark:to-cyan-500",
}) {
  return (
    <div
      className={`rounded-[2rem] border border-white/60 bg-gradient-to-br ${softClass} p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:border-slate-700/80 dark:bg-gradient-to-br ${darkCardClass} dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-slate-600 dark:text-white">{label}</p>
        <span className={`h-3 w-3 rounded-full shadow-sm ${accent}`} />
      </div>
      <p className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        {formatCompactCurrency(value)}
      </p>
      <div className={`mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r ${colorClass}`} />
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-white/90">{helper}</p>
    </div>
  );
}
