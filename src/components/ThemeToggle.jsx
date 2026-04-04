import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/financeSlice";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((s) => s.finance.darkMode);

  return (
    <button
      onClick={() => dispatch(toggleDarkMode())}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {darkMode ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default ThemeToggle;