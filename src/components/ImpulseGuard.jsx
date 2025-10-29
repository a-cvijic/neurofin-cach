import React, { useState, useEffect } from 'react';
import { Shield, AlertCircle, TrendingUp, Check } from 'lucide-react';

// Main ImpulseGuard Component (Dark Theme)
const ImpulseGuard = ({ isEnabled = true, onComplete }) => {
  const [currentStep, setCurrentStep] = useState('idle');
  const [stressData, setStressData] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);
  const [reflectionAnswers, setReflectionAnswers] = useState({});

  const simulateStressDetection = () => {
    return {
      heartRate: Math.floor(Math.random() * 20) + 85,
      baseline: 70,
      stressScore: Math.floor(Math.random() * 40) + 60,
      timeOfDay: new Date().toLocaleTimeString(),
      trigger: 'Purchase attempt detected'
    };
  };

  const triggerIntervention = (amount, merchant) => {
    const stress = simulateStressDetection();
    setStressData(stress);
    setPurchaseData({ amount, merchant });
    setCurrentStep('intervention');
  };

  useEffect(() => {
    window.triggerImpulseGuard = triggerIntervention;
    return () => delete window.triggerImpulseGuard;
  }, []);

  const handleContinueToCheckin = () => {
    setCurrentStep('checkin');
  };

  const handleSaveForLater = () => {
    setCurrentStep('saved');
    setTimeout(() => {
      if (onComplete) onComplete('saved', purchaseData.amount);
      setCurrentStep('idle');
    }, 3000);
  };

  const handleProceedAnyway = () => {
    if (onComplete) onComplete('proceeded', 0);
    setCurrentStep('idle');
  };

  if (!isEnabled || currentStep === 'idle') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div className="max-w-md w-full mx-4">
        {currentStep === 'intervention' && (
          <InterventionModal 
            stressData={stressData}
            purchaseData={purchaseData}
            onContinue={handleContinueToCheckin}
          />
        )}
        
        {currentStep === 'checkin' && (
          <CheckInFlow 
            purchaseData={purchaseData}
            stressData={stressData}
            onSave={handleSaveForLater}
            onProceed={handleProceedAnyway}
            reflectionAnswers={reflectionAnswers}
            setReflectionAnswers={setReflectionAnswers}
          />
        )}
        
        {currentStep === 'saved' && (
          <SavedModal 
            amount={purchaseData.amount}
          />
        )}
      </div>
    </div>
  );
};

// Intervention Modal - Dark Theme
const InterventionModal = ({ stressData, purchaseData, onContinue }) => {
  const percentAboveBaseline = Math.round(((stressData.heartRate - stressData.baseline) / stressData.baseline) * 100);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-green-500/30 rounded-2xl shadow-2xl p-8 animate-slideIn">
      {/* Shield Icon with Pulse */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Shield className="w-20 h-20 text-green-500 animate-pulse" fill="currentColor" />
          <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-2 text-white">Impulse Guard Alert! 🛡️</h2>
      
      {/* Message */}
      <p className="text-gray-300 text-center mb-6">
        Your heart rate is <span className="font-bold text-green-400">{percentAboveBaseline}% above normal</span> right now.
        Let's make sure this is really what you want.
      </p>

      {/* Heart Rate Comparison */}
      <div className="bg-gradient-to-br from-green-950/50 to-emerald-950/50 border border-green-500/20 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-end mb-4">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Your baseline</div>
            <div className="text-3xl font-bold text-gray-300">{stressData.baseline}</div>
            <div className="text-xs text-gray-500">BPM</div>
          </div>
          
          <TrendingUp className="w-6 h-6 text-green-400 mb-4" />
          
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Right now</div>
            <div className="text-3xl font-bold text-green-400">{stressData.heartRate}</div>
            <div className="text-xs text-gray-500">BPM</div>
          </div>
        </div>
        
        {/* Visual Bar */}
        <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="absolute h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
            style={{ width: `${(stressData.heartRate / 120) * 100}%` }}
          />
        </div>
      </div>

      {/* Purchase Info */}
      <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-6 rounded">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-200">
              You're about to spend <span className="font-bold">€{purchaseData.amount}</span> at {purchaseData.merchant}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onContinue}
        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-900/50"
      >
        Okay, let me think about it
      </button>
    </div>
  );
};

