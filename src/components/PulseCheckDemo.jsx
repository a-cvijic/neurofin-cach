import React, { useState } from 'react';
import PulseCheck from './PulseCheck';
import { ShoppingBag, Heart, TrendingUp, Shield, Zap } from 'lucide-react';

const PulseCheckDemo = () => {
  const [isPulseCheckEnabled, setIsPulseCheckEnabled] = useState(true);
  const [stats, setStats] = useState({
    saved: 340,
    prevented: 7,
    currentStreak: 12
  });

  // Mock purchase scenarios for demo
  const mockPurchases = [
    { merchant: 'Amazon', amount: 87, emoji: '📦' },
    { merchant: 'Uber Eats', amount: 45, emoji: '🍔' },
    { merchant: 'Nike Store', amount: 150, emoji: '👟' },
    { merchant: 'Spotify Premium', amount: 15, emoji: '🎵' },
  ];

  const handleComplete = (action, amount) => {
    if (action === 'saved') {
      setStats({
        ...stats,
        saved: stats.saved + amount,
        prevented: stats.prevented + 1
      });
    }
  };

  const triggerDemo = (purchase) => {
    if (window.triggerPulseCheck) {
      window.triggerPulseCheck(purchase.amount, purchase.merchant);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4">
            <Heart className="w-12 h-12 text-red-500" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Pulse Check
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your financial app that knows when you're about to make an emotional purchase
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Saved This Month</span>
              <Shield className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">${stats.saved}</div>
            <div className="text-sm text-gray-500 mt-1">↑ 23% from last month</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Purchases Prevented</span>
              <Zap className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-blue-600">{stats.prevented}</div>
            <div className="text-sm text-gray-500 mt-1">87% intervention success</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Current Streak</span>
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-purple-600">{stats.currentStreak} days</div>
            <div className="text-sm text-gray-500 mt-1">No emotional purchases!</div>
          </div>
        </div>

        {/* Demo Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Try It Out</h2>
              <p className="text-gray-600">Click any purchase to see Pulse Check in action</p>
            </div>
            
            {/* Toggle */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPulseCheckEnabled}
                  onChange={() => setIsPulseCheckEnabled(!isPulseCheckEnabled)}
                />
                <div className={`block w-14 h-8 rounded-full transition ${
                  isPulseCheckEnabled ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform ${
                  isPulseCheckEnabled ? 'translate-x-6' : ''
                }`}></div>
              </div>
              <span className="ml-3 font-medium">
                {isPulseCheckEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </label>
          </div>

          {/* Mock Purchase Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPurchases.map((purchase, index) => (
              <button
                key={index}
                onClick={() => triggerDemo(purchase)}
                disabled={!isPulseCheckEnabled}
                className={`p-6 rounded-xl border-2 text-left transition-all transform hover:scale-105 ${
                  isPulseCheckEnabled
                    ? 'border-purple-200 hover:border-purple-400 hover:shadow-lg bg-gradient-to-br from-white to-purple-50'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{purchase.emoji}</span>
                  <ShoppingBag className="w-5 h-5 text-gray-400" />
                </div>
                <div className="font-semibold text-lg mb-1">{purchase.merchant}</div>
                <div className="text-2xl font-bold text-purple-600">${purchase.amount}</div>
              </button>
            ))}
          </div>

          {!isPulseCheckEnabled && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                ⚠️ Pulse Check is disabled. Enable it to see the intervention in action!
              </p>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-6">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold mb-2">1. Detection</h3>
              <p className="text-sm text-gray-600">
                Monitors heart rate, time of day, and purchase patterns to detect emotional spending
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-yellow-100 rounded-full mb-4">
                <Shield className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-bold mb-2">2. Intervention</h3>
              <p className="text-sm text-gray-600">
                Gently blocks the purchase and asks you to reflect on your decision
              </p>
            </div>

            <div className="text-center">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">3. Learning</h3>
              <p className="text-sm text-gray-600">
                Learns your patterns over time and helps you build better spending habits
              </p>
            </div>
          </div>
        </div>

        {/* Integration Info */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl">
          <h3 className="font-bold text-lg mb-2">🔗 Integration Ready</h3>
          <p className="text-sm text-gray-700 mb-4">
            Works with Apple Watch, Fitbit, and phone sensors. Integrates seamlessly with any payment flow.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">Apple Health</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">Google Fit</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">Fitbit</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">Stripe</span>
            <span className="px-3 py-1 bg-white rounded-full text-xs font-medium">Plaid</span>
          </div>
        </div>

      </div>

      {/* The PulseCheck Component */}
      <PulseCheck 
        isEnabled={isPulseCheckEnabled} 
        onComplete={handleComplete}
      />
    </div>
  );
};

export default PulseCheckDemo;