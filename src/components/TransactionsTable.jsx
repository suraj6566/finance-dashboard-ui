import { formatCurrency } from "../utils/formatters";

export default function TransactionsTable({
  transactions,
  canManage,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
          <thead className="bg-slate-50/80 dark:bg-slate-950/80">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-slate-300">
                Transaction
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-slate-300">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-slate-300">
                Type
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-slate-300">
                Amount
              </th>
              {canManage ? (
                <th className="px-4 py-3 text-right font-semibold text-gray-600 dark:text-slate-300">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white/60 dark:divide-slate-800 dark:bg-slate-900/40">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 text-xs font-semibold text-indigo-700 dark:from-slate-800 dark:to-slate-700 dark:text-cyan-200">
                      {transaction.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.category}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">
                        {transaction.type === "income" ? "Cash in" : "Cash out"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-gray-600 dark:text-slate-300">
                  {transaction.date}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      transaction.type === "income"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </td>
                <td
                  className={`px-4 py-4 text-right font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600 dark:text-emerald-300"
                      : "text-rose-600 dark:text-rose-300"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </td>
                {canManage ? (
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(transaction)}
                        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-gray-700 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:text-slate-200"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(transaction.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 transition-all duration-200 hover:shadow-lg dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
