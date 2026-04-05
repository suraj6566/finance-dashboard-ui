import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { setRole } from "../redux/financeSlice";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/transactions", label: "Transactions" },
  { to: "/analytics", label: "Analytics" },
  { to: "/profile", label: "Profile" },
];

export default function AppShell() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.finance.role);
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="mx-auto flex min-h-screen w-full max-w-[1700px] flex-col px-4 py-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
        <aside className="mb-6 rounded-[2rem] border border-slate-200/80 bg-white/85 p-5 shadow-sm backdrop-blur-md transition-all duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 lg:sticky lg:top-6 lg:mb-0 lg:max-h-[calc(100vh-3rem)] lg:w-[340px] lg:overflow-y-auto">
          <div className="flex min-h-full flex-col">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-500 dark:text-violet-300">
                FinanceFlow
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                Easy Finance Dashboard
              </h1>
              <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-slate-300">
                Track your daily spending and manage your money easily.
              </p>
            </div>

            <nav className="mt-6 grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-white/90 hover:shadow-lg dark:text-slate-200 dark:hover:bg-slate-800/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 grid gap-3">
              <ThemeToggle />
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Switch to Admin mode to manage your spending - add, search, edit, and delete transactions.
              </p>
              <select
                value={role}
                onChange={(event) => dispatch(setRole(event.target.value))}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
              >
                <option value="admin">Admin mode</option>
                <option value="viewer">Viewer mode</option>
              </select>
            </div>

            <div className="mt-6 rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-white to-indigo-50 p-4 text-slate-900 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:to-slate-900 dark:text-white">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 text-sm font-bold text-white shadow-md">
                  DU
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-cyan-300">
                    Demo account
                  </p>
                  <p className="mt-1 truncate text-lg font-semibold">{user?.name ?? "Demo User"}</p>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {user?.email ?? "demo@financeflow.app"}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                Managing your personal finance workspace in <span className="font-semibold text-slate-900 dark:text-white">{role}</span> mode.
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg dark:from-white dark:via-slate-100 dark:to-slate-200 dark:text-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 py-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
