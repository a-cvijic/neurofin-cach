// src/components/chat/LeftDock.jsx
import React from "react";
import { Receipt, PiggyBank, PieChart, Activity, Target, BellRing, Lightbulb, Wallet } from "lucide-react";

export default function LeftDock({ collapsed, setCollapsed, onSelect }) {
  const tools = [
    { 
      id: "spending", 
      label: "Spending Analysis", 
      icon: Receipt,
      description: "Track expenses & trends",
      color: "from-red-500/20 to-orange-500/20",
      iconBg: "bg-red-500/15 border-red-500/30",
      iconColor: "text-red-300"
    },
    { 
      id: "savings", 
      label: "Instant Savings", 
      icon: PiggyBank,
      description: "Find saving opportunities",
      color: "from-emerald-500/20 to-green-500/20",
      iconBg: "bg-emerald-500/15 border-emerald-500/30",
      iconColor: "text-emerald-300"
    },
    { 
      id: "portfolio", 
      label: "Portfolio Performance", 
      icon: PieChart,
      description: "Investment analytics",
      color: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500/15 border-blue-500/30",
      iconColor: "text-blue-300"
    },
    { 
      id: "health", 
      label: "Financial Health", 
      icon: Activity,
      description: "Overall score & metrics",
      color: "from-purple-500/20 to-pink-500/20",
      iconBg: "bg-purple-500/15 border-purple-500/30",
      iconColor: "text-purple-300"
    },
    { 
      id: "goals", 
      label: "Goal Tracking", 
      icon: Target,
      description: "Progress monitoring",
      color: "from-yellow-500/20 to-amber-500/20",
      iconBg: "bg-yellow-500/15 border-yellow-500/30",
      iconColor: "text-yellow-300"
    },
    { 
      id: "alerts", 
      label: "Smart Alerts", 
      icon: BellRing,
      description: "Notifications & warnings",
      color: "from-orange-500/20 to-red-500/20",
      iconBg: "bg-orange-500/15 border-orange-500/30",
      iconColor: "text-orange-300"
    },
    { 
      id: "insights", 
      label: "AI Insights", 
      icon: Lightbulb,
      description: "Intelligent recommendations",
      color: "from-cyan-500/20 to-blue-500/20",
      iconBg: "bg-cyan-500/15 border-cyan-500/30",
      iconColor: "text-cyan-300"
    },
    { 
      id: "budget", 
      label: "Budget Overview", 
      icon: Wallet,
      description: "Category breakdown",
      color: "from-green-500/20 to-emerald-500/20",
      iconBg: "bg-green-500/15 border-green-500/30",
      iconColor: "text-green-300"
    },
  ];

  return (
    <aside
      className={`col-span-12 md:col-span-3 md:sticky md:top-24 h-[calc(100vh-7rem)] transition-all duration-300 ${
        collapsed ? "w-0 md:w-0 overflow-hidden" : "w-full md:w-auto"
      }`}
      aria-label="AI tools"
    >
      {!collapsed && (
        <div className="h-full w-full md:w-64">
          <div className="rounded-3xl border-2 border-emerald-500/25 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-3 md:p-4 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-500/20">
              <div>
                <p className="text-xs tracking-widest text-emerald-300 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  AI TOOLS
                </p>
                <p className="text-[10px] tracking-wide text-gray-400 mt-0.5">Neural Analysis Suite</p>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="w-8 h-8 rounded-lg border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/20 transition-all hover:scale-105 font-bold"
                title="Hide tools"
              >
                ❯
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto pr-1 custom-scroll max-h-[calc(100vh-16rem)]">
              {tools.map(({ id, label, icon: Icon, description, color, iconBg, iconColor }) => (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className={`w-full group relative overflow-hidden rounded-2xl p-3 text-left transition-all bg-gradient-to-br ${color} from-slate-800 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/60 hover:translate-x-[2px] hover:shadow-lg hover:shadow-emerald-500/10`}
                >
                  {/* Animated background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  
                  <div className="relative flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${iconBg} border transition-all group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-200 group-hover:text-emerald-200 transition-colors truncate">
                        {label}
                      </p>
                      <p className="text-[10px] text-gray-500 group-hover:text-gray-400 transition-colors truncate">
                        {description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Stats footer */}
            <div className="mt-4 pt-3 border-t border-emerald-500/20">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>8 Tools Active</span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-28 left-3 z-30 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white p-3 rounded-full shadow-2xl shadow-emerald-500/50 transition-all hover:scale-110"
          title="Open tools"
        >
          <span className="text-lg font-bold">❮</span>
        </button>
      )}
    </aside>
  );
}