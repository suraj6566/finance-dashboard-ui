import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import SectionCard from "./SectionCard";
import { getCategoryBreakdown, getMonthlyTrends } from "../utils/finance";
import { formatCurrency } from "../utils/formatters";

export default function Charts() {
  const transactions = useSelector((state) => state.finance.transactions);

  const monthlyData = useMemo(() => getMonthlyTrends(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);

  return (
    <SectionCard eyebrow="Charts" title="Money flow in simple charts">
      <p className="mb-5 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
        These charts help anyone understand the story quickly: how balance changed over time, how much came in versus went out, and which category used the most money.
      </p>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="#4f46e5"
                fillOpacity={1}
                fill="url(#incomeGradient)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.18)" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" fill="#10b981" radius={[10, 10, 0, 0]} />
              <Bar dataKey="expense" fill="#f43f5e" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="xl:col-span-2 h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={3}
              >
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SectionCard>
  );
}
