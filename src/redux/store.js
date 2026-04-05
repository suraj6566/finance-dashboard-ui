import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";
import authReducer from "./authSlice";
import themeReducer from "./themeSlice";

const STORAGE_KEY = "finance-dashboard-state";
const LOGIN_KEY = "isLoggedIn";
const AUTH_INITIALIZED_KEY = "finance-dashboard-auth-initialized";
const demoUser = {
  name: "Suraj",
  email: "demo@financeflow.app",
};

const loadState = () => {
  try {
    const loginFlag = localStorage.getItem(LOGIN_KEY);
    const authInitialized = localStorage.getItem(AUTH_INITIALIZED_KEY);

    if (!authInitialized && loginFlag === null) {
      localStorage.setItem(LOGIN_KEY, "true");
      localStorage.setItem(AUTH_INITIALIZED_KEY, "true");
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    const isLoggedIn = localStorage.getItem(LOGIN_KEY) === "true";

    if (!saved) {
      return {
        auth: {
          isAuthenticated: isLoggedIn,
          user: isLoggedIn ? demoUser : null,
        },
        theme: { mode: "dark" },
      };
    }

    const parsed = JSON.parse(saved);

    return {
      auth: {
        isAuthenticated: isLoggedIn,
        user: isLoggedIn ? parsed.auth?.user ?? demoUser : null,
      },
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
      auth: {
        isAuthenticated: true,
        user: demoUser,
      },
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
