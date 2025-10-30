import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import FinancialHealthScore from "./components/FinancialHealthScore";
import Overview from "./components/Overview";
import Transactions from "./components/Transactions";
import AIChat from "./components/AIChat";
import ReferralFunnel from "./components/ReferralFunnel";
import BankDashboard from "./components/BankDashboard";
import { MOCK_TRANSACTIONS, SAVING_GOAL } from "./data/mockData";
import Footer from "./components/Footer";

const App = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Compute category totals
  const categoryData = useMemo(() => {
    const grouped = MOCK_TRANSACTIONS.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    return Object.entries(grouped)
      .map(([name, value]) => ({
        name,
        value: parseFloat(value.toFixed(2)),
        emoji: MOCK_TRANSACTIONS.find((t) => t.category === name)?.emoji,
      }))
      .sort((a, b) => b.value - a.value);
  }, []);

  const totalSpent = useMemo(
    () => MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0),
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="relative z-10">
        <Header totalSpent={totalSpent} />
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="max-w-7xl mx-auto px-6 py-6">
          {activeTab === "overview" && (
            <Overview
              categoryData={categoryData}
              totalSpent={totalSpent}
              transactionCount={MOCK_TRANSACTIONS.length}
              savingGoal={SAVING_GOAL}
            />
          )}
          {activeTab === "healthscore" && (
            <FinancialHealthScore
              categoryData={categoryData}
              totalSpent={totalSpent}
              savingGoal={SAVING_GOAL}
            />
          )}
          {activeTab === "referralfunnel" && <ReferralFunnel />}
          {activeTab === "transactions" && (
            <Transactions transactions={MOCK_TRANSACTIONS} />
          )}
          {activeTab === "chat" && (
            <AIChat
              categoryData={categoryData}
              totalSpent={totalSpent}
              savingGoal={SAVING_GOAL}
            />
          )}
          {activeTab === "bankdashboard" && <BankDashboard />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
