import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = ({ totalSpent }) => {
  return (
    <header className="bg-white shadow-sm border-b border-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NeuroFin Coach</h1>
              <p className="text-xs text-gray-500">Your AI Financial Assistant</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-indigo-600">€{totalSpent.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;