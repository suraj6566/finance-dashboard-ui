import { useDispatch, useSelector } from "react-redux";
import { memo, useMemo, useCallback, useEffect, useState } from "react";
import {
  setSearch,
  setFilter,
  deleteTransaction,
  addTransaction,
  setTransactions,
} from "../redux/financeSlice";
import { transactionsData } from "../data/mockData";

const TransactionTable = memo(() => {
  const dispatch = useDispatch();
  const { transactions, search, filter, role } = useSelector((s) => s.finance);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch transactions on component mount
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call - Replace with actual API endpoint
        // const response = await fetch('YOUR_API_URL/transactions');
        // const data = await response.json();
        
        // For now, using mock data
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        dispatch(setTransactions(transactionsData));
      } catch (err) {
        setError('Failed to fetch transactions');
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [dispatch]);

  // Memoize filtered transactions
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch = search
        ? t.category?.toLowerCase().includes(search.toLowerCase())
        : true;

      const matchFilter =
        filter === "all" ? true : t.type === filter;

      return matchSearch && matchFilter;
    });
  }, [transactions, search, filter]);

  // Memoize total amount calculation
  const totalAmount = useMemo(() => {
    return filtered.reduce((sum, t) => {
      return sum + (t.type === "income" ? t.amount : -t.amount);
    }, 0);
  }, [filtered]);

  const handleAdd = useCallback(() => {
    dispatch(
      addTransaction({
        date: new Date().toISOString().slice(0, 10),
        amount: 999,
        category: "New",
        type: "expense",
        icon: "✨",
      })
    );
  }, [dispatch]);

  const handleSearch = useCallback((e) => {
    dispatch(setSearch(e.target.value));
  }, [dispatch]);

  const handleFilter = useCallback((e) => {
    dispatch(setFilter(e.target.value));
  }, [dispatch]);

  const handleDelete = useCallback((id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch(deleteTransaction(id));
    }
  }, [dispatch]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/50">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading transactions...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200/50">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl shadow-md border border-gray-200/50 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">
            💳 Recent Transactions
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
            Total Transactions: {transactions.length} | 
            Showing: {filtered.length} | 
            Total: <span className={totalAmount >= 0 ? 'text-green-500' : 'text-red-500'}>
              {totalAmount >= 0 ? '+' : ''}₹{(totalAmount/1000).toFixed(0)}k
            </span>
          </p>
        </div>
        {role === "admin" && (
          <button
            onClick={handleAdd}
            className="bg-linear-to-r from-indigo-500 to-purple-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:shadow-lg transition-shadow duration-150 text-sm sm:text-base flex-shrink-0 whitespace-nowrap"
          >
            + Add
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
        <input
          placeholder="Search..."
          onChange={handleSearch}
          value={search}
          className="flex-1 min-w-0 border border-gray-300 px-3 sm:px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-ring duration-100"
        />

        <select
          onChange={handleFilter}
          value={filter}
          className="border border-gray-300 px-3 sm:px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-ring duration-100 min-w-fit"
        >
          <option value="all">All ({transactions.length})</option>
          <option value="income">Income ({transactions.filter(t => t.type === 'income').length})</option>
          <option value="expense">Expense ({transactions.filter(t => t.type === 'expense').length})</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-80 sm:max-h-96 overflow-y-auto rounded-xl border border-gray-100 bg-white/80">
        <table className="w-full min-w-full table-auto text-xs sm:text-sm text-gray-700">
          <thead className="bg-slate-50 sticky top-0">
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700">
                Date
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700">
                Category
              </th>
              <th className="text-right py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700">
                Amount
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700 hidden sm:table-cell">
                Type
              </th>
              {role === "admin" && (
                <th className="text-center py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-700">
                  Action
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-100 odd:bg-white even:bg-slate-50 hover:bg-slate-100 transition-colors duration-150"
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 text-xs sm:text-sm">{t.date}</td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <span className="text-base sm:text-lg">{t.icon}</span>
                      <span className="font-medium text-gray-900 truncate text-xs sm:text-sm">
                        {t.category}
                      </span>
                    </div>
                  </td>
                  <td className={`py-2 sm:py-3 px-2 sm:px-4 text-right font-semibold text-xs sm:text-sm ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {t.type === "income" ? "+" : "-"}₹{(t.amount/1000).toFixed(0)}k
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                      t.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {t.type.charAt(0).toUpperCase() + t.type.slice(1)}
                    </span>
                  </td>

                  {role === "admin" && (
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-center">
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700 font-semibold hover:bg-red-50 px-2 sm:px-3 py-1 rounded transition-colors duration-150 text-xs sm:text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === "admin" ? 5 : 4} className="py-8 text-center text-gray-500">
                  {search || filter !== 'all' 
                    ? 'No transactions match your search/filter criteria' 
                    : 'No transactions found. Click "Add Transaction" to create one!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Summary Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-600">
            📊 Showing {filtered.length} of {transactions.length} transactions
          </div>
          <div className="flex gap-4">
            <div className="text-green-600">
              💚 Income: ₹{transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
            <div className="text-red-600">
              ❤️ Expense: ₹{transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TransactionTable.displayName = 'TransactionTable';

export default TransactionTable;