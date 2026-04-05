import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  deleteTransaction,
  loadMoreTransactions,
  setFilters,
  updateTransaction,
} from "../redux/financeSlice";
import SectionCard from "../components/SectionCard";
import StatCard from "../components/StatCard";
import TransactionFilters from "../components/TransactionFilters";
import TransactionFormModal from "../components/TransactionFormModal";
import TransactionsTable from "../components/TransactionsTable";
import Charts from "../components/Charts";
import Insights from "../components/Insights";
import PortfolioCard from "../components/PortfolioCard";
import SpendingAnalysis from "../components/SpendingAnalysis";
import BudgetTracker from "../components/BudgetTracker";
import { formatLongDate } from "../utils/formatters";
import {
  getFilteredTransactions,
  getFinanceSummary,
  getRecentTransactions,
  getTopCategory,
} from "../utils/finance";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { transactions, filters, visibleCount, role } = useSelector((state) => state.finance);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const summary = useMemo(() => getFinanceSummary(transactions), [transactions]);
  const filteredTransactions = useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters],
  );
  const recentTransactions = useMemo(
    () => getRecentTransactions(filteredTransactions, visibleCount),
    [filteredTransactions, visibleCount],
  );
  const topCategory = useMemo(() => getTopCategory(transactions), [transactions]);
  const categories = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.category))].sort(),
    [transactions],
  );

  const openCreateModal = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSubmit = (transaction) => {
    if (editingTransaction) {
      dispatch(updateTransaction(transaction));
    } else {
      dispatch(addTransaction(transaction));
    }

    setEditingTransaction(null);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-white/60 bg-white/88 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:shadow-xl dark:border-slate-700/80 dark:bg-[#1f2b43] sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500 dark:text-violet-300">
              Easy overview
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Financial Dashboard
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Track your daily life spending and manage your money easily.
            </p>
          </div>
          <div className="w-full rounded-[1.75rem] border border-cyan-200 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 px-5 py-4 text-white shadow-lg dark:border-slate-700 dark:shadow-[0_18px_45px_rgba(17,24,39,0.45)] sm:max-w-[320px] xl:w-auto">
            <p className="text-sm font-medium text-white/85">Hello, {user?.name ?? "Suraj"}</p>
            <p className="text-sm text-white/70">Today</p>
            <p className="mt-1 text-lg font-semibold break-words sm:text-xl">
              {formatLongDate(new Date().toISOString())}
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Money left"
          value={summary.balance}
          helper="This is the amount still left after expenses."
          accent="bg-indigo-500"
          colorClass="from-indigo-500 via-blue-500 to-cyan-500"
          softClass="from-blue-50 via-indigo-50 to-cyan-50"
          darkCardClass="dark:from-sky-500 dark:via-blue-500 dark:to-cyan-500"
        />
        <StatCard
          label="Money received"
          value={summary.income}
          helper="Total income added in this dashboard."
          accent="bg-emerald-500"
          colorClass="from-emerald-500 via-green-500 to-lime-400"
          softClass="from-emerald-50 via-green-50 to-lime-50"
          darkCardClass="dark:from-emerald-500 dark:via-green-500 dark:to-teal-400"
        />
        <StatCard
          label="Money spent"
          value={summary.expense}
          helper="Total money that went out."
          accent="bg-rose-500"
          colorClass="from-rose-500 via-orange-500 to-amber-400"
          softClass="from-rose-50 via-orange-50 to-amber-50"
          darkCardClass="dark:from-red-500 dark:via-orange-500 dark:to-orange-400"
        />
        <StatCard
          label="Highest spending area"
          value={topCategory?.value ?? 0}
          helper={topCategory ? `${topCategory.name} had the most spending.` : "No spending category found yet."}
          accent="bg-cyan-500"
          colorClass="from-fuchsia-500 via-violet-500 to-cyan-500"
          softClass="from-fuchsia-50 via-violet-50 to-cyan-50"
          darkCardClass="dark:from-violet-500 dark:via-purple-500 dark:to-cyan-500"
        />
      </div>

      <SectionCard eyebrow="Simple summary" title="What this dashboard tells you">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-indigo-50 to-blue-50 p-4 dark:from-sky-500 dark:via-blue-500 dark:to-cyan-500">
            <p className="text-base font-semibold text-slate-900 dark:text-white">How much you have now</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/90">
              Look at “Money left” to quickly understand your current balance.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-50 to-lime-50 p-4 dark:from-emerald-500 dark:via-green-500 dark:to-lime-500">
            <p className="text-base font-semibold text-slate-900 dark:text-white">Where money came from</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/90">
              Income cards and charts show salary, freelance, or other incoming money.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-50 to-orange-50 p-4 dark:from-red-500 dark:via-orange-500 dark:to-amber-500">
            <p className="text-base font-semibold text-slate-900 dark:text-white">Where money went</p>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-white/90">
              Expense sections help explain which category used the most money.
            </p>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Charts />
        <Insights />
      </div>

      <SectionCard
        eyebrow="Transactions"
        title="Recent money activity"
        actions={
          role === "admin" ? (
            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg"
            >
              Add entry
            </button>
          ) : null
        }
      >
        <div className="space-y-5">
          <TransactionFilters
            filters={filters}
            categories={categories}
            onChange={(payload) => dispatch(setFilters(payload))}
            onReset={() => dispatch(setFilters({ search: "", category: "all", type: "all", date: "" }))}
          />
          <TransactionsTable
            transactions={recentTransactions}
            canManage={role === "admin"}
            onEdit={openEditModal}
            onDelete={(id) => dispatch(deleteTransaction(id))}
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Showing {recentTransactions.length} of {filteredTransactions.length} matching entries.
            </p>
            {recentTransactions.length < filteredTransactions.length ? (
              <button
                type="button"
                onClick={() => dispatch(loadMoreTransactions())}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:text-slate-200"
              >
                Load more
              </button>
            ) : null}
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        <SpendingAnalysis />
        <PortfolioCard />
      </div>

      <BudgetTracker />

      <TransactionFormModal
        isOpen={isModalOpen}
        initialValues={editingTransaction}
        onClose={() => {
          setEditingTransaction(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
