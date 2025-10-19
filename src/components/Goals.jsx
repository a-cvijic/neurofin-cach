import React, { useState } from "react";
import { Plus, Target } from "lucide-react";

const Goals = ({ goals }) => {
  const [filter, setFilter] = useState("all");

  const displayGoals = [
    {
      id: 1,
      name: "Monthly Saving Goal",
      current: 145,
      target: 200,
      weeks: 3,
      status: "active",
      deadline: "monthly",
      tip: "💡 Automate transfers to your savings every payday to stay consistent.",
    },
    {
      id: 2,
      name: "Vacation Fund",
      current: 420,
      target: 1000,
      weeks: 6,
      status: "active",
      deadline: "2025-12-01",
      tip: "✈️ Start pre-booking hotels early — travel deals reward long-term planners!",
    },
    {
      id: 3,
      name: "Laptop Upgrade",
      current: 1200,
      target: 1200,
      weeks: 10,
      status: "completed",
      deadline: "2025-10-01",
      tip: "🧠 Great job! Now consider setting aside 10% monthly for future tech upgrades.",
    },
    {
      id: 4,
      name: "Emergency Fund",
      current: 1000,
      target: 1000,
      weeks: 12,
      status: "completed",
      deadline: "2025-08-30",
      tip: "🛡️ Fantastic — you’ve built your safety net! Keep contributing to stay protected.",
    },
  ];

  const filteredGoals =
    filter === "all"
      ? displayGoals
      : displayGoals.filter((g) => g.status === filter);

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 px-6 py-12">
      {/* Animated glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-green-500/10 blur-3xl rounded-full animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-emerald-600/10 blur-3xl rounded-full animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-1">
              Financial Goals
            </h1>
            <p className="text-gray-400">Track, filter, and visualize your savings progress</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg flex items-center gap-2 font-bold transition-all hover:shadow-lg hover:shadow-green-500/30">
            <Plus className="w-5 h-5" />
            New Goal
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-10">
          {["all", "active", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all border ${
                filter === tab
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-md shadow-green-500/20"
                  : "border-green-500/30 text-gray-400 hover:text-green-300 hover:border-green-500/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            const remaining = goal.target - goal.current;

            return (
              <div
                key={goal.id}
                className={`bg-gradient-to-br ${
                  goal.status === "completed"
                    ? "from-green-800/30 to-emerald-700/20"
                    : "from-slate-800 to-slate-900"
                } border ${
                  goal.status === "completed"
                    ? "border-green-400/40"
                    : "border-green-500/20"
                } hover:border-green-500/40 rounded-2xl p-8 transition-all hover:shadow-lg hover:shadow-green-500/10`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        goal.status === "completed"
                          ? "bg-green-500/30"
                          : "bg-gradient-to-br from-green-500 to-emerald-600"
                      }`}
                    >
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-100">
                        {goal.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {goal.deadline === "monthly"
                          ? `Save €${goal.target} this month`
                          : `Save €${goal.target} by ${new Date(
                              goal.deadline
                            ).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      goal.status === "completed"
                        ? "bg-green-500/30 text-green-300"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {goal.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">
                      €{goal.current.toFixed(2)}
                    </span>
                    <span className="text-gray-400">
                      €{goal.target.toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-[width] duration-700 ease-in-out ${
                        goal.status === "completed"
                          ? "bg-gradient-to-r from-green-400 to-emerald-400"
                          : "bg-gradient-to-r from-green-400 to-emerald-500"
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center bg-slate-800/50 rounded-xl p-4">
                    <p className="text-xl font-bold text-gray-100">
                      {goal.weeks}
                    </p>
                    <p className="text-sm text-gray-400">Weeks</p>
                  </div>
                  <div className="text-center bg-slate-800/50 rounded-xl p-4">
                    <p className="text-xl font-bold text-gray-100">
                      €{remaining > 0 ? remaining.toFixed(2) : "0.00"}
                    </p>
                    <p className="text-sm text-gray-400">To Go</p>
                  </div>
                  <div className="text-center bg-slate-800/50 rounded-xl p-4">
                    <p
                      className={`text-xl font-bold ${
                        goal.status === "completed"
                          ? "text-green-300"
                          : "text-green-400"
                      }`}
                    >
                      {progress.toFixed(0)}%
                    </p>
                    <p className="text-sm text-gray-400">Done</p>
                  </div>
                </div>

                {/* Message + Tip */}
                <div
                  className={`p-4 rounded-xl font-medium mb-4 ${
                    goal.status === "completed"
                      ? "border border-green-500/30 bg-green-500/10 text-green-300"
                      : "border border-green-400/20 bg-green-500/10 text-green-300"
                  }`}
                >
                  {goal.status === "completed"
                    ? "✅ Goal completed — excellent work hitting your target!"
                    : "🎯 You’re on track! Keep building those good saving habits."}
                </div>

                {/* Goal-specific tip */}
                <div
                  className={`p-4 rounded-xl text-white font-medium text-center shadow-md ${
                    goal.status === "completed"
                      ? "bg-gradient-to-r from-emerald-600 to-green-500"
                      : goal.id % 2 === 0
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500"
                      : "bg-gradient-to-r from-purple-600 to-pink-600"
                  }`}
                >
                  {goal.tip}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Goals;