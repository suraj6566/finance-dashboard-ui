import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

const STORAGE_KEY = "finance-dashboard-state";

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return undefined;
    }

    const parsed = JSON.parse(saved);

    return {
      auth: parsed.auth ?? undefined,
      theme: parsed.theme ?? { mode: "dark" },
      finance: parsed.finance
        ? {
            ...parsed.finance,
            filters: parsed.finance.filters ?? {
              search: "",
              category: "all",
              type: "all",
              date: "",
            },
            visibleCount: parsed.finance.visibleCount ?? 8,
          }
        : undefined,
    };
  } catch {
    return {
      theme: { mode: "dark" },
    };
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    finance: financeReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      auth: state.auth,
      theme: state.theme,
      finance: {
        transactions: state.finance.transactions,
        role: state.finance.role,
        filters: state.finance.filters,
        visibleCount: state.finance.visibleCount,
      },
    }),
  );
});
