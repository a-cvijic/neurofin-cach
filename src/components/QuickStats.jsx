import React from 'react';
import { Calendar, DollarSign, TrendingUp, Target } from 'lucide-react';

const QuickStats = ({ transactionCount, avgTransaction, topCategory, goalProgress }) => {
  const stats = [
    { label: 'Transactions', value: transactionCount, icon: Calendar, color: 'blue' },
    { label: 'Avg. Transaction', value: `€${avgTransaction}`, icon: DollarSign, color: 'green' },
    { label: 'Top Category', value: topCategory, icon: TrendingUp, color: 'purple' },
    { label: 'Goal Progress', value: `${goalProgress}%`, icon: Target, color: 'orange' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map(stat => (
        <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center mb-2`}>
            <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
          </div>
          <p className="text-sm text-gray-500">{stat.label}</p>
          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;