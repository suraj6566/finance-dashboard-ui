import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const TransactionsPage = lazy(() => import("./pages/TransactionsPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));

function PublicIndex() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return <Navigate to={isAuthenticated ? "/" : "/login"} replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
            <div className="rounded-[2rem] border border-white/50 bg-white/80 px-6 py-4 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100">
              Loading dashboard...
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell />}>
              <Route index element={<Dashboard />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<PublicIndex />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
