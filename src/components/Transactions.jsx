import React, { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Transactions = ({ transactions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = ['all', ...new Set(transactions.map(t => t.category))];
  const filtered = transactions.filter(t => 
    (filterCategory === 'all' || t.category === filterCategory) &&
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-2">Transactions</h1>
          <p className="text-gray-400">Track and manage all your financial movements</p>
        </div>

        {/* Controls */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2.5 bg-gradient-to-r from-slate-800 to-slate-900 border border-green-500/30 rounded-lg text-white focus:outline-none focus:border-green-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>

          <button className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg flex items-center gap-2 font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Transactions List */}
        <div className="space-y-2">
          {filtered.map((tx) => (
            <div key={tx.id} className="bg-gradient-to-r from-slate-800 to-slate-900 border border-green-500/20 hover:border-green-500/40 rounded-xl p-4 flex items-center justify-between transition-all hover:shadow-lg hover:shadow-green-500/10">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  tx.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {tx.type === 'income' ? (
                    <ArrowDownLeft className="w-6 h-6 text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-6 h-6 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-100">{tx.description}</p>
                  <p className="text-sm text-gray-500">{tx.category} • {new Date(tx.date).toLocaleDateString()}</p>
                </div>
              </div>
              <p className={`text-lg font-black ${tx.type === 'income' ? 'text-green-400' : 'text-gray-300'}`}>
                {tx.type === 'income' ? '+' : '-'}€{Math.abs(tx.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;