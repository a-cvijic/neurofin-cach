import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../data/mockData';
import QuickStats from './QuickStats';

const Dashboard = ({ categoryData, totalSpent, transactionCount, savingGoal }) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Spending Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Spending Breakdown</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `€${value}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Top Spending Categories</h2>
          <div className="space-y-3">
            {categoryData.slice(0, 5).map((cat, idx) => (
              <div key={cat.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{cat.emoji}</span>
                  <div>
                    <p className="font-medium text-gray-900">{cat.name}</p>
                    <p className="text-xs text-gray-500">Rank #{idx + 1}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-gray-900">€{cat.value.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats
        transactionCount={transactionCount}
        avgTransaction={(totalSpent / transactionCount).toFixed(2)}
        topCategory={categoryData[0].name}
        goalProgress={((savingGoal.current / savingGoal.target) * 100).toFixed(0)}
      />
    </div>
  );
};

export default Dashboard;