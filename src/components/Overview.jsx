import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { TrendingUp, Target, Wallet, Zap, Clock, ArrowUpRight, ArrowDownLeft, ChevronDown, ChevronUp } from 'lucide-react';

const Overview = ({ categoryData, totalSpent, transactionCount, savingGoal, transactions = [] }) => {
  const [goalsFilter, setGoalsFilter] = useState('active');
  const [showAllTransactions, setShowAllTransactions] = useState(false);

  const weeklyData = [
    { day: 'Mon', spent: 45 },
    { day: 'Tue', spent: 52 },
    { day: 'Wed', spent: 38 },
    { day: 'Thu', spent: 71 },
    { day: 'Fri', spent: 89 },
    { day: 'Sat', spent: 120 },
    { day: 'Sun', spent: 65 }
  ];

  // Goals
  const goals = [
    {
      id: 1,
      name: 'Monthly Saving Goal',
      current: savingGoal?.current || 145,
      target: savingGoal?.target || 200,
      status: 'active',
      deadline: 'monthly',
      icon: '💰'
    },
    {
      id: 2,
      name: 'Vacation Fund',
      current: 420,
      target: 1000,
      status: 'active',
      deadline: '2025-12-01',
      icon: '✈️'
    },
    {
      id: 3,
      name: 'Emergency Fund',
      current: 1000,
      target: 1000,
      status: 'completed',
      deadline: '2025-08-30',
      icon: '🛡️'
    }
  ];

  const filteredGoals = goalsFilter === 'all' ? goals : goals.filter(g => g.status === goalsFilter);

  // Get recent transactions
  const recentTransactions = transactions.slice(0, showAllTransactions ? transactions.length : 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="rounded-2xl border-2 border-emerald-500/25 bg-gradient-to-r from-slate-900/90 to-slate-950/90 backdrop-blur-md p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Financial Overview
                </h1>
                <p className="text-emerald-400/80 mt-2 text-sm">Your complete financial snapshot in one place</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-400/70 text-xs uppercase tracking-widest font-semibold">Live Data</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Wallet, label: 'Total Spent', value: `€${totalSpent.toFixed(2)}`, color: 'from-green-500 to-emerald-600' },
            { icon: TrendingUp, label: 'Transactions', value: transactionCount, color: 'from-blue-500 to-cyan-600' },
            { icon: Zap, label: 'Avg Transaction', value: `€${(totalSpent / transactionCount).toFixed(2)}`, color: 'from-amber-500 to-orange-600' },
            { icon: Target, label: 'Savings Goal', value: `${((savingGoal?.current || 145) / (savingGoal?.target || 200) * 100).toFixed(0)}%`, color: 'from-purple-500 to-pink-600' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all hover:shadow-lg hover:shadow-green-500/10">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Spending Breakdown Pie */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-400" />
              Spending Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#10b981', '#059669', '#047857', '#065f46', '#064e3b'][index % 5]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Weekly Spending Trend */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              Weekly Trend
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="spent" stroke="#10b981" fillOpacity={1} fill="url(#colorSpent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Goals Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-400" />
              Financial Goals
            </h2>
            <div className="flex gap-2">
              {['active', 'completed', 'all'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setGoalsFilter(filter)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                    goalsFilter === filter
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-slate-800 text-gray-400 hover:text-green-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredGoals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              const remaining = goal.target - goal.current;

              return (
                <div
                  key={goal.id}
                  className={`bg-gradient-to-br ${
                    goal.status === 'completed'
                      ? 'from-green-800/30 to-emerald-700/20 border-green-400/40'
                      : 'from-slate-800 to-slate-900 border-green-500/20'
                  } border rounded-2xl p-6 hover:border-green-500/40 transition-all`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-gray-100">{goal.name}</h3>
                      <p className="text-xs text-gray-400">
                        {goal.deadline === 'monthly' ? 'Monthly goal' : `Due ${new Date(goal.deadline).toLocaleDateString()}`}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      goal.status === 'completed' ? 'bg-green-500/30 text-green-300' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {goal.status}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">€{goal.current}</span>
                      <span className="text-gray-400">€{goal.target}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          goal.status === 'completed'
                            ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                            : 'bg-gradient-to-r from-green-400 to-emerald-500'
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-lg font-bold text-green-400">{progress.toFixed(0)}%</p>
                      <p className="text-xs text-gray-400">Complete</p>
                    </div>
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-lg font-bold text-white">€{remaining > 0 ? remaining : 0}</p>
                      <p className="text-xs text-gray-400">Remaining</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions Section - NOW AT THE BOTTOM */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-100 flex items-center gap-2">
              <Clock className="w-6 h-6 text-green-400" />
              Recent Transactions
            </h2>
            <button
              onClick={() => setShowAllTransactions(!showAllTransactions)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2"
            >
              {showAllTransactions ? 'Show Less' : 'View All'}
              {showAllTransactions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="space-y-2">
            {recentTransactions.map((tx) => (
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
    </div>
  );
};

export default Overview;