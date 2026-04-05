import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
    >
      <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isDark ? "bg-cyan-400" : "bg-amber-400"}`} />
      {isDark ? "Dark" : "Light"}
    </button>
  );
}
