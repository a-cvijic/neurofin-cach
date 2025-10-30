import React, { useState } from 'react';
import { TrendingUp, DollarSign, Award, ExternalLink, Zap, ShoppingBag, ArrowRight, Info, Sparkles } from 'lucide-react';

const ReferralFunnel = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  // Spending patterns detected by AI
  const spendingPatterns = [
    {
      id: 1,
      merchant: 'Amazon',
      category: 'Electronics & Shopping',
      monthlySpend: 680,
      trend: '+23%',
      emoji: '🛒',
      competitor: {
        name: 'AliExpress',
        savings: 102,
        bankFee: 20.40
      }
    },
    {
      id: 2,
      merchant: 'Uber Eats',
      category: 'Food Delivery',
      monthlySpend: 450,
      trend: '+12%',
      emoji: '🍔',
      competitor: {
        name: 'Wolt',
        savings: 90,
        bankFee: 22.50
      }
    },
    {
      id: 3,
      merchant: 'Spotify',
      category: 'Entertainment',
      monthlySpend: 140,
      trend: '0%',
      emoji: '🎵',
      competitor: {
        name: 'YouTube Premium',
        savings: 21,
        bankFee: 7.00
      }
    }
  ];

  const totalSavings = spendingPatterns.reduce((sum, p) => sum + p.competitor.savings, 0);
  const totalBankRevenue = spendingPatterns.reduce((sum, p) => sum + p.competitor.bankFee, 0);
  const annualSavings = totalSavings * 12;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
                Smart Referral Funnel
              </h1>
              <p className="text-emerald-400/70 text-lg mt-1">AI-powered spending optimization</p>
            </div>
          </div>
          
          {/* Explainer */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-emerald-400 font-semibold mb-1">How It Works</h3>
                <p className="text-emerald-400/70 text-sm">
                  SenseFin detects your spending patterns and finds better deals. When you switch, 
                  <span className="text-emerald-400 font-semibold"> you save money 💰</span>, 
                  <span className="text-emerald-400 font-semibold"> businesses gain customers 🏢</span>, and 
                  <span className="text-emerald-400 font-semibold"> your bank earns referral fees 🏦</span>. 
                  Everyone wins!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <span className="text-emerald-400/70 text-sm font-medium">Your Monthly Savings</span>
            </div>
            <p className="text-4xl font-black text-white group-hover:text-green-400 transition-colors">
              €{totalSavings}
            </p>
            <p className="text-green-400/70 text-sm mt-1">€{annualSavings}/year potential</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-teal-500/30 rounded-xl p-6 hover:border-teal-500/60 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-teal-400" />
              <span className="text-emerald-400/70 text-sm font-medium">Bank Revenue</span>
            </div>
            <p className="text-4xl font-black text-white group-hover:text-teal-400 transition-colors">
              €{totalBankRevenue.toFixed(2)}
            </p>
            <p className="text-teal-400/70 text-sm mt-1">Per customer per month</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition-all group">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-emerald-400" />
              <span className="text-emerald-400/70 text-sm font-medium">Opportunities</span>
            </div>
            <p className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">
              {spendingPatterns.length}
            </p>
            <p className="text-emerald-400/70 text-sm mt-1">Active patterns detected</p>
          </div>
        </div>

        {/* Patterns Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-emerald-400 flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6" />
            Detected Spending Patterns
          </h2>

          {spendingPatterns.map((pattern) => {
            const isSelected = selectedPattern === pattern.id;
            const savingsPercent = ((pattern.competitor.savings / pattern.monthlySpend) * 100).toFixed(0);
            
            return (
              <div
                key={pattern.id}
                onClick={() => setSelectedPattern(isSelected ? null : pattern.id)}
                className={`cursor-pointer bg-gradient-to-br from-slate-800/70 to-slate-900/70 border-2 ${
                  isSelected ? 'border-emerald-500' : 'border-emerald-500/30'
                } rounded-2xl p-6 transition-all hover:border-emerald-500 hover:scale-[1.01] hover:shadow-2xl`}
              >
                {/* Pattern Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{pattern.emoji}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{pattern.merchant}</h3>
                      <p className="text-emerald-400/70 text-sm">{pattern.category}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">€{pattern.monthlySpend}</div>
                    <div className="text-emerald-400/70 text-sm">per month</div>
                    {pattern.trend && (
                      <div className={`text-xs mt-1 ${pattern.trend.startsWith('+') ? 'text-orange-400' : 'text-emerald-400'}`}>
                        {pattern.trend} vs last month
                      </div>
                    )}
                  </div>
                </div>

                {/* Opportunity Card */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <span className="text-emerald-400 font-semibold">Better Deal Available!</span>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-sm font-bold">
                      Save {savingsPercent}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* You Save */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">💰</div>
                      <div className="text-2xl font-bold text-green-400">€{pattern.competitor.savings}</div>
                      <div className="text-green-400/70 text-xs mt-1">You save monthly</div>
                    </div>

                    {/* Business Gets */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">🏢</div>
                      <div className="text-2xl font-bold text-emerald-400">New Customer</div>
                      <div className="text-emerald-400/70 text-xs mt-1">€{pattern.monthlySpend}/mo revenue</div>
                    </div>

                    {/* Bank Earns */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                      <div className="text-2xl mb-1">🏦</div>
                      <div className="text-2xl font-bold text-teal-400">€{pattern.competitor.bankFee}</div>
                      <div className="text-teal-400/70 text-xs mt-1">Bank referral fee</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4">
                    <div>
                      <div className="text-white font-semibold mb-1">
                        Switch to {pattern.competitor.name}
                      </div>
                      <div className="text-emerald-400/70 text-sm">
                        Start saving €{pattern.competitor.savings} per month
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg">
                      Get Link
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="mt-4 pt-4 border-t border-emerald-500/20">
                    <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                      <ArrowRight className="w-4 h-4" />
                      How This Works
                    </h4>
                    <div className="space-y-2 text-emerald-400/70 text-sm">
                      <p>✓ Click "Get Link" to receive your personalized referral link</p>
                      <p>✓ Sign up on {pattern.competitor.name} and start saving immediately</p>
                      <p>✓ Your bank earns €{pattern.competitor.bankFee} monthly in referral fees</p>
                      <p>✓ You save €{pattern.competitor.savings * 12} per year on this category</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Triple Win Summary */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 border-2 border-emerald-500/50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
            The Triple-Win Model 🎯
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-6xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-white mb-2">Customers Win</h4>
              <p className="text-emerald-400/70">
                Save €{totalSavings}/month through smart spending optimization
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🏦</div>
              <h4 className="text-xl font-bold text-white mb-2">Banks Win</h4>
              <p className="text-emerald-400/70">
                Earn €{totalBankRevenue.toFixed(2)}/month in referral fees per customer
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h4 className="text-xl font-bold text-white mb-2">Businesses Win</h4>
              <p className="text-emerald-400/70">
                Acquire qualified customers with proven spending patterns
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReferralFunnel;