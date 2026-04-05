import { useMemo } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import SectionCard from "./SectionCard";
import { investmentData } from "../data/mockData";
import { formatCurrency } from "../utils/formatters";

export default function PortfolioCard() {
  const total = useMemo(
    () => investmentData.reduce((sum, item) => sum + item.value, 0),
    [],
  );
  const bestPerformer = useMemo(
    () => [...investmentData].sort((a, b) => b.return - a.return)[0],
    [],
  );

  return (
    <SectionCard eyebrow="Portfolio" title="Allocation snapshot">
      <div className="grid items-start gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={investmentData} dataKey="value" innerRadius={60} outerRadius={100}>
                {investmentData.map((item, index) => (
                  <Cell
                    key={item.name}
                    fill={["#4f46e5", "#06b6d4", "#10b981", "#f97316"][index % 4]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          <div className="rounded-[1.5rem] bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 p-4 text-white">
            <p className="text-sm text-white/70">Total holdings</p>
            <p className="mt-2 text-3xl font-semibold">{formatCurrency(total)}</p>
          </div>
          {investmentData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-slate-400">{formatCurrency(item.value)}</p>
              </div>
              <span className={`text-sm font-semibold ${item.return >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                {item.return > 0 ? "+" : ""}
                {item.return}%
              </span>
            </div>
          ))}

          <div className="rounded-[1.5rem] border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Quick note</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              Best performer: {bestPerformer.name}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {bestPerformer.return > 0 ? `Up ${bestPerformer.return}% right now.` : `Down ${Math.abs(bestPerformer.return)}% right now.`}
            </p>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
