import React from 'react';
import { Target } from 'lucide-react';

const Goals = ({ savingGoal }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Monthly Saving Goal</h2>
            <p className="text-sm text-gray-500">Save €{savingGoal.target} this month</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-2xl font-bold text-green-600">
              €{savingGoal.current} / €{savingGoal.target}
            </span>
          </div>
          <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-500 flex items-center justify-end pr-2"
              style={{ width: `${Math.min((savingGoal.current / savingGoal.target) * 100, 100)}%` }}
            >
              <span className="text-xs font-bold text-white">
                {((savingGoal.current / savingGoal.target) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{savingGoal.weeks}</p>
            <p className="text-sm text-gray-500">Week Streak</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">€{(savingGoal.target - savingGoal.current).toFixed(2)}</p>
            <p className="text-sm text-gray-500">To Go</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">73%</p>
            <p className="text-sm text-gray-500">Achievement</p>
          </div>
        </div>

        {savingGoal.current >= savingGoal.target * 0.7 && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
            <p className="text-green-800 font-medium">🎉 Amazing progress! You're almost there. Keep it up!</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-bold mb-2">💡 Pro Tip</h3>
        <p>Setting up automatic transfers to savings can help you reach your goals faster without thinking about it!</p>
      </div>
    </div>
  );
};

export default Goals;