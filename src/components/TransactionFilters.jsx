export default function TransactionFilters({
  filters,
  categories,
  onChange,
  onReset,
}) {
  return (
    <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-5">
      <input
        value={filters.search}
        onChange={(event) => onChange({ search: event.target.value })}
        placeholder="Search category"
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
      />
      <select
        value={filters.category}
        onChange={(event) => onChange({ category: event.target.value })}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={filters.type}
        onChange={(event) => onChange({ type: event.target.value })}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
      >
        <option value="all">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input
        type="date"
        value={filters.date}
        onChange={(event) => onChange({ date: event.target.value })}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
      />
      <button
        type="button"
        onClick={onReset}
        className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
      >
        Clear filters
      </button>
    </div>
  );
}
