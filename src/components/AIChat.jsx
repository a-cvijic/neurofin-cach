
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Sparkles, TrendingDown, TrendingUp, Target, Zap, PiggyBank, Lightbulb, Award, AlertCircle } from 'lucide-react';
import { getAIResponse } from '../utils/aiResponses';

const AIChat = ({ categoryData, totalSpent, savingGoal }) => {
  const [chatMessages, setChatMessages] = useState([
    { 
      role: 'assistant', 
      content: "Hi! I'm your NeuroFin AI Coach 🤖\n\nI can help you:\n• Analyze spending patterns\n• Find saving opportunities\n• Track your financial goals\n• Give personalized tips\n\nWhat would you like to know?",
      hasGraphic: true,
      graphicType: 'welcome'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const determineGraphicType = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('breakdown') || msg.includes('spending')) return 'spending';
    if (msg.includes('food') || msg.includes('delivery')) return 'food';
    if (msg.includes('goal') || msg.includes('save')) return 'goal';
    if (msg.includes('tip') || msg.includes('advice')) return 'tips';
    if (msg.includes('transport')) return 'transport';
    return 'general';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = { role: 'user', content: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(currentInput, categoryData, totalSpent, savingGoal);
      const graphicType = determineGraphicType(currentInput);
      
      setChatMessages(prev => [...prev, { 
        role: 'assistant', 
        content: aiResponse,
        hasGraphic: true,
        graphicType: graphicType
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const MessageGraphic = ({ type }) => {
    switch(type) {
      case 'welcome':
        return (
          <div className="relative w-full h-32 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl mb-3 overflow-hidden animate-gradient">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Sparkles className="w-16 h-16 text-white animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 text-white text-xs font-bold opacity-75">
              AI-Powered Financial Coach
            </div>
          </div>
        );
      
      case 'spending':
        return (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {categoryData.slice(0, 3).map((cat, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-3 text-center transform hover:scale-105 transition-transform">
                <div className="text-3xl mb-1">{cat.emoji}</div>
                <div className="text-xs font-bold text-indigo-900">€{cat.value.toFixed(0)}</div>
                <div className="text-xs text-indigo-600">{cat.name}</div>
              </div>
            ))}
          </div>
        );
      
      case 'food':
        const foodSpending = categoryData.find(c => c.name === "Food Delivery")?.value || 0;
        const potentialSaving = foodSpending * 0.6;
        return (
          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="text-3xl">🍕</div>
                <div>
                  <div className="text-sm font-bold text-red-900">Food Delivery</div>
                  <div className="text-xs text-red-600">€{foodSpending.toFixed(2)} spent</div>
                </div>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-2 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Potential Savings:</span>
                <span className="text-lg font-bold text-green-600">€{potentialSaving.toFixed(2)}</span>
              </div>
            </div>
          </div>
        );
      
      case 'goal':
        const progress = (savingGoal.current / savingGoal.target) * 100;
        return (
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-4 mb-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-green-900">Saving Goal</div>
                <div className="text-xs text-green-600">€{savingGoal.current} / €{savingGoal.target}</div>
              </div>
              <div className="text-2xl font-bold text-green-600">{progress.toFixed(0)}%</div>
            </div>
            <div className="w-full h-3 bg-white bg-opacity-70 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-1000 relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
              </div>
            </div>
            {progress >= 70 && (
              <div className="mt-2 text-center">
                <Award className="w-6 h-6 text-yellow-500 inline-block animate-bounce" />
                <span className="text-xs text-green-700 ml-1 font-bold">You're crushing it!</span>
              </div>
            )}
          </div>
        );
      
      case 'tips':
        return (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { icon: '🍳', label: 'Meal Prep', color: 'from-yellow-50 to-orange-100' },
              { icon: '🚴', label: 'Bike More', color: 'from-green-50 to-teal-100' },
              { icon: '💰', label: 'Auto-Save', color: 'from-blue-50 to-indigo-100' },
              { icon: '📊', label: 'Track Daily', color: 'from-purple-50 to-pink-100' },
            ].map((tip, i) => (
              <div key={i} className={`bg-gradient-to-br ${tip.color} rounded-lg p-3 text-center transform hover:scale-105 transition-transform`}>
                <div className="text-2xl mb-1">{tip.icon}</div>
                <div className="text-xs font-bold text-gray-700">{tip.label}</div>
              </div>
            ))}
          </div>
        );
      
      case 'transport':
        const transportCost = categoryData.find(c => c.name === "Transport")?.value || 0;
        return (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-4 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="text-3xl">🚗</div>
                <div>
                  <div className="text-sm font-bold text-blue-900">Transport</div>
                  <div className="text-xs text-blue-600">€{transportCost.toFixed(2)} this month</div>
                </div>
              </div>
              <Zap className="w-8 h-8 text-blue-500 animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="bg-white bg-opacity-70 rounded p-2 text-center">
                <div className="text-xl">🚌</div>
                <div className="text-xs text-gray-600">Public: ~€50</div>
              </div>
              <div className="bg-white bg-opacity-70 rounded p-2 text-center">
                <div className="text-xl">🚴</div>
                <div className="text-xs text-gray-600">Bike: FREE!</div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex gap-2 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
              <div className="text-xs font-bold text-indigo-900">Smart Insight</div>
              <div className="text-xs text-indigo-600">Based on your spending patterns</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Enhanced Quick Actions */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white mb-4 overflow-hidden animate-gradient">
        {/* Floating elements */}
        <div className="absolute top-2 right-2 w-16 h-16 bg-white opacity-10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-2 left-2 w-20 h-20 bg-white opacity-10 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <MessageCircle className="w-8 h-8" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 animate-spin" style={{animationDuration: '3s'}} />
            </div>
            <h2 className="text-2xl font-bold">Chat with AI Coach</h2>
          </div>
          <p className="text-indigo-100 mb-4">Ask me anything about your finances!</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { q: "Give me a breakdown", icon: "📊" },
              { q: "How can I save more?", icon: "💰" },
              { q: "Analyze my food spending", icon: "🍕" },
              { q: "Tips to reach my goal", icon: "🎯" }
            ].map(item => (
              <button
                key={item.q}
                onClick={() => handleQuickQuestion(item.q)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm py-3 px-3 rounded-lg transition-all transform hover:scale-105 text-left flex items-center gap-2"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs">{item.q}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Chat Window */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 flex flex-col" style={{ height: '550px' }}>
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in-up`}>
              <div className={`max-w-[85%] rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 shadow-md'
              } p-4`}>
                {msg.role === 'assistant' && (
                  <>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-indigo-600">NeuroFin AI</span>
                      <div className="flex-1"></div>
                      <Zap className="w-4 h-4 text-indigo-400" />
                    </div>
                    
                    {/* Graphic Element */}
                    {msg.hasGraphic && <MessageGraphic type={msg.graphicType} />}
                  </>
                )}
                
                <p className="whitespace-pre-line text-sm leading-relaxed">
                  {msg.content}
                </p>
                
                {msg.role === 'user' && (
                  <div className="text-xs opacity-70 mt-2 text-right">
                    Just now
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start fade-in-up">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white animate-spin" />
                  </div>
                  <span className="text-xs font-semibold text-gray-500">AI is thinking...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full typing-dot"></div>
                  <div className="w-2 h-2 bg-pink-400 rounded-full typing-dot"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Enhanced Input Area */}
        <div className="border-t-2 border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about your spending, goals, tips..."
              className="flex-1 px-4 py-3 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 disabled:transform-none flex items-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Send</span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <p className="text-xs text-gray-500 text-center">
              Try: "Give me a breakdown" or "How can I save more?"
            </p>
            <Sparkles className="w-3 h-3 text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;