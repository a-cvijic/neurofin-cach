import React, { useState } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, Shield, Target, Zap, Award, Activity, ChevronRight, Info } from 'lucide-react';

const FinancialHealthScore = ({ data = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Default data if none provided
  const defaultData = [
    { subject: 'Savings', value: 90, fullMark: 100, description: 'Emergency fund and savings rate' },
    { subject: 'Spending', value: 78, fullMark: 100, description: 'Budget adherence and control' },
    { subject: 'Debt', value: 95, fullMark: 100, description: 'Debt-to-income ratio' },
    { subject: 'Investments', value: 72, fullMark: 100, description: 'Portfolio diversification' },
    { subject: 'Emergency', value: 80, fullMark: 100, description: 'Emergency fund coverage' },
    { subject: 'Goals', value: 75, fullMark: 100, description: 'Financial goal progress' }
  ];

  const healthData = data.length > 0 ? data : defaultData;

  // Calculate overall health score (0-100)
  const overallScore = Math.round(
    healthData.reduce((sum, item) => sum + item.value, 0) / healthData.length
  );

  // Determine score tier and styling
  const getScoreTier = (score) => {
    if (score >= 85) return { 
      tier: 'Excellent', 
      color: 'emerald', 
      bgGradient: 'from-emerald-500 to-green-600',
      textGradient: 'from-emerald-400 via-green-300 to-emerald-500',
      glow: 'shadow-emerald-500/50',
      emoji: '🌟'
    };
    if (score >= 70) return { 
      tier: 'Good', 
      color: 'green', 
      bgGradient: 'from-green-500 to-emerald-600',
      textGradient: 'from-green-400 via-emerald-300 to-green-500',
      glow: 'shadow-green-500/50',
      emoji: '✨'
    };
    if (score >= 50) return { 
      tier: 'Fair', 
      color: 'yellow', 
      bgGradient: 'from-yellow-500 to-orange-600',
      textGradient: 'from-yellow-400 via-orange-300 to-yellow-500',
      glow: 'shadow-yellow-500/50',
      emoji: '⚡'
    };
    return { 
      tier: 'Needs Work', 
      color: 'orange', 
      bgGradient: 'from-orange-500 to-red-600',
      textGradient: 'from-orange-400 via-red-300 to-orange-500',
      glow: 'shadow-orange-500/50',
      emoji: '🎯'
    };
  };

  const scoreTier = getScoreTier(overallScore);

  const getCategoryIcon = (category) => {
    const iconClass = `w-5 h-5 text-${scoreTier.color}-400`;
    switch(category.toLowerCase()) {
      case 'savings':
        return <Target className={iconClass} />;
      case 'spending':
        return <TrendingUp className={iconClass} />;
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
    if (score >= 70) return "Your finances are in solid shape. Focus on investment diversification and emergency fund optimization to reach excellent status.";
    if (score >= 50) return "You're on the right track with room for growth. Prioritize reducing debt and increasing your savings rate for better financial wellness.";
    return "Let's work together to strengthen your financial foundation. Start with budgeting and tracking your spending patterns consistently.";
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 -left-20 w-96 h-96 bg-${scoreTier.color}-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse`}></div>
        <div className={`absolute bottom-20 -right-20 w-96 h-96 bg-${scoreTier.color}-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse`} style={{ animationDelay: '2s' }}></div>
        <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse`} style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-5xl font-black bg-gradient-to-r ${scoreTier.textGradient} bg-clip-text text-transparent mb-2 animate-pulse`}>
            Financial Health Score
          </h1>
          <p className="text-emerald-400/70 text-lg">Real-time wellness analysis powered by SenseFin AI</p>
        </div>

        {/* Main Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Giant Score Display */}
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 -m-8">
              <div className={`absolute inset-0 bg-gradient-to-r ${scoreTier.bgGradient} blur-3xl opacity-20 animate-pulse`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${scoreTier.bgGradient} blur-2xl opacity-10 animate-ping`} style={{ animationDuration: '3s' }}></div>
            </div>

            {/* Card */}
            <div className={`relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-${scoreTier.color}-950/50 backdrop-blur-xl border-2 border-${scoreTier.color}-500/30 rounded-3xl p-8 shadow-2xl ${scoreTier.glow}`}>
              {/* Score Circle */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  {/* Rotating Rings */}
                  <div className="absolute inset-0 -m-12">
                    <div className={`absolute inset-0 border-4 border-${scoreTier.color}-500/20 rounded-full animate-spin`} style={{ animationDuration: '8s' }}></div>
                    <div className={`absolute inset-0 border-4 border-${scoreTier.color}-400/10 rounded-full animate-spin`} style={{ animationDuration: '12s', animationDirection: 'reverse' }}></div>
                  </div>

                  {/* Main Circle */}
                  <div className="relative">
                    <div className={`absolute inset-0 bg-gradient-to-br ${scoreTier.bgGradient} blur-2xl opacity-40 rounded-full animate-pulse`}></div>
                    <div className={`relative w-64 h-64 rounded-full bg-gradient-to-br from-slate-900 via-slate-800 to-${scoreTier.color}-950/50 border-4 border-${scoreTier.color}-500 flex flex-col items-center justify-center shadow-2xl`}>
                      <div className="text-center">
                        <div className={`text-8xl font-black bg-gradient-to-br ${scoreTier.textGradient} bg-clip-text text-transparent animate-pulse mb-2`}>
                          {overallScore}
                        </div>
                        <div className="text-emerald-400/70 text-lg font-medium">/ 100</div>
                        <div className={`text-${scoreTier.color}-400 text-2xl font-bold mt-3 animate-pulse flex items-center justify-center gap-2`}>
                          <span>{scoreTier.emoji}</span>
                          <span>{scoreTier.tier}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className={`text-3xl font-bold text-${scoreTier.color}-400`}>
                    {healthData.filter(d => d.value >= 80).length}
                  </div>
                  <div className="text-emerald-400/60 text-sm mt-1">Strong Areas</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold text-${scoreTier.color}-400`}>
                    {healthData.filter(d => d.value < 80 && d.value >= 60).length}
                  </div>
                  <div className="text-emerald-400/60 text-sm mt-1">Improving</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold text-${scoreTier.color}-400`}>
                    {healthData.filter(d => d.value < 60).length}
                  </div>
                  <div className="text-emerald-400/60 text-sm mt-1">Needs Focus</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Radar Chart */}
          <div className={`bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-2 border-emerald-500/30 rounded-3xl p-8 shadow-2xl`}>
            <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6" />
              Category Breakdown
            </h3>
            
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/5 blur-xl rounded-2xl"></div>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={healthData}>
                  <defs>
                    <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.3} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <PolarGrid 
                    stroke="#10b981" 
                    strokeOpacity={0.3}
                    strokeWidth={2}
                  />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: '#6ee7b7', fontSize: 14, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: '#6ee7b7', fontSize: 12 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#radarGradient)"
                    fillOpacity={0.7}
                    filter="url(#glow)"
                    animationDuration={1500}
                    animationBegin={0}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                } rounded-2xl p-6 hover:border-${categoryTier.color}-500 transition-all duration-300 group hover:scale-105 hover:shadow-2xl ${categoryTier.glow}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-${categoryTier.color}-500/20 rounded-xl group-hover:bg-${categoryTier.color}-500/30 transition-colors group-hover:scale-110 duration-300`}>
                      {getCategoryIcon(item.subject)}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                        {item.subject}
                      </h4>
                      {item.description && (
                        <p className="text-emerald-400/50 text-xs mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 text-${categoryTier.color}-400 transition-transform duration-300 ${isSelected ? 'rotate-90' : ''}`} />
                </div>

                <div className="flex items-baseline gap-3 mb-3">
                  <span className={`text-5xl font-black text-${categoryTier.color}-400 group-hover:text-${categoryTier.color}-300 transition-colors`}>
                    {categoryScore}
                  </span>
                  <span className="text-lg text-emerald-400/50">/100</span>
                  <span className="ml-auto text-sm font-semibold text-emerald-400/70">
                    {categoryTier.tier}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-slate-700/50 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`h-full bg-gradient-to-r ${categoryTier.bgGradient} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                    style={{ width: `${categoryScore}%` }}
                  ></div>
                </div>

                {/* Expanded Info */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-emerald-500/20 animate-fadeIn">
                    <p className="text-emerald-400/70 text-sm">
                      {categoryScore >= 85 && "Excellent performance in this category! Keep up the great work."}
                      {categoryScore >= 70 && categoryScore < 85 && "Good standing. Small improvements can push you to excellent."}
                      {categoryScore >= 50 && categoryScore < 70 && "This area needs attention. Consider focusing improvement efforts here."}
                      {categoryScore < 50 && "Priority area for improvement. Let's create an action plan."}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Insights Panel */}
        <div className={`bg-gradient-to-r from-${scoreTier.color}-500/10 via-emerald-500/10 to-${scoreTier.color}-500/10 border-2 border-${scoreTier.color}-500/30 rounded-2xl p-6 shadow-xl`}>
          <div className="flex items-start gap-4">
            <div className={`p-3 bg-${scoreTier.color}-500/20 rounded-xl`}>
              <Zap className={`w-7 h-7 text-${scoreTier.color}-400 animate-pulse`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                AI-Powered Insight
                <Info className="w-4 h-4 text-emerald-400/50" />
              </h3>
              <p className="text-emerald-400/80 text-base leading-relaxed">
                {getAIInsight(overallScore)}
              </p>
              
              {/* Action Suggestions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {overallScore < 85 && (
                  <>
                    <button className={`px-4 py-2 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105`}>
                      📊 View Detailed Report
                    </button>
                    <button className={`px-4 py-2 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105`}>
                      🎯 Create Action Plan
                    </button>
                    <button className={`px-4 py-2 bg-${scoreTier.color}-500/20 hover:bg-${scoreTier.color}-500/30 border border-${scoreTier.color}-500/50 rounded-lg text-${scoreTier.color}-400 text-sm font-semibold transition-all duration-300 hover:scale-105`}>
                      💡 Get Recommendations
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthScore;