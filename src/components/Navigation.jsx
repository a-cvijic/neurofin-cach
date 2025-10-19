import React from 'react';
import { DollarSign, Sparkles, Target, Calendar, MessageCircle } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: DollarSign },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'transactions', label: 'Transactions', icon: Calendar },
    { id: 'chat', label: 'AI Chat', icon: MessageCircle },
  ];

  return (
    <nav className="sticky top-0 z-20 backdrop-blur-md bg-gradient-to-r from-gray-950/80 via-slate-900/80 to-gray-950/80 border-b border-emerald-500/10 shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center md:justify-start gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm md:text-base transition-all rounded-md
                ${
                  activeTab === tab.id
                    ? 'text-emerald-400 border-b-2 border-emerald-400 bg-gradient-to-br from-emerald-500/10 to-transparent'
                    : 'text-gray-400 hover:text-emerald-300 hover:bg-gradient-to-br hover:from-slate-800/50 hover:to-slate-900/50'
                }`}
            >
              <tab.icon
                className={`w-4 h-4 ${
                  activeTab === tab.id ? 'text-emerald-400' : 'text-gray-400'
                }`}
              />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;