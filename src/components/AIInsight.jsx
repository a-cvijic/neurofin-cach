import React from "react";
import {
  Lightbulb,
  TrendingUp,
  AlertCircle,
  Zap,
  PiggyBank,
  Coins,
  Target,
} from "lucide-react";

const AIInsights = ({ insights }) => {
  const sampleInsights =
    insights && insights.length > 0
      ? insights
      : [
          {
            type: "tip",
            title: "Smart Spending Ratio",
            description:
              "Your essentials account for 62% of total spending — slightly above the healthy 50–60% range.",
            suggestion:
              "Redirect 5% from non-essentials to savings next month to balance it.",
            impact: "~€120/month",
          },
          {
            type: "trend",
            title: "Rising Food Delivery Costs 🍕",
            description:
              "Food delivery rose 24% compared to last month, mostly during weekends.",
            suggestion:
              "Limit orders to once per week — potential savings of €60/month.",
            impact: "€720/year",
          },
          {
            type: "opportunity",
            title: "Savings Streak Detected 🚀",
            description:
              "You’ve maintained consistent weekly deposits for four weeks.",
            suggestion:
              "Auto-transfer €20 extra weekly to accelerate your progress.",
            impact: "€240 over 3 months",
          },
          {
            type: "warning",
            title: "Subscription Overload ⚠️",
            description:
              "You have 8 active subscriptions totaling €92/month — up 40% from last quarter.",
            suggestion:
              "Review rarely used services. Canceling just 2 saves €25/month.",
            impact: "€300/year",
          },
        ];

  const insightTypes = {
    tip: {
      icon: Lightbulb,
      color: "from-amber-400 to-orange-500",
      border: "border-amber-400/30",
      glow: "shadow-[0_0_25px_rgba(251,191,36,0.25)]",
    },
    trend: {
      icon: TrendingUp,
      color: "from-blue-400 to-cyan-500",
      border: "border-blue-400/30",
      glow: "shadow-[0_0_25px_rgba(96,165,250,0.25)]",
    },
    opportunity: {
      icon: Zap,
      color: "from-green-400 to-emerald-500",
      border: "border-green-400/30",
      glow: "shadow-[0_0_25px_rgba(74,222,128,0.25)]",
    },
    warning: {
      icon: AlertCircle,
      color: "from-red-500 to-rose-600",
      border: "border-red-500/30",
      glow: "shadow-[0_0_25px_rgba(248,113,113,0.25)]",
    },
  };

  const summary = {
    savingsRate: 18,
    monthlyChange: 5.6,
    streak: 4,
    score: 82,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 px-6 py-10 relative overflow-hidden">
      {/* background pulse blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-green-500/10 blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-2">
            AI Insights
          </h1>
          <p className="text-gray-400">
            Your personalized financial assistant — identifying trends, risks,
            and opportunities.
          </p>
        </div>

        {/* summary metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-slate-900/60 border border-green-400/20 rounded-xl p-4 flex items-center gap-3">
            <PiggyBank className="w-6 h-6 text-green-400" />
            <div>
              <p className="text-xs text-gray-400">Savings Rate</p>
              <p className="text-lg font-semibold text-green-300">
                {summary.savingsRate}%
              </p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-blue-400/20 rounded-xl p-4 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-xs text-gray-400">Monthly Change</p>
              <p className="text-lg font-semibold text-blue-300">
                +{summary.monthlyChange}%
              </p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-amber-400/20 rounded-xl p-4 flex items-center gap-3">
            <Target className="w-6 h-6 text-amber-400" />
            <div>
              <p className="text-xs text-gray-400">Goal Streak</p>
              <p className="text-lg font-semibold text-amber-300">
                {summary.streak} weeks
              </p>
            </div>
          </div>
          <div className="bg-slate-900/60 border border-purple-400/20 rounded-xl p-4 flex items-center gap-3">
            <Coins className="w-6 h-6 text-purple-400" />
            <div>
              <p className="text-xs text-gray-400">Financial Score</p>
              <p className="text-lg font-semibold text-purple-300">
                {summary.score}/100
              </p>
            </div>
          </div>
        </div>

        {/* main insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sampleInsights.map((insight, idx) => {
            const type = insightTypes[insight.type] || insightTypes.tip;
            const Icon = type.icon;

            return (
              <div
                key={idx}
                className={`relative bg-gradient-to-br from-slate-800 to-slate-900 border ${type.border} rounded-2xl p-6 min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${type.glow}`}
              >
                <div>
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white animate-pulse-slow" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 mb-2">
                    {insight.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {insight.description}
                  </p>
                </div>

                <div>
                  {insight.suggestion && (
                    <div
                      className={`relative bg-gradient-to-br ${type.color} opacity-80 border border-white/5 rounded-lg p-3 backdrop-blur-sm animate-pulse-slow`}
                    >
                      <p className="text-sm text-gray-100">
                        <span className="font-semibold text-white/90">
                          💡 Suggestion:
                        </span>{" "}
                        <span className="text-gray-200">
                          {insight.suggestion}
                        </span>
                      </p>
                    </div>
                  )}
                  {insight.impact && (
                    <div className="mt-3 text-xs text-gray-400">
                      💰 <span className="text-green-400 font-bold">Impact:</span>{" "}
                      {insight.impact}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;