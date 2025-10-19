import React from "react";
import { Receipt, PiggyBank, PieChart, Activity, Target, BellRing, Lightbulb, Wallet } from "lucide-react";


export default function LeftDock({ collapsed, setCollapsed, onSelect }) {
  const tools = [
    { id: "spending", label: "Spending Analysis", icon: Receipt },
    { id: "savings", label: "Instant Savings", icon: PiggyBank },
    { id: "portfolio", label: "Portfolio Performance", icon: PieChart },
    { id: "health", label: "Financial Health", icon: Activity },
    { id: "goals", label: "Goal Tracking", icon: Target },
    { id: "alerts", label: "Smart Alerts", icon: BellRing },
    { id: "insights", label: "AI Insights", icon: Lightbulb },
    { id: "budget", label: "Budget Overview", icon: Wallet },
  ];

  return (
    <aside
      className={`col-span-12 md:col-span-3 md:sticky md:top-24 h-[calc(100vh-7rem)] ${
        collapsed ? "w-0 md:w-0" : "w-full md:w-auto"
      }`}
      aria-label="AI tools"
    >
      {!collapsed && (
        <div className="h-full w-full md:w-64">
          <div className="rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-slate-900/70 to-slate-950/70 p-3 md:p-4 backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs tracking-widest text-emerald-300 font-bold">AI</p>
                <p className="text-xs tracking-widest text-gray-300">TOOLS</p>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="w-8 h-8 rounded-lg border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/15"
                title="Hide tools"
              >
                ❯
              </button>
            </div>

            <div className="space-y-2 overflow-y-auto pr-1 custom-scroll">
              {tools.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => onSelect(id)}
                  className="w-full group relative overflow-hidden rounded-2xl p-3 text-left transition-all bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/20 hover:border-emerald-500/60 hover:translate-x-[2px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-emerald-600/15 border border-emerald-500/30">
                      <Icon className="w-5 h-5 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-200">{label}</p>
                      <p className="text-[11px] text-gray-500 capitalize">{id.replace("-", " ")}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-28 left-3 z-30 bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-full shadow-lg transition-all"
          title="Open tools"
        >
          ❮
        </button>
      )}
    </aside>
  );
}