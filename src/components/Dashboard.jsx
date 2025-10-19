import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, Target, Wallet, Zap } from 'lucide-react';

const Dashboard = ({ categoryData, totalSpent, transactionCount, savingGoal }) => {
  const weeklyData = [
    { day: 'Mon', spent: 45 },
    { day: 'Tue', spent: 52 },
    { day: 'Wed', spent: 38 },
    { day: 'Thu', spent: 71 },
    { day: 'Fri', spent: 89 },
    { day: 'Sat', spent: 120 },
    { day: 'Sun', spent: 65 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Wallet, label: 'Total Spent', value: `€${totalSpent.toFixed(2)}`, color: 'from-green-500 to-emerald-600' },
            { icon: TrendingUp, label: 'Transactions', value: transactionCount, color: 'from-blue-500 to-cyan-600' },
            { icon: Zap, label: 'Avg Transaction', value: `€${(totalSpent / transactionCount).toFixed(2)}`, color: 'from-amber-500 to-orange-600' },
            { icon: Target, label: 'Goal Progress', value: `${((savingGoal.current / savingGoal.target) * 100).toFixed(0)}%`, color: 'from-purple-500 to-pink-600' }
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Spending Breakdown Pie */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-gray-100 mb-4">Spending Breakdown</h2>
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
            <h2 className="text-lg font-bold text-gray-100 mb-4">Weekly Trend</h2>
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

        {/* Top Categories */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-100 mb-4">Top Spending Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categoryData.slice(0, 5).map((cat, idx) => (
              <div key={cat.name} className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 hover:border-green-500/60 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{cat.emoji}</span>
                  <span className="text-xs font-bold text-green-400">#{idx + 1}</span>
                </div>
                <p className="font-semibold text-gray-100 text-sm">{cat.name}</p>
                <p className="text-lg font-black text-green-400 mt-2">€{cat.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;