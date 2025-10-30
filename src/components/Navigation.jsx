import React from "react";
import { Heart, LayoutDashboard, TrendingUp, Receipt, MessageCircle, Building2 } from "lucide-react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "healthscore", label: "Health Score", icon: Heart },
    { id: "referralfunnel", label: "Referral Funnel", icon: TrendingUp },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "chat", label: "AI Chat", icon: MessageCircle },
    { id: "bankdashboard", label: "Bank View", icon: Building2, highlight: true },
  ];

  return (
    <nav className="border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-40 bg-gray-950/80">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex space-x-1 overflow-x-auto no-scrollbar py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border border-green-500/30"
                    : tab.highlight
                    ? "text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 border border-purple-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
                {tab.highlight && !isActive && (
                  <span className="ml-1 px-1.5 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded">B2B</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;