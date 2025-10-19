import React from 'react';

const Transactions = ({ transactions }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-2">
        {transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(t => (
          <div key={t.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{t.emoji}</span>
              <div>
                <p className="font-medium text-gray-900">{t.category}</p>
                <p className="text-sm text-gray-500">{new Date(t.date).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-900">-€{t.amount.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;