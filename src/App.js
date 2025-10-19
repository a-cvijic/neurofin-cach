import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AIInsights from "./components/AIInsight";
import Goals from "./components/Goals";
import Transactions from "./components/Transactions";
import AIChat from "./components/AIChat";
import { MOCK_TRANSACTIONS, SAVING_GOAL } from "./data/mockData";
import { TrendingUp, Award, Sparkles, Target } from "lucide-react";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
        type: foodDelivery > groceries ? "warning" : "success",
        title:
          foodDelivery > groceries
            ? "Food Delivery Alert! 🍕"
            : "Great Job! 🎉",
        message:
          foodDelivery > groceries
            ? `You're spending €${foodDelivery.toFixed(
                2
              )} on delivery vs €${groceries.toFixed(
                2
              )} on groceries. Cooking at home could save you €${(
                foodDelivery * 0.6
              ).toFixed(2)}/month!`
            : "You're prioritizing groceries over delivery. That's smart budgeting!",
        icon: foodDelivery > groceries ? TrendingUp : Award,
      },
      {
        type: "info",
        title: "Spending Pattern Detected 📊",
        message: `Your average transaction is €${avgTransaction.toFixed(
          2
        )}. Most of your spending happens on ${categoryData[0].name.toLowerCase()}.`,
        icon: Sparkles,
      },
      {
        type:
          SAVING_GOAL.current >= SAVING_GOAL.target * 0.7
            ? "success"
            : "warning",
        title:
          SAVING_GOAL.current >= SAVING_GOAL.target * 0.7
            ? "Almost There! 🚀"
            : "Keep Pushing! 💪",
        message: `You're ${(
          (SAVING_GOAL.current / SAVING_GOAL.target) *
          100
        ).toFixed(0)}% to your €${SAVING_GOAL.target} goal. ${
          SAVING_GOAL.target - SAVING_GOAL.current > 0
            ? `Just €${(SAVING_GOAL.target - SAVING_GOAL.current).toFixed(
                2
              )} to go!`
            : "Goal reached!"
        }`,
        icon: Target,
      },
    ];
  }, [categoryData, totalSpent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950">
      {/* Animated background elements */}
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
        </main>
      </div>
    </div>
  );
};

export default App;
