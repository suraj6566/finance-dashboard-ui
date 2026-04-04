import { createSlice } from "@reduxjs/toolkit";
import { transactionsData } from "../data/mockData";

const initialState = {
  transactions: transactionsData, // All transactions loaded initially
  role: "admin", // Changed to admin to see all features
  search: "",
  filter: "all",
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push({
        ...action.payload,
        id: Date.now(),
      });
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (t) => t.id !== action.payload
      );
    },
    // New action to load transactions from API
    setTransactions: (state, action) => {
      state.transactions = action.payload;
    },
  },
});

export const {
  setRole,
  setSearch,
  setFilter,
  addTransaction,
  deleteTransaction,
  setTransactions,
} = financeSlice.actions;

export default financeSlice.reducer;