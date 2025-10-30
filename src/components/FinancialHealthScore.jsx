import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { TrendingUp, Shield, Target, Zap, Award, Activity, ChevronRight, Info, TrendingDown, DollarSign, Sparkles } from 'lucide-react';

const FinancialHealthScore = ({ categoryData = [], totalSpent = 0, savingGoal = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Calculate dynamic health metrics based on real data
  const calculateHealthData = () => {
    // Savings Score - based on saving goal progress
    const savingsProgress = savingGoal.current && savingGoal.target 
      ? (savingGoal.current / savingGoal.target) * 100 
      : 0;
    const savingsScore = Math.min(100, Math.round(savingsProgress * 0.9 + 10));

    // Spending Score - based on spending patterns (lower is better for non-essentials)
    const foodDelivery = categoryData.find(c => c.name === 'Food Delivery')?.value || 0;
    const shopping = categoryData.find(c => c.name === 'Shopping')?.value || 0;
    const discretionarySpending = foodDelivery + shopping;
    const spendingRatio = totalSpent > 0 ? (discretionarySpending / totalSpent) * 100 : 50;
    const spendingScore = Math.max(40, Math.min(100, Math.round(100 - (spendingRatio * 0.8))));

    // Debt Score - assume good since no debt data (mock as excellent)
    const debtScore = 95;

    // Investment Score - based on consistent savings behavior
    const investmentScore = savingsProgress > 50 ? 82 : 65;

    // Emergency Fund Score - based on savings accumulated
    const emergencyScore = savingGoal.current > 100 ? 88 : 65;

    // Goals Score - progress toward financial goals
    const goalsScore = Math.min(100, Math.round(savingsProgress * 0.85 + 15));

    return [
      { subject: 'Savings', value: savingsScore, fullMark: 100, description: 'Emergency fund and savings rate', icon: 'savings', trend: '+5' },
      { subject: 'Spending', value: spendingScore, fullMark: 100, description: 'Budget adherence and control', icon: 'spending', trend: '+8' },
      { subject: 'Debt', value: debtScore, fullMark: 100, description: 'Debt-to-income ratio', icon: 'debt', trend: '0' },
      { subject: 'Investments', value: investmentScore, fullMark: 100, description: 'Portfolio diversification', icon: 'investments', trend: '+3' },
      { subject: 'Emergency', value: emergencyScore, fullMark: 100, description: 'Emergency fund coverage', icon: 'emergency', trend: '+2' },
      { subject: 'Goals', value: goalsScore, fullMark: 100, description: 'Financial goal progress', icon: 'goals', trend: '+12' }
    ];
  };

  const healthData = calculateHealthData();

  // Calculate overall health score (0-100)
  const overallScore = Math.round(
    healthData.reduce((sum, item) => sum + item.value, 0) / healthData.length
  );

  // Previous score for comparison (mock)
  const previousScore = overallScore - 3;
  const scoreChange = overallScore - previousScore;

  // Historical data for trend
  const trendData = [
    { month: 'Jul', score: overallScore - 15 },
    { month: 'Aug', score: overallScore - 10 },
    { month: 'Sep', score: overallScore - 5 },
    { month: 'Oct', score: overallScore }
  ];

  // Determine score tier and styling
  const getScoreTier = (score) => {
    if (score >= 85) return { 
      tier: 'Excellent', 
      color: 'emerald', 
      bgGradient: 'from-emerald-500 to-green-600',
      textGradient: 'from-emerald-400 via-green-300 to-emerald-500',
      glow: 'shadow-emerald-500/50',
      emoji: '🌟',
      message: 'Outstanding!'
    };
    if (score >= 70) return { 
      tier: 'Good', 
      color: 'green', 
      bgGradient: 'from-green-500 to-emerald-600',
      textGradient: 'from-green-400 via-emerald-300 to-green-500',
      glow: 'shadow-green-500/50',
      emoji: '✨',
      message: 'Doing Great!'
    };
    if (score >= 50) return { 
      tier: 'Fair', 
      color: 'yellow', 
      bgGradient: 'from-yellow-500 to-orange-600',
      textGradient: 'from-yellow-400 via-orange-300 to-yellow-500',
      glow: 'shadow-yellow-500/50',
      emoji: '⚡',
      message: 'Keep Going!'
    };
    return { 
      tier: 'Needs Work', 
      color: 'orange', 
      bgGradient: 'from-orange-500 to-red-600',
      textGradient: 'from-orange-400 via-red-300 to-orange-500',
      glow: 'shadow-orange-500/50',
      emoji: '🎯',
      message: 'Let\'s Improve!'
    };
  };

  const scoreTier = getScoreTier(overallScore);

  const getCategoryIcon = (category) => {
    const iconClass = `w-5 h-5 text-${scoreTier.color}-400`;
    switch(category.toLowerCase()) {
      case 'savings':
        return <Target className={iconClass} />;
      case 'spending':
        return <TrendingDown className={iconClass} />;
      case 'debt':
        return <Shield className={iconClass} />;
      case 'investments':
        return <Award className={iconClass} />;
      case 'emergency':
        return <Shield className={iconClass} />;
      case 'goals':
        return <Target className={iconClass} />;
      default:
        return <Activity className={iconClass} />;
    }
  };

  const getAIInsight = (score) => {
    if (score >= 85) return "Outstanding financial health! Your disciplined approach to savings and spending is paying off. Keep maintaining this excellence.";
    if (score >= 70) return "Your finances are in solid shape. Focus on reducing discretionary spending and increasing your savings rate to reach excellent status.";
    if (score >= 50) return "You're on the right track with room for growth. Consider cooking at home more to reduce food delivery costs and boost your savings.";
    return "Let's work together to strengthen your financial foundation. Start by setting a realistic monthly savings goal and tracking your spending patterns.";
  };

  const getPersonalizedInsights = () => {
    const insights = [];
    
    // Food delivery insight
    const foodDelivery = categoryData.find(c => c.name === 'Food Delivery')?.value || 0;
    if (foodDelivery > 100) {
      insights.push({
        icon: '🍕',
        title: 'Food Delivery Alert',
        message: `Spending €${foodDelivery.toFixed(0)}/month on delivery`,
        action: `Save €${(foodDelivery * 0.6).toFixed(0)}/month by cooking at home`,
        color: 'from-orange-500 to-red-500'
      });
    }

    // Savings insight
    if (savingGoal.current && savingGoal.target) {
      const remaining = savingGoal.target - savingGoal.current;
      if (remaining > 0) {
        insights.push({
          icon: '💰',
          title: 'Savings Goal',
          message: `${((savingGoal.current/savingGoal.target)*100).toFixed(0)}% complete`,
          action: `Just €${remaining} away from your target!`,
          color: 'from-green-500 to-emerald-500'
        });
      } else {
        insights.push({
          icon: '🎯',
          title: 'Goal Achieved',
          message: `Monthly savings target reached!`,
          action: `Consider increasing your goal next month`,
          color: 'from-emerald-500 to-green-500'
        });
      }
    }

    // Shopping insight
    const shopping = categoryData.find(c => c.name === 'Shopping')?.value || 0;
    if (shopping > 200) {
      insights.push({
        icon: '🛍️',
        title: 'Shopping Expenses',
        message: `€${shopping.toFixed(0)} spent this month`,
        action: `Try a 30-day delay rule for non-essentials`,
        color: 'from-purple-500 to-pink-500'
      });
    }

    return insights;
  };

  const personalizedInsights = getPersonalizedInsights();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-96 h-96 bg-${scoreTier.color}-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse`}></div>
        <div className={`absolute bottom-20 -right-20 w-96 h-96 bg-${scoreTier.color}-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse`} style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-5xl font-black bg-gradient-to-r ${scoreTier.textGradient} bg-clip-text text-transparent mb-2`}>
            Financial Health Score
          </h1>
          <p className="text-emerald-400/70 text-lg">Real-time wellness analysis powered by SenseFin AI</p>
        </div>

        {/* Main Score Display - Enhanced Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Center: Giant Score */}
          <div className="lg:col-span-1 relative">
            <div className="absolute inset-0 -m-8">
              <div className={`absolute inset-0 bg-gradient-to-r ${scoreTier.bgGradient} blur-3xl opacity-20 animate-pulse`}></div>
            </div>

            <div className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-${scoreTier.color}-950/50 backdrop-blur-xl border-2 border-${scoreTier.color}-500/30 rounded-3xl p-8 shadow-2xl ${scoreTier.glow}`}>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className={`relative w-56 h-56 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-${scoreTier.color}-950/50 border-4 border-${scoreTier.color}-500 flex flex-col items-center justify-center shadow-2xl`}>
                    <div className="text-center">
                      <div className={`text-7xl font-black bg-gradient-to-br ${scoreTier.textGradient} bg-clip-text text-transparent mb-1`}>
                        {overallScore}
                      </div>
                      <div className="text-emerald-400/70 text-sm font-medium">/ 100</div>
                      <div className={`text-${scoreTier.color}-400 text-xl font-bold mt-2 animate-pulse flex items-center justify-center gap-2`}>
                        <span>{scoreTier.emoji}</span>
                        <span>{scoreTier.tier}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Change Indicator */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm">
                {scoreChange >= 0 ? (
                  <>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold">+{scoreChange} points this month</span>
                  </>
                ) : (
                  <>
                    <TrendingDown className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-semibold">{scoreChange} points this month</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: Radar Chart & Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Radar Chart */}
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/80 backdrop-blur-xl border-2 border-emerald-500/30 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Category Breakdown
              </h3>
              
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={healthData}>
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.3} />
                    </linearGradient>
                  </defs>
                  <PolarGrid stroke="#10b981" strokeOpacity={0.3} strokeWidth={2} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#6ee7b7', fontSize: 13, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6ee7b7', fontSize: 11 }} />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#radarGradient)"
                    fillOpacity={0.7}
                    animationDuration={1500}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Score Trend Chart */}
            <div className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/80 backdrop-blur-xl border-2 border-blue-500/30 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Score Trend
              </h3>
              
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={trendData}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis domain={[0, 100]} stroke="#6b7280" />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px' }}
                    labelStyle={{ color: '#10b981' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="url(#lineGradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats Banner */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {healthData.filter(d => d.value >= 80).length}
            </div>
            <div className="text-emerald-400/70 text-sm">Strong Areas</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">
              {healthData.filter(d => d.value >= 60 && d.value < 80).length}
            </div>
            <div className="text-yellow-400/70 text-sm">Improving</div>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">
              {healthData.filter(d => d.value < 60).length}
            </div>
            <div className="text-red-400/70 text-sm">Needs Focus</div>
          </div>
        </div>

        {/* Personalized Insights */}
        {personalizedInsights.length > 0 && (
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              AI Insights for You
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personalizedInsights.map((insight, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${insight.color} bg-opacity-10 border-2 border-opacity-30 rounded-2xl p-5 relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 text-6xl opacity-10">{insight.icon}</div>
                  <div className="relative">
                    <div className="text-3xl mb-3">{insight.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-2">{insight.title}</h4>
                    <p className="text-emerald-400/80 text-sm mb-2">{insight.message}</p>
                    <p className="text-emerald-300 text-sm font-semibold">{insight.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Cards Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-emerald-400 mb-4">Detailed Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthData.map((item, index) => {
              const categoryScore = item.value;
              const categoryTier = getScoreTier(categoryScore);
              const isSelected = selectedCategory === item.subject;
              
              return (
                <div 
                  key={index}
                  onClick={() => setSelectedCategory(isSelected ? null : item.subject)}
                  className={`cursor-pointer bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-2 ${
                    isSelected ? `border-${categoryTier.color}-500` : `border-${categoryTier.color}-500/30`
                  } rounded-2xl p-5 hover:border-${categoryTier.color}-500 transition-all duration-300 group hover:scale-105 hover:shadow-2xl ${categoryTier.glow}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 bg-${categoryTier.color}-500/20 rounded-xl group-hover:bg-${categoryTier.color}-500/30 transition-colors`}>
                        {getCategoryIcon(item.subject)}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                          {item.subject}
                        </h4>
                        {item.description && (
                          <p className="text-emerald-400/50 text-xs mt-0.5">{item.description}</p>
                        )}
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-${categoryTier.color}-400 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                  </div>

                  <div className="flex items-baseline gap-2 mb-3">
                    <span className={`text-4xl font-black text-${categoryTier.color}-400 group-hover:text-${categoryTier.color}-300 transition-colors`}>
                      {categoryScore}
                    </span>
                    <span className="text-sm text-emerald-400/50">/100</span>
                    <span className="ml-auto text-xs font-semibold text-emerald-400/70 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.trend}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full bg-gradient-to-r ${categoryTier.bgGradient} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${categoryScore}%` }}
                    ></div>
                  </div>

                  <div className="text-xs text-emerald-400/70 font-semibold">{categoryTier.tier}</div>

                  {/* Expanded Info */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-emerald-500/20">
                      <p className="text-emerald-400/70 text-sm">
                        {categoryScore >= 85 && "Excellent performance! Keep up the great work."}
                        {categoryScore >= 70 && categoryScore < 85 && "Good standing. Small improvements can push you higher."}
                        {categoryScore >= 50 && categoryScore < 70 && "This area needs attention. Focus here for better results."}
                        {categoryScore < 50 && "Priority area. Let's create an action plan."}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendation Panel */}
        <div className={`bg-gradient-to-r from-${scoreTier.color}-500/10 via-emerald-500/10 to-${scoreTier.color}-500/10 border-2 border-${scoreTier.color}-500/30 rounded-2xl p-6 shadow-xl`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 bg-${scoreTier.color}-500/20 rounded-xl`}>
              <Zap className={`w-7 h-7 text-${scoreTier.color}-400 animate-pulse`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                {scoreTier.message} Your AI Health Assessment
                <Info className="w-4 h-4 text-emerald-400/50" />
              </h3>
              <p className="text-emerald-400/80 text-base leading-relaxed mb-4">
                {getAIInsight(overallScore)}
              </p>
              
              {/* Action Buttons */}
              {overallScore < 85 && (
                <div className="flex flex-wrap gap-3">
                  <button className={`px-5 py-2.5 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                    <DollarSign className="w-4 h-4" />
                    View Savings Plan
                  </button>
                  <button className={`px-5 py-2.5 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                    <Target className="w-4 h-4" />
                    Set New Goals
                  </button>
                  <button className={`px-5 py-2.5 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2`}>
                    <Sparkles className="w-4 h-4" />
                    Get Tips
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;