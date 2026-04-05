import { createSlice } from "@reduxjs/toolkit";
import { transactionsData } from "../data/mockData";

const initialState = {
  transactions: transactionsData,
  role: "admin",
  filters: {
    search: "",
    category: "all",
    type: "all",
    date: "",
  },
  visibleCount: 8,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
      state.visibleCount = 8;
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.visibleCount = 8;
    },
    loadMoreTransactions: (state) => {
      state.visibleCount += 8;
    },
    addTransaction: (state, action) => {
      state.transactions.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
      });
    },
    updateTransaction: (state, action) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id,
      );
      if (index >= 0) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload,
      );
    },
  },
});

export const {
  setRole,
  setFilters,
  resetFilters,
  loadMoreTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = financeSlice.actions;

export default financeSlice.reducer;
