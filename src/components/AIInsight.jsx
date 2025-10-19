import React from 'react';
import { Sparkles } from 'lucide-react';

const AIInsights = ({ insights }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-2xl font-bold">AI-Powered Insights</h2>
        </div>
        <p className="text-indigo-100">Personalized analysis of your spending habits</p>
      </div>

      {insights.map((insight, idx) => {
        const Icon = insight.icon;
        return (
          <div key={idx} className={`bg-white rounded-2xl shadow-sm border-2 p-6 ${
            insight.type === 'warning' ? 'border-orange-200' :
            insight.type === 'success' ? 'border-green-200' : 'border-indigo-200'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                insight.type === 'warning' ? 'bg-orange-100' :
                insight.type === 'success' ? 'bg-green-100' : 'bg-indigo-100'
              }`}>
                <Icon className={`w-6 h-6 ${
                  insight.type === 'warning' ? 'text-orange-600' :
                  insight.type === 'success' ? 'text-green-600' : 'text-indigo-600'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{insight.title}</h3>
                <p className="text-gray-600">{insight.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AIInsights;
