import React from "react";
import { LayoutDashboard, Lightbulb, Target, Receipt, MessageCircle, Shield } from "lucide-react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "impulseguard", label: "Impulse Guard", icon: Shield },
    { id: "insights", label: "AI Insights", icon: Lightbulb },
    { id: "goals", label: "Goals", icon: Target },
    { id: "transactions", label: "Transactions", icon: Receipt },
    { id: "chat", label: "AI Chat", icon: MessageCircle },
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
                    : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;