import React from 'react';
import { Shield, TrendingUp, Zap, Activity, Clock, AlertCircle } from 'lucide-react';

const ImpulseGuardTab = ({ stats, isEnabled, onToggle }) => {
  // Mock purchase scenarios for demo
  const mockPurchases = [
    { merchant: 'Amazon', amount: 87, emoji: '📦', category: 'Shopping' },
    { merchant: 'Uber Eats', amount: 45, emoji: '🍔', category: 'Food Delivery' },
    { merchant: 'Nike Store', amount: 150, emoji: '👟', category: 'Shopping' },
    { merchant: 'Spotify', amount: 15, emoji: '🎵', category: 'Subscriptions' },
  ];

  const triggerDemo = (purchase) => {
    if (!isEnabled) return;
    if (window.triggerImpulseGuard) {
      window.triggerImpulseGuard(purchase.amount, purchase.merchant);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section with Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              Impulse Guard
            </h1>
          </div>
          <p className="text-gray-400 max-w-2xl">
            Your intelligent guardian against emotional spending. We monitor your biometrics to prevent impulse purchases.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex-shrink-0 ml-6">
          <button
            onClick={() => onToggle(!isEnabled)}
            className={`relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
              isEnabled
                ? 'bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-2 border-green-500/30 text-green-400'
                : 'bg-gray-800/50 border-2 border-gray-700/50 text-gray-500'
            }`}
          >
            <div className="relative">
              <div className={`w-12 h-6 rounded-full transition-colors ${
                isEnabled ? 'bg-green-600' : 'bg-gray-600'
              }`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </div>
            </div>
            <span className="font-semibold">
              {isEnabled ? 'Protection ON' : 'Protection OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* Warning when disabled */}
      {!isEnabled && (
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-400 mb-1">Protection Disabled</h3>
              <p className="text-sm text-yellow-200/80">
                Impulse Guard is currently off. Your purchases won't be monitored for emotional spending patterns.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Saved This Month */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
          isEnabled ? 'border-green-500/20 hover:border-green-500/40' : 'border-gray-700/30 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Saved This Month</span>
            <Shield className={`w-5 h-5 ${isEnabled ? 'text-green-400' : 'text-gray-500'}`} />
          </div>
          <div className={`text-3xl font-bold mb-1 ${isEnabled ? 'text-green-400' : 'text-gray-500'}`}>
            €{stats.saved}
          </div>
          <div className="text-xs text-gray-500">
            {isEnabled ? '↑ 23% from last month' : 'Enable to track savings'}
          </div>
        </div>

        {/* Purchases Prevented */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
          isEnabled ? 'border-blue-500/20 hover:border-blue-500/40' : 'border-gray-700/30 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Purchases Prevented</span>
            <Zap className={`w-5 h-5 ${isEnabled ? 'text-blue-400' : 'text-gray-500'}`} />
          </div>
          <div className={`text-3xl font-bold mb-1 ${isEnabled ? 'text-blue-400' : 'text-gray-500'}`}>
            {stats.prevented}
          </div>
          <div className="text-xs text-gray-500">
            {isEnabled ? '87% intervention success' : 'Enable to prevent impulse buys'}
          </div>
        </div>

        {/* Current Streak */}
        <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all ${
          isEnabled ? 'border-purple-500/20 hover:border-purple-500/40' : 'border-gray-700/30 opacity-60'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-400 text-sm">Current Streak</span>
            <TrendingUp className={`w-5 h-5 ${isEnabled ? 'text-purple-400' : 'text-gray-500'}`} />
          </div>
          <div className={`text-3xl font-bold mb-1 ${isEnabled ? 'text-purple-400' : 'text-gray-500'}`}>
            {stats.currentStreak} days
          </div>
          <div className="text-xs text-gray-500">
            {isEnabled ? 'No emotional purchases!' : 'Enable to build streaks'}
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Try It Out</h2>
            <p className="text-gray-400 text-sm">
              {isEnabled 
                ? 'Click any purchase to see Impulse Guard in action' 
                : 'Enable protection to test the intervention flow'
              }
            </p>
          </div>
          <Activity className={`w-6 h-6 ${isEnabled ? 'text-green-400 animate-pulse' : 'text-gray-600'}`} />
        </div>

        {/* Mock Purchase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockPurchases.map((purchase, index) => (
            <button
              key={index}
              onClick={() => triggerDemo(purchase)}
              disabled={!isEnabled}
              className={`group relative p-5 rounded-xl border text-left overflow-hidden transition-all ${
                isEnabled
                  ? 'border-gray-700/50 bg-gradient-to-br from-gray-800/30 to-gray-900/30 hover:from-gray-700/50 hover:to-gray-800/50 hover:border-green-500/30 cursor-pointer'
                  : 'border-gray-800/50 bg-gray-900/20 opacity-50 cursor-not-allowed'
              }`}
            >
              {/* Hover glow effect */}
              {isEnabled && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/5 transition-all" />
              )}
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{purchase.emoji}</span>
                  <Clock className={`w-4 h-4 transition-colors ${
                    isEnabled ? 'text-gray-600 group-hover:text-green-400' : 'text-gray-700'
                  }`} />
                </div>
                <div className={`font-semibold mb-1 transition-colors ${
                  isEnabled ? 'text-white group-hover:text-green-400' : 'text-gray-600'
                }`}>
                  {purchase.merchant}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-2xl font-bold ${
                    isEnabled ? 'text-green-400' : 'text-gray-600'
                  }`}>
                    €{purchase.amount}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    isEnabled ? 'text-gray-400 bg-gray-800/50' : 'text-gray-600 bg-gray-800/30'
                  }`}>
                    {purchase.category}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-xl mb-4 border border-red-500/30">
              <Activity className="w-7 h-7 text-red-400" />
            </div>
            <h3 className="font-bold text-white mb-2">1. Detection</h3>
            <p className="text-sm text-gray-400">
              Monitors heart rate, time of day, and purchase patterns to detect emotional spending
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl mb-4 border border-yellow-500/30">
              <Shield className="w-7 h-7 text-yellow-400" />
            </div>
            <h3 className="font-bold text-white mb-2">2. Intervention</h3>
            <p className="text-sm text-gray-400">
              Gently blocks the purchase and asks you to reflect on your decision
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl mb-4 border border-green-500/30">
              <TrendingUp className="w-7 h-7 text-green-400" />
            </div>
            <h3 className="font-bold text-white mb-2">3. Learning</h3>
            <p className="text-sm text-gray-400">
              Learns your patterns over time and helps you build better spending habits
            </p>
          </div>
        </div>
      </div>

      {/* Integration Info */}
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20 rounded-2xl p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Activity className="w-6 h-6 text-green-400 mt-1" />
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-white mb-2">🔗 Integration Ready</h3>
            <p className="text-sm text-gray-400 mb-3">
              Works with Apple Watch, Fitbit, and phone sensors. Integrates seamlessly with any payment flow.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Apple Health', 'Google Fit', 'Fitbit', 'Stripe', 'Plaid'].map((integration) => (
                <span 
                  key={integration}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-700/50 rounded-full text-xs font-medium text-gray-300"
                >
                  {integration}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpulseGuardTab;