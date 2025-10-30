import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Shield, Zap, Heart, Target, AlertCircle, ChevronRight } from 'lucide-react';

const FinancialHealthScore = ({ 
  score = 73, 
  impulseGuardEnabled,
  categoryData,
  totalSpent,
  savingGoal 
}) => {
  const [selectedFactor, setSelectedFactor] = useState(null);

  // Calculate individual factor scores
  const factors = [
    {
      id: 'impulse',
      name: 'Impulse Control',
      score: impulseGuardEnabled ? 82 : 65,
      weight: 25,
      icon: Shield,
      color: impulseGuardEnabled ? 'green' : 'yellow',
      trend: impulseGuardEnabled ? 'up' : 'down',
      description: impulseGuardEnabled 
        ? 'Excellent! Impulse Guard is protecting you from emotional spending.'
        : 'Enable Impulse Guard to improve this score by 17 points.',
      actionable: !impulseGuardEnabled,
      action: 'Enable Impulse Guard',
      impact: '+17 points'
    },
    {
      id: 'spending',
      name: 'Spending Habits',
      score: 78,
      weight: 30,
      icon: Zap,
      color: 'green',
      trend: 'up',
      description: 'Great balance between essential and non-essential spending.',
      tips: [
        'Groceries: 23% (optimal)',
        'Food Delivery: 15% (could reduce)',
        'Transport: 12% (good)'
      ]
    },
    {
      id: 'savings',
      name: 'Savings Rate',
      score: 68,
      weight: 25,
      icon: Target,
      color: 'yellow',
      trend: 'neutral',
      description: `You're saving ${((savingGoal.current / savingGoal.target) * 100).toFixed(0)}% toward your goal.`,
      actionable: true,
      action: 'Increase monthly savings',
      impact: '+12 points',
      tips: [
        `€${savingGoal.current} saved of €${savingGoal.target} goal`,
        'On track for 4-month completion',
        'Suggested: Add €50/month'
      ]
    },
    {
      id: 'cashflow',
      name: 'Cash Flow Health',
      score: 71,
      weight: 20,
      icon: TrendingUp,
      color: 'green',
      trend: 'up',
      description: 'Consistent income, predictable expenses. Very stable.',
      tips: [
        'Monthly income: €2,800',
        'Average expenses: €2,100',
        'Buffer: €700 (healthy)'
      ]
    }
  ];

  // Calculate overall score from factors
  const calculatedScore = Math.round(
    factors.reduce((sum, factor) => sum + (factor.score * factor.weight / 100), 0)
  );

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (score >= 60) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    return 'from-red-500/20 to-pink-500/20 border-red-500/30';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  return (
    <div className="space-y-6">
      
      {/* Main Score Card */}
      <div className={`bg-gradient-to-br ${getScoreBgColor(calculatedScore)} backdrop-blur-sm border rounded-2xl p-8`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Score Display */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-green-400" fill="currentColor" />
              <h1 className="text-3xl font-bold text-white">Financial Health Score</h1>
            </div>
            <p className="text-gray-400 mb-4">
              Your overall financial wellness at a glance
            </p>
            
            <div className="flex items-end gap-4">
              <div>
                <div className={`text-7xl font-bold ${getScoreColor(calculatedScore)}`}>
                  {calculatedScore}
                </div>
                <div className="text-sm text-gray-500 mt-1">out of 100</div>
              </div>
              
              <div className="mb-4">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  calculatedScore >= 80 
                    ? 'bg-green-500/20 text-green-400' 
                    : calculatedScore >= 60
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {calculatedScore >= 80 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-semibold">{getScoreLabel(calculatedScore)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Score Gauge */}
          <div className="relative">
            <svg className="w-48 h-48 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-gray-800"
              />
              {/* Progress circle */}
              <circle
                cx="96"
                cy="96"
                r="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 80}`}
                strokeDashoffset={`${2 * Math.PI * 80 * (1 - calculatedScore / 100)}`}
                className={calculatedScore >= 80 ? 'text-green-400' : calculatedScore >= 60 ? 'text-yellow-400' : 'text-red-400'}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className={`text-4xl font-bold ${getScoreColor(calculatedScore)}`}>
                  {calculatedScore}
                </div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Opportunity Alert */}
      {!impulseGuardEnabled && (
        <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-green-400 mb-1">Quick Win Available!</h3>
              <p className="text-sm text-green-200/80 mb-2">
                Enable Impulse Guard to boost your score by <span className="font-bold">17 points</span> instantly.
              </p>
              <button className="text-sm font-semibold text-green-400 hover:text-green-300 flex items-center gap-1">
                Go to Impulse Guard <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Factor Breakdown */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Score Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factors.map((factor) => {
            const Icon = factor.icon;
            const isSelected = selectedFactor === factor.id;
            
            return (
              <button
                key={factor.id}
                onClick={() => setSelectedFactor(isSelected ? null : factor.id)}
                className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-xl p-5 text-left transition-all hover:border-green-500/30 ${
                  isSelected ? 'border-green-500/50' : 'border-gray-700/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      factor.color === 'green' 
                        ? 'bg-green-500/20 text-green-400' 
                        : factor.color === 'yellow'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{factor.name}</div>
                      <div className="text-xs text-gray-500">{factor.weight}% weight</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      factor.score >= 80 ? 'text-green-400' : factor.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {factor.score}
                    </div>
                    {factor.trend === 'up' && (
                      <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
                    )}
                    {factor.trend === 'down' && (
                      <TrendingDown className="w-4 h-4 text-red-400 ml-auto" />
                    )}
                  </div>
                </div>

                {/* Score Bar */}
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`absolute h-full rounded-full transition-all ${
                      factor.score >= 80 ? 'bg-green-400' : factor.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>

                <p className="text-sm text-gray-400 mb-3">{factor.description}</p>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-gray-700/50 animate-slideIn">
                    {factor.tips && (
                      <div className="space-y-2">
                        {factor.tips.map((tip, idx) => (
                          <div key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
                            <span>{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {factor.actionable && (
                      <div className="mt-3 bg-green-900/20 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-green-400">{factor.action}</div>
                            <div className="text-xs text-green-300/70">Impact: {factor.impact}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-green-400" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* How to Improve Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Wins to Improve Your Score</h2>
        
        <div className="space-y-3">
          {!impulseGuardEnabled && (
            <div className="flex items-center justify-between p-4 bg-green-900/20 border border-green-500/20 rounded-lg hover:bg-green-900/30 transition-all cursor-pointer">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-semibold text-white">Enable Impulse Guard</div>
                  <div className="text-sm text-gray-400">Protect yourself from emotional spending</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-400">+17</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between p-4 bg-yellow-900/20 border border-yellow-500/20 rounded-lg hover:bg-yellow-900/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="font-semibold text-white">Increase Savings Rate</div>
                <div className="text-sm text-gray-400">Add €50/month to your goal</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-yellow-400">+12</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg hover:bg-blue-900/30 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-blue-400" />
              <div>
                <div className="font-semibold text-white">Optimize Spending Mix</div>
                <div className="text-sm text-gray-400">Reduce delivery by 30%</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-blue-400">+8</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Complete all 3 actions to reach a score of <span className="text-green-400 font-bold">95/100</span>
        </div>
      </div>

    </div>
  );
};

export default FinancialHealthScore;