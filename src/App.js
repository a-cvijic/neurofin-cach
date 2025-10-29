import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AIInsights from "./components/AIInsight";
import Goals from "./components/Goals";
import Transactions from "./components/Transactions";
import AIChat from "./components/AIChat";
import ImpulseGuardTab from "./components/ImpulseGuardTab";
import ImpulseGuard from "./components/ImpulseGuard";
import { MOCK_TRANSACTIONS, SAVING_GOAL } from "./data/mockData";
import Footer from "./components/Footer";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [impulseGuardEnabled, setImpulseGuardEnabled] = useState(true);
  const [impulseGuardStats, setImpulseGuardStats] = useState({
    saved: 340,
    prevented: 7,
    currentStreak: 12,
  });

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

  const insights = useMemo(() => {
    const foodDelivery =
      categoryData.find((c) => c.name === "Food Delivery")?.value || 0;
    const groceries =
      categoryData.find((c) => c.name === "Groceries")?.value || 0;
    const avgTransaction = totalSpent / MOCK_TRANSACTIONS.length;

    return [
      {
        type: foodDelivery > groceries ? "warning" : "tip",
        title:
          foodDelivery > groceries
            ? "Food Delivery Alert! 🍕"
            : "Great Job! 🎉",
        description:
          foodDelivery > groceries
            ? `You're spending €${foodDelivery.toFixed(
                2
              )} on delivery vs €${groceries.toFixed(
                2
              )} on groceries. Cooking at home could save you €${(
                foodDelivery * 0.6
              ).toFixed(2)}/month!`
            : "You're prioritizing groceries over delivery. That's smart budgeting!",
        suggestion:
          foodDelivery > groceries
            ? "Try home-cooked meals twice a week to reduce delivery costs."
            : "Maintain this balance — it's keeping your finances stable!",
        impact: foodDelivery > groceries ? "€60/month" : "€120/year saved",
      },
      {
        type: "trend",
        title: "Spending Pattern Detected 📊",
        description: `Your average transaction is €${avgTransaction.toFixed(
          2
        )}. Most of your spending happens on ${categoryData[0].name.toLowerCase()}.`,
        suggestion:
          "You might benefit from setting a limit per category next month.",
        impact: "Moderate Impact",
      },
      {
        type:
          SAVING_GOAL.current >= SAVING_GOAL.target * 0.7
            ? "opportunity"
            : "tip",
        title:
          SAVING_GOAL.current >= SAVING_GOAL.target * 0.7
            ? "Almost There! 🚀"
            : "Keep Pushing! 💪",
        description: `You're ${(
          (SAVING_GOAL.current / SAVING_GOAL.target) *
          100
        ).toFixed(0)}% to your €${SAVING_GOAL.target} goal.`,
        suggestion:
          "Add an extra €10/week — you'll hit your target one week early!",
        impact: "€55 remaining",
      },
    ];
  }, [categoryData, totalSpent]);

  // Handle Impulse Guard completion
  const handleImpulseGuardComplete = (action, amount) => {
    if (action === "saved") {
      setImpulseGuardStats({
        ...impulseGuardStats,
        saved: impulseGuardStats.saved + amount,
        prevented: impulseGuardStats.prevented + 1,
      });
    }
  };

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
          {activeTab === "dashboard" && (
            <Dashboard
              categoryData={categoryData}
              totalSpent={totalSpent}
              transactionCount={MOCK_TRANSACTIONS.length}
              savingGoal={SAVING_GOAL}
            />
          )}
          {activeTab === "insights" && <AIInsights insights={insights} />}
          {activeTab === "goals" && <Goals goals={[SAVING_GOAL]} />}
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
          {activeTab === "impulseguard" && (
            <ImpulseGuardTab
              stats={impulseGuardStats}
              isEnabled={impulseGuardEnabled}
              onToggle={setImpulseGuardEnabled}
            />
          )}
        </main>

        <Footer />
      </div>

      {/* Impulse Guard Component - Always rendered, shows when triggered */}
      <ImpulseGuard
        isEnabled={impulseGuardEnabled}
        onComplete={handleImpulseGuardComplete}
      />
    </div>
  );
};

export default App;
