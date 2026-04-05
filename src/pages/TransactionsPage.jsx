import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SectionCard from "../components/SectionCard";
import TransactionFilters from "../components/TransactionFilters";
import TransactionsTable from "../components/TransactionsTable";
import TransactionFormModal from "../components/TransactionFormModal";
import {
  addTransaction,
  deleteTransaction,
  loadMoreTransactions,
  resetFilters,
  setFilters,
  updateTransaction,
} from "../redux/financeSlice";
import { getFilteredTransactions } from "../utils/finance";
import { formatCurrency } from "../utils/formatters";

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const { transactions, filters, visibleCount, role } = useSelector((state) => state.finance);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(transactions.map((transaction) => transaction.category))].sort(),
    [transactions],
  );
  const filteredTransactions = useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters],
  );
  const visibleTransactions = filteredTransactions.slice(0, visibleCount);

  const totalVisible = visibleTransactions.reduce(
    (sum, transaction) =>
      transaction.type === "income" ? sum + transaction.amount : sum - transaction.amount,
    0,
  );

  const handleSave = (transaction) => {
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
      <SectionCard
        eyebrow="Operations"
        title="Transactions management"
        actions={
          role === "admin" ? (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg"
            >
              Add transaction
            </button>
          ) : null
        }
      >
        <div className="space-y-5">
          <p className="max-w-3xl text-sm leading-6 text-gray-600 dark:text-slate-300">
            Review every record, filter by category, type, or date, and manage the transaction ledger with a smoother CRUD workflow.
          </p>

          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <TransactionFilters
              filters={filters}
              categories={categories}
              onChange={(payload) => dispatch(setFilters(payload))}
              onReset={() => dispatch(resetFilters())}
            />
            <div className="rounded-3xl border border-dashed border-slate-300 p-4 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-300">
              Filtered cashflow: <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(totalVisible)}</span>
            </div>
          </div>

          <TransactionsTable
            transactions={visibleTransactions}
            canManage={role === "admin"}
            onEdit={(transaction) => {
              setEditingTransaction(transaction);
              setIsModalOpen(true);
            }}
            onDelete={(id) => dispatch(deleteTransaction(id))}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Showing {visibleTransactions.length} of {filteredTransactions.length} results.
            </p>
            {visibleTransactions.length < filteredTransactions.length ? (
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

      <TransactionFormModal
        isOpen={isModalOpen}
        initialValues={editingTransaction}
        onClose={() => {
          setEditingTransaction(null);
          setIsModalOpen(false);
        }}
        onSubmit={handleSave}
      />
    </div>
  );
}
