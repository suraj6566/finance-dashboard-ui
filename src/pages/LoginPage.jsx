import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const mode = useSelector((state) => state.theme.mode);

  const [email, setEmail] = useState("demo@financeflow.app");
  const [password, setPassword] = useState("password123");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      loginSuccess({
        name: "Demo User",
        email,
      }),
    );

    navigate(location.state?.from?.pathname ?? "/", { replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8 transition-all duration-300 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="absolute left-4 top-4">
        <ThemeToggle />
      </div>
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/50 bg-white/80 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-cyan-900 p-8 text-white sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
            FinanceFlow
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight">
            Professional finance dashboard with modern UX.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            Sign in to access a polished multi-page dashboard with theme switching, analytics, and persistent transaction management.
          </p>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-medium text-indigo-500 dark:text-cyan-300">Welcome back</p>
            <h2 className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              Login to continue
            </h2>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
              Email
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
              />
            </label>
            <label className="grid gap-2 text-sm text-gray-600 dark:text-slate-300">
              Password
              <input
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-gray-900 outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-400 dark:focus:ring-cyan-950"
              />
            </label>
            <button
              type="submit"
              className="mt-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-lg"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
