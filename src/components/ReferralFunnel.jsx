import React, { useState } from 'react';
import { TrendingUp, DollarSign, Award, ExternalLink, Zap, ShoppingBag, ArrowRight, Info, Sparkles, Shield, Users, CheckCircle, Star, TrendingDown } from 'lucide-react';

const ReferralFunnel = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  // Spending patterns detected by AI with enhanced trust metrics
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
        bankFee: 20.40,
        rating: 4.6,
        users: '250M+',
        verified: true
      },
      roi: '15%',
      confidence: 94
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
        bankFee: 22.50,
        rating: 4.7,
        users: '50M+',
        verified: true
      },
      roi: '20%',
      confidence: 91
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
        bankFee: 7.00,
        rating: 4.5,
        users: '100M+',
        verified: true
      },
      roi: '15%',
      confidence: 88
    }
  ];

  const totalSavings = spendingPatterns.reduce((sum, p) => sum + p.competitor.savings, 0);
  const totalBankRevenue = spendingPatterns.reduce((sum, p) => sum + p.competitor.bankFee, 0);
  const annualSavings = totalSavings * 12;

  // Trust indicators
  const trustMetrics = {
    totalUsers: '15,000+',
    avgSavings: '€2,556',
    successRate: '96%',
    partnerships: '120+'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with Trust Badge */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
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
            
            {/* Trust Badge */}
            <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl px-6 py-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <div>
                <div className="text-emerald-400 font-bold text-sm">Bank-Verified Partners</div>
                <div className="text-emerald-400/70 text-xs">100% secure & trusted</div>
              </div>
            </div>
          </div>
          
          {/* Explainer */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-emerald-400 font-semibold mb-1">How It Works</h3>
                <p className="text-emerald-400/70 text-sm">
                  SenseFin AI analyzes your spending patterns and identifies better alternatives. When you switch using our verified partners,
                  <span className="text-emerald-400 font-semibold"> you save money 💰</span>, 
                  <span className="text-emerald-400 font-semibold"> businesses gain loyal customers 🏢</span>, and 
                  <span className="text-emerald-400 font-semibold"> your bank earns sustainable referral fees 🏦</span>. 
                  A win-win-win for everyone!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Metrics Banner */}
        <div className="mb-8 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-blue-500/30 rounded-2xl p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <div className="text-3xl font-black text-white">{trustMetrics.totalUsers}</div>
              </div>
              <div className="text-blue-400/70 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <div className="text-3xl font-black text-white">{trustMetrics.avgSavings}</div>
              </div>
              <div className="text-green-400/70 text-sm">Avg. Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <div className="text-3xl font-black text-white">{trustMetrics.successRate}</div>
              </div>
              <div className="text-emerald-400/70 text-sm">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Award className="w-5 h-5 text-purple-400" />
                <div className="text-3xl font-black text-white">{trustMetrics.partnerships}</div>
              </div>
              <div className="text-purple-400/70 text-sm">Verified Partners</div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-green-500/30 rounded-xl p-6 hover:border-green-500/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-emerald-400/70 text-sm font-medium">Your Monthly Savings</span>
              </div>
              <p className="text-4xl font-black text-white group-hover:text-green-400 transition-colors">
                €{totalSavings}
              </p>
              <p className="text-green-400/70 text-sm mt-1">€{annualSavings}/year potential</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                <TrendingDown className="w-3 h-3" />
                <span>21% reduction in expenses</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-teal-500/30 rounded-xl p-6 hover:border-teal-500/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-teal-400" />
                <span className="text-emerald-400/70 text-sm font-medium">Bank Revenue</span>
              </div>
              <p className="text-4xl font-black text-white group-hover:text-teal-400 transition-colors">
                €{totalBankRevenue.toFixed(2)}
              </p>
              <p className="text-teal-400/70 text-sm mt-1">Per customer per month</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-teal-400">
                <TrendingUp className="w-3 h-3" />
                <span>Recurring monthly income</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 border border-emerald-500/30 rounded-xl p-6 hover:border-emerald-500/60 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-emerald-400" />
                <span className="text-emerald-400/70 text-sm font-medium">Opportunities</span>
              </div>
              <p className="text-4xl font-black text-white group-hover:text-emerald-400 transition-colors">
                {spendingPatterns.length}
              </p>
              <p className="text-emerald-400/70 text-sm mt-1">Active patterns detected</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
                <Zap className="w-3 h-3" />
                <span>AI-powered recommendations</span>
              </div>
            </div>
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
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < Math.floor(pattern.competitor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{pattern.competitor.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-400">€{pattern.monthlySpend}</div>
                    <div className="text-emerald-400/70 text-sm">per month</div>
                    {pattern.trend && (
                      <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${pattern.trend.startsWith('+') ? 'text-orange-400' : 'text-emerald-400'}`}>
                        <TrendingUp className="w-3 h-3" />
                        {pattern.trend} vs last month
                      </div>
                    )}
                    {/* Confidence Badge */}
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 rounded-full">
                      <Shield className="w-3 h-3 text-blue-400" />
                      <span className="text-xs text-blue-400 font-semibold">{pattern.confidence}% match</span>
                    </div>
                  </div>
                </div>

                {/* Opportunity Card */}
                <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
                      <span className="text-emerald-400 font-semibold">Verified Better Alternative!</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-sm font-bold">
                        Save {savingsPercent}%
                      </span>
                      {pattern.competitor.verified && (
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                  </div>

                  {/* Partner Info Bar */}
                  <div className="mb-4 flex items-center justify-between bg-slate-800/50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏢</div>
                      <div>
                        <div className="text-white font-semibold">{pattern.competitor.name}</div>
                        <div className="text-emerald-400/70 text-xs flex items-center gap-2">
                          <Users className="w-3 h-3" />
                          {pattern.competitor.users} active users
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-400 text-sm font-semibold">{pattern.roi} ROI</div>
                      <div className="text-emerald-400/70 text-xs">for you</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {/* You Save */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-green-500/20">
                      <div className="text-2xl mb-1">💰</div>
                      <div className="text-2xl font-bold text-green-400">€{pattern.competitor.savings}</div>
                      <div className="text-green-400/70 text-xs mt-1">You save monthly</div>
                      <div className="text-green-400 text-xs mt-2 font-semibold">
                        €{pattern.competitor.savings * 12}/year
                      </div>
                    </div>

                    {/* Business Gets */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-emerald-500/20">
                      <div className="text-2xl mb-1">🏢</div>
                      <div className="text-2xl font-bold text-emerald-400">Quality Lead</div>
                      <div className="text-emerald-400/70 text-xs mt-1">€{pattern.monthlySpend}/mo LTV</div>
                      <div className="text-emerald-400 text-xs mt-2 font-semibold">
                        Verified spending power
                      </div>
                    </div>

                    {/* Bank Earns */}
                    <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-teal-500/20">
                      <div className="text-2xl mb-1">🏦</div>
                      <div className="text-2xl font-bold text-teal-400">€{pattern.competitor.bankFee}</div>
                      <div className="text-teal-400/70 text-xs mt-1">Bank commission</div>
                      <div className="text-teal-400 text-xs mt-2 font-semibold">
                        Recurring monthly
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between bg-slate-800/50 rounded-lg p-4 border border-emerald-500/20">
                    <div>
                      <div className="text-white font-semibold mb-1 flex items-center gap-2">
                        Switch to {pattern.competitor.name}
                        {pattern.competitor.verified && (
                          <span className="px-2 py-0.5 bg-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold">
                            VERIFIED
                          </span>
                        )}
                      </div>
                      <div className="text-emerald-400/70 text-sm">
                        Start saving €{pattern.competitor.savings} per month instantly
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 rounded-xl text-white font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg shadow-emerald-500/50">
                      Get Offer
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2 text-emerald-400/70 text-sm">
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          Click "Get Offer" for your personalized secure link
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          Sign up on {pattern.competitor.name} (bank-verified partner)
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          Start saving immediately with better rates
                        </p>
                      </div>
                      <div className="space-y-2 text-emerald-400/70 text-sm">
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                          Your bank earns €{pattern.competitor.bankFee} monthly commission
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          Track your cumulative savings in real-time
                        </p>
                        <p className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                          Cancel anytime - no long-term commitment
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Triple Win Summary */}
        <div className="mt-8 bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-teal-500/20 border-2 border-emerald-500/50 rounded-2xl p-8">
          <h3 className="text-3xl font-bold text-emerald-400 mb-2 text-center">
            The Triple-Win Model 🎯
          </h3>
          <p className="text-center text-emerald-400/70 mb-6 max-w-3xl mx-auto">
            Built on transparency and mutual benefit. Every recommendation is AI-verified and partner-approved.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-green-500/20">
              <div className="text-6xl mb-4">💰</div>
              <h4 className="text-xl font-bold text-white mb-2">Customers Win</h4>
              <p className="text-emerald-400/70 mb-3">
                Save €{totalSavings}/month through smart, AI-verified alternatives
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 rounded-full">
                <TrendingDown className="w-3 h-3 text-green-400" />
                <span className="text-green-400 text-xs font-semibold">Average 21% reduction</span>
              </div>
            </div>
            
            <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-teal-500/20">
              <div className="text-6xl mb-4">🏦</div>
              <h4 className="text-xl font-bold text-white mb-2">Banks Win</h4>
              <p className="text-emerald-400/70 mb-3">
                Earn €{totalBankRevenue.toFixed(2)}/month in sustainable commissions per customer
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-teal-500/20 rounded-full">
                <TrendingUp className="w-3 h-3 text-teal-400" />
                <span className="text-teal-400 text-xs font-semibold">Recurring revenue stream</span>
              </div>
            </div>
            
            <div className="text-center bg-slate-900/50 rounded-xl p-6 border border-emerald-500/20">
              <div className="text-6xl mb-4">🏢</div>
              <h4 className="text-xl font-bold text-white mb-2">Businesses Win</h4>
              <p className="text-emerald-400/70 mb-3">
                Acquire high-quality customers with verified spending patterns
              </p>
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 rounded-full">
                <Users className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-semibold">Pre-qualified leads</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div>
                <div className="text-white font-bold">Bank-Grade Security</div>
                <div className="text-blue-400/70 text-sm">All partners verified & trusted by leading financial institutions</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">SSL Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-gray-400">ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReferralFunnel;