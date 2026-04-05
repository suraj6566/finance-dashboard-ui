import { useEffect, useState } from "react";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  category: "",
  amount: "",
  type: "expense",
  icon: "TX",
};

export default function TransactionFormModal({
  isOpen,
  initialValues,
  onClose,
  onSubmit,
}) {
  const [formValues, setFormValues] = useState(emptyForm);

  useEffect(() => {
    if (initialValues) {
      setFormValues({
        ...initialValues,
        amount: String(initialValues.amount),
      });
    } else {
      setFormValues(emptyForm);
    }
  }, [initialValues, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (field, value) => {
    setFormValues((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      ...initialValues,
      ...formValues,
      amount: Number(formValues.amount),
      category: formValues.category.trim(),
      icon: formValues.icon.trim() || "TX",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[2rem] border border-white/60 bg-white p-6 shadow-2xl transition-all duration-200 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-cyan-300">
              Transaction
            </p>
            <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {initialValues ? "Edit transaction" : "Add a new transaction"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-gray-600 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:text-slate-300"
          >
            Close
          </button>
        </div>

        <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
            Category
            <input
              required
              value={formValues.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
            />
          </label>
          <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
            Amount
            <input
              required
              min="1"
              type="number"
              value={formValues.amount}
              onChange={(event) => handleChange("amount", event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
            />
          </label>
          <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
            Type
            <select
              value={formValues.type}
              onChange={(event) => handleChange("type", event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
            Date
            <input
              required
              type="date"
              value={formValues.date}
              onChange={(event) => handleChange("date", event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
            />
          </label>
          <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300 sm:col-span-2">
            Label token
            <input
              value={formValues.icon}
              onChange={(event) => handleChange("icon", event.target.value.slice(0, 3))}
              placeholder="TX"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
            />
          </label>
          <div className="sm:col-span-2 flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg"
            >
              {initialValues ? "Save changes" : "Create transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
