import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import SectionCard from "./SectionCard";
import { getCategoryBreakdown } from "../utils/finance";
import { formatCurrency } from "../utils/formatters";

export default function SpendingAnalysis() {
  const transactions = useSelector((state) => state.finance.transactions);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  return (
    <SectionCard eyebrow="Spending" title="Category breakdown">
      <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-3">
          {categoryData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-[1.5rem] border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/70"
            >
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-slate-400">{formatCurrency(item.value)}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