// Check-In Flow - Dark Theme
const CheckInFlow = ({ purchaseData, stressData, onSave, onProceed, reflectionAnswers, setReflectionAnswers }) => {
  const [regretSlider, setRegretSlider] = useState(50);

  const reasons = [
    { id: 'stressed', label: "I'm stressed/emotional", emoji: '😰' },
    { id: 'need', label: 'I genuinely need this', emoji: '✅' },
    { id: 'deal', label: "It's a great deal I've been waiting for", emoji: '💰' },
    { id: 'want', label: 'I just want it', emoji: '🤷' }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-gray-700/50 rounded-2xl shadow-2xl p-8 animate-slideIn">
      <h2 className="text-2xl font-bold mb-6 text-white">Quick reality check</h2>

      {/* Question 1: Why buying */}
      <div className="mb-8">
        <p className="text-lg font-semibold mb-4 text-gray-200">Why are you buying this right now?</p>
        <div className="space-y-3">
          {reasons.map(reason => (
            <button
              key={reason.id}
              onClick={() => setReflectionAnswers({ ...reflectionAnswers, reason: reason.id })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                reflectionAnswers.reason === reason.id
                  ? 'border-green-500 bg-green-950/30'
                  : 'border-gray-700 bg-gray-800/30 hover:border-gray-600'
              }`}
            >
              <span className="text-2xl mr-3">{reason.emoji}</span>
              <span className="font-medium text-gray-200">{reason.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Question 2: Future feelings */}
      <div className="mb-8">
        <p className="text-lg font-semibold mb-4 text-gray-200">How will you feel about this tomorrow?</p>
        <div className="px-4">
          <input
            type="range"
            min="0"
            max="100"
            value={regretSlider}
            onChange={(e) => setRegretSlider(e.target.value)}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f87171 0%, #fbbf24 50%, #34d399 100%)`
            }}
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-red-400 font-medium">Total regret</span>
            <span className="text-gray-500">Neutral</span>
            <span className="text-green-400 font-medium">Great decision</span>
          </div>
        </div>
      </div>

      {/* Insight Box */}
      {reflectionAnswers.reason === 'stressed' && (
        <div className="bg-blue-900/20 border-l-4 border-blue-400 p-4 mb-6 rounded">
          <p className="text-sm text-blue-200">
            💡 <strong>Insight:</strong> You've prevented 4 emotional purchases this month, saving €280. 
            Your wallet will thank you tomorrow!
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={onSave}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-green-500 hover:to-emerald-500 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-900/50"
        >
          💾 Save for Tomorrow (24hr hold)
        </button>
        <button
          onClick={onProceed}
          className="w-full bg-gray-800 border border-gray-700 text-gray-300 py-4 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200"
        >
          I'm sure, let me buy it
        </button>
      </div>

      {/* Small print */}
      <p className="text-xs text-gray-500 text-center mt-4">
        You can always come back to this purchase when your heart rate is back to normal
      </p>
    </div>
  );
};

// Saved Modal - Dark Theme
const SavedModal = ({ amount }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border-2 border-green-500/30 rounded-2xl shadow-2xl p-8 animate-slideIn text-center">
      {/* Celebration Animation */}
      <div className="mb-6">
        <div className="inline-block p-6 bg-green-900/30 rounded-full border-2 border-green-500/50">
          <Check className="w-16 h-16 text-green-400" strokeWidth={3} />
        </div>
      </div>

      {/* Confetti effect */}
      <div className="mb-4">
        <span className="text-6xl animate-bounce inline-block">🎉</span>
      </div>

      {/* Message */}
      <h2 className="text-3xl font-bold mb-2 text-green-400">
        You saved €{amount}!
      </h2>
      
      <p className="text-gray-300 mb-6 text-lg">
        Great call. Impulse Guard has your back. You can revisit this tomorrow when you're in a better state.
      </p>

      {/* Stats */}
      <div className="bg-gradient-to-br from-green-950/50 to-emerald-950/50 border border-green-500/20 rounded-xl p-6 mb-6">
        <p className="font-semibold text-gray-300 mb-3">This month you've prevented:</p>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-400">• Impulse purchases</span>
            <span className="font-bold text-green-400">7 purchases</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">• Potential regrets</span>
            <span className="font-bold text-green-400">€{amount + 340}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">• Emotional buys saved</span>
            <span className="font-bold text-green-400">87%</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500">
        💪 You're building better money habits with Impulse Guard!
      </p>
    </div>
  );
};

export default ImpulseGuard;