import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Zap } from 'lucide-react';

const AIInsights = ({ insights }) => {
  const insightTypes = {
    tip: { icon: Lightbulb, color: 'from-amber-500 to-orange-600', bg: 'from-amber-500/20 to-orange-500/20' },
    warning: { icon: AlertCircle, color: 'from-red-500 to-rose-600', bg: 'from-red-500/20 to-rose-500/20' },
    opportunity: { icon: Zap, color: 'from-green-500 to-emerald-600', bg: 'from-green-500/20 to-emerald-500/20' },
    trend: { icon: TrendingUp, color: 'from-blue-500 to-cyan-600', bg: 'from-blue-500/20 to-cyan-500/20' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent mb-2">AI Insights</h1>
          <p className="text-gray-400">Personalized financial recommendations powered by AI</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insights.map((insight, idx) => {
            const typeConfig = insightTypes[insight.type] || insightTypes.tip;
            const Icon = typeConfig.icon;
            
            return (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 hover:border-green-500/40 rounded-2xl p-6 transition-all hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${typeConfig.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-100 mb-2">{insight.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{insight.description}</p>
                
                {insight.suggestion && (
                  <div className={`bg-gradient-to-br ${typeConfig.bg} border border-green-500/20 rounded-lg p-3`}>
                    <p className="text-sm text-gray-300">
                      <span className="font-semibold">💡 Suggestion:</span> {insight.suggestion}
                    </p>
                  </div>
                )}
                
                {insight.impact && (
                  <div className="mt-3 text-xs text-gray-500">
                    <p>💰 Potential Impact: <span className="text-green-400 font-bold">€{insight.impact}</span></p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AIInsights;