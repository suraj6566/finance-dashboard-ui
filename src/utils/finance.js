export function getFinanceSummary(transactions) {
  return transactions.reduce(
    (summary, transaction) => {
      if (transaction.type === "income") {
        summary.income += transaction.amount;
      } else {
        summary.expense += transaction.amount;
      }

      summary.balance = summary.income - summary.expense;
      return summary;
    },
    { income: 0, expense: 0, balance: 0 },
  );
}

export function getMonthlyTrends(transactions) {
  const grouped = transactions.reduce((accumulator, transaction) => {
    const date = new Date(transaction.date);
    const key = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, "0")}`;

    if (!accumulator[key]) {
      accumulator[key] = {
        key,
        month: date.toLocaleString("en-US", { month: "short" }),
        income: 0,
        expense: 0,
      };
    }

    accumulator[key][transaction.type] += transaction.amount;
    return accumulator;
  }, {});

  return Object.values(grouped)
    .sort((a, b) => a.key.localeCompare(b.key))
    .map(({ key, ...item }) => ({
      ...item,
      balance: item.income - item.expense,
    }));
}

export function getCategoryBreakdown(transactions) {
  const expenses = transactions.filter((transaction) => transaction.type === "expense");
  const grouped = expenses.reduce((accumulator, transaction) => {
    accumulator[transaction.category] =
      (accumulator[transaction.category] ?? 0) + transaction.amount;
    return accumulator;
  }, {});

  return Object.entries(grouped).map(([name, value], index) => ({
    name,
    value,
    fill: ["#4f46e5", "#06b6d4", "#f97316", "#ec4899", "#10b981", "#8b5cf6"][
      index % 6
    ],
  }));
}

export function getTopCategory(transactions) {
  const categories = getCategoryBreakdown(transactions);
  return categories.sort((a, b) => b.value - a.value)[0] ?? null;
}

export function getRecentTransactions(transactions, limit = 5) {
  return [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
}

export function getFilteredTransactions(transactions, filters) {
  return [...transactions]
    .filter((transaction) => {
      const matchesSearch = filters.search
        ? transaction.category.toLowerCase().includes(filters.search.toLowerCase())
        : true;
      const matchesCategory =
        filters.category === "all" ? true : transaction.category === filters.category;
      const matchesType = filters.type === "all" ? true : transaction.type === filters.type;
      const matchesDate = filters.date ? transaction.date === filters.date : true;

      return matchesSearch && matchesCategory && matchesType && matchesDate;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
