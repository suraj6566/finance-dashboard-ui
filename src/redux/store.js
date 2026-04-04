import { configureStore } from "@reduxjs/toolkit";
import financeReducer from "./financeSlice";

const loadState = () => {
  try {
    const data = localStorage.getItem("finance");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    finance: financeReducer,
  },
  preloadedState: {
    finance: loadState(),
  },
});

store.subscribe(() => {
  localStorage.setItem(
    "finance",
    JSON.stringify(store.getState().finance)
  );
});