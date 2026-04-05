import Charts from "../components/Charts";
import Insights from "../components/Insights";
import SpendingAnalysis from "../components/SpendingAnalysis";
import PortfolioCard from "../components/PortfolioCard";
import SectionCard from "../components/SectionCard";
import BudgetTracker from "../components/BudgetTracker";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <SectionCard eyebrow="Analytics" title="Performance and insights">
        <p className="max-w-3xl text-sm leading-6 text-gray-600 dark:text-slate-300">
          Responsive charts highlight monthly trends, income versus expenses, and where spending is concentrated so the dashboard feels like a real product instead of a demo screen.
        </p>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Charts />
        <Insights />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <SpendingAnalysis />
        <PortfolioCard />
      </div>

      <BudgetTracker />
    </div>
  );
}
