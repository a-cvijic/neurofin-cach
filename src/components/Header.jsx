import React from 'react';
import { Database, Link as LinkIcon } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800">
      {/* NEW: Demo Data Banner */}
      <div className="bg-blue-900/30 border-b border-blue-500/30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-blue-400" />
            <span className="text-blue-100 font-medium">
              You're viewing demo data
            </span>
          </div>
          <button className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg hover:from-emerald-600 hover:to-green-700 transition-all flex items-center gap-2 text-sm font-medium">
            <LinkIcon className="w-4 h-4" />
            Connect Your Bank
          </button>
        </div>
      </div>

      {/* Original header content */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">NeuroFin Coach</h1>
            <p className="text-slate-400 text-sm">Your AI Financial Assistant</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-slate-400">Total Balance</p>
              <p className="text-xl font-bold text-emerald-400">€12,450.00</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
