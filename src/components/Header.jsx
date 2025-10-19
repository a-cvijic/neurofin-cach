import React from 'react';
import { Brain, Menu, Bell } from 'lucide-react';

const Header = ({ totalSpent }) => {
  return (
    <header className="bg-gradient-to-r from-gray-950 via-slate-900 to-gray-950 border-b border-green-500/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur opacity-50 animate-pulse" />
              <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Brain className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">NeuroFin Coach</h1>
              <p className="text-xs text-gray-400">Your AI Financial Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Total Spent</p>
              <p className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">€{totalSpent.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors border border-green-500/20">
                <Bell className="w-5 h-5 text-gray-400 hover:text-green-400" />
              </button>
              <button className="p-2 hover:bg-green-500/20 rounded-lg transition-colors border border-green-500/20">
                <Menu className="w-5 h-5 text-gray-400 hover:text-green-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;