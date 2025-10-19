import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, TrendingUp, Zap, Target, Lightbulb, BarChart3, ChevronRight, ArrowUpRight, ArrowDownLeft, MessageCircle, Brain, Wand2, PieChart, BarChart as BarChartIcon, LineChart as LineChartIcon, TrendingDown, Activity, Wallet, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ScatterChart, Scatter } from 'recharts';

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm your NeuroFin AI Coach 🧠",
      type: 'message',
      showIcon: true,
      initial: true
    }
  ]);
  
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickInsights = [
    {
      id: 1,
      icon: TrendingUp,
      title: 'Smart Analysis',
      subtitle: 'Real-time spending patterns',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      accent: 'bg-green-500',
      gradient: 'from-green-600/20 to-emerald-600/5'
    },
    {
      id: 2,
      icon: Zap,
      title: 'Instant Savings',
      subtitle: 'Find money you didn\'t know you had',
      color: 'from-blue-500 via-cyan-500 to-sky-500',
      accent: 'bg-blue-500',
      gradient: 'from-blue-600/20 to-cyan-600/5'
    },
    {
      id: 3,
      icon: Target,
      title: 'Goal Mastery',
      subtitle: 'Predictive goal achievement',
      color: 'from-purple-500 via-pink-500 to-rose-500',
      accent: 'bg-purple-500',
      gradient: 'from-purple-600/20 to-pink-600/5'
    },
    {
      id: 4,
      icon: Lightbulb,
      title: 'AI Insights',
      subtitle: 'Personalized wealth strategies',
      color: 'from-amber-500 via-orange-500 to-red-500',
      accent: 'bg-amber-500',
      gradient: 'from-amber-600/20 to-orange-600/5'
    },
    {
      id: 5,
      icon: BarChartIcon,
      title: 'Budget Tracker',
      subtitle: 'Monitor your spending limits',
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      accent: 'bg-indigo-500',
      gradient: 'from-indigo-600/20 to-purple-600/5'
    },
    {
      id: 6,
      icon: Activity,
      title: 'Health Check',
      subtitle: 'Financial wellness score',
      color: 'from-red-500 via-rose-500 to-pink-500',
      accent: 'bg-red-500',
      gradient: 'from-red-600/20 to-rose-600/5'
    },
    {
      id: 7,
      icon: Wallet,
      title: 'Portfolio View',
      subtitle: 'See all your assets',
      color: 'from-cyan-500 via-blue-500 to-indigo-500',
      accent: 'bg-cyan-500',
      gradient: 'from-cyan-600/20 to-blue-600/5'
    },
    {
      id: 8,
      icon: Sparkles,
      title: 'Smart Recommendations',
      subtitle: 'AI-powered suggestions',
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      accent: 'bg-yellow-500',
      gradient: 'from-yellow-600/20 to-amber-600/5'
    }
  ];

  const userQuestions = [
    { icon: '💰', text: 'How much did I spend this month?' },
    { icon: '📊', text: 'Compare my spending to last month' },
    { icon: '🎯', text: 'Help me create a savings plan' },
    { icon: '🚨', text: 'Alert me about unusual spending' },
    { icon: '🏦', text: 'Best investment options for me' },
    { icon: '📈', text: 'What\'s my wealth score?' },
    { icon: '💳', text: 'Optimize my credit usage' },
    { icon: '🎁', text: 'Reward program insights' }
  ];

  const suggestedResponses = [
    "Show me detailed analysis",
    "What should I do?",
    "Explain more",
    "Compare with previous"
  ];

  const chartData = {
    spendingTrends: [
      { month: 'Week 1', amount: 540, budget: 600 },
      { month: 'Week 2', amount: 680, budget: 600 },
      { month: 'Week 3', amount: 420, budget: 600 },
      { month: 'Week 4', amount: 780, budget: 600 },
      { month: 'Week 5', amount: 520, budget: 600 },
    ],
    spendingByCategory: [
      { name: 'Food', value: 35, color: '#10b981' },
      { name: 'Transport', value: 20, color: '#059669' },
      { name: 'Entertainment', value: 15, color: '#047857' },
      { name: 'Shopping', value: 18, color: '#065f46' },
      { name: 'Other', value: 12, color: '#064e3b' }
    ],
    predictions: [
      { day: 'Mon', spending: 120, predicted: 115 },
      { day: 'Tue', spending: 95, predicted: 100 },
      { day: 'Wed', spending: 140, predicted: 138 },
      { day: 'Thu', spending: 110, predicted: 112 },
      { day: 'Fri', spending: 180, predicted: 185 },
    ],
    budgetComparison: [
      { category: 'Food', budget: 500, spent: 450, available: 50 },
      { category: 'Transport', budget: 300, spent: 280, available: 20 },
      { category: 'Entertainment', budget: 200, spent: 180, available: 20 },
      { category: 'Shopping', budget: 400, spent: 350, available: 50 },
    ],
    healthScore: [
      { metric: 'Savings Rate', value: 72 },
      { metric: 'Budget Adherence', value: 88 },
      { metric: 'Spending Trend', value: 65 },
      { metric: 'Goals Progress', value: 78 },
    ],
    monthlyComparison: [
      { x: 100, y: 540, name: 'Jan' },
      { x: 200, y: 680, name: 'Feb' },
      { x: 300, y: 420, name: 'Mar' },
      { x: 400, y: 780, name: 'Apr' },
      { x: 500, y: 520, name: 'May' },
    ]
  };

  const handleQuickInsight = (insight) => {
    setSelectedWidget(insight.id);
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: insight.title,
      type: 'message'
    };
    setMessages([...messages, userMessage]);
    setLoading(true);

    setTimeout(() => {
      let chart = null;
      if (insight.id === 1) chart = { type: 'area', data: chartData.spendingTrends };
      if (insight.id === 2) chart = { type: 'pie', data: chartData.spendingByCategory };
      if (insight.id === 3) chart = { type: 'line', data: chartData.predictions };
      if (insight.id === 4) {
        chart = { 
          type: 'widget', 
          data: {
            savings: '€240',
            savingsPercent: '12%',
            category: 'Dining',
            tips: [
              '🔥 You spent 18% more on dining this month',
              '💡 Switch to meal prep, save €50/week',
              '⚡ Set spending limit alerts'
            ]
          }
        };
      }
      if (insight.id === 5) chart = { type: 'bar', data: chartData.budgetComparison };
      if (insight.id === 6) chart = { type: 'health', data: chartData.healthScore };
      if (insight.id === 7) chart = { type: 'scatter', data: chartData.monthlyComparison };
      if (insight.id === 8) chart = { type: 'area', data: chartData.spendingTrends };

      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: insight.id === 4 ? 'Here\'s your personalized strategy:' : `Deep dive into ${insight.title.toLowerCase()}:`,
        type: 'message',
        showIcon: true,
        chart: chart,
        showSuggestions: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1200);
  };

  const handleUserQuestion = (question) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: question,
      type: 'message'
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Analyzing your financial data with AI...',
        type: 'message',
        showIcon: true,
        chart: { type: 'area', data: chartData.spendingTrends },
        showSuggestions: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const handleSuggestedResponse = (response) => {
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: response,
      type: 'message'
    };
    setMessages([...messages, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: 'Processing your request with AI...',
        type: 'message',
        showIcon: true,
        chart: { type: 'area', data: chartData.spendingTrends },
        showSuggestions: true
      };
      setMessages(prev => [...prev, aiResponse]);
      setLoading(false);
    }, 1200);
  };

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'user',
        text: inputValue,
        type: 'message'
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setLoading(true);

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          text: 'Processing your request with advanced AI...',
          type: 'message',
          showIcon: true,
          chart: { type: 'area', data: chartData.spendingTrends },
          showSuggestions: true
        };
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 1500);
    }
  };

  const ChartComponent = ({ chart }) => {
    if (!chart) return null;

    if (chart.type === 'widget') {
      return (
        <div className="space-y-3 mt-3 bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-500/30 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-end gap-2">
            <div>
              <p className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">{chart.data.savings}</p>
              <p className="text-xs text-gray-400">potential savings</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-sm font-semibold text-gray-300">{chart.data.category}</p>
              <p className="text-xs text-gray-500">top opportunity</p>
            </div>
          </div>
          <div className="space-y-2">
            {chart.data.tips.map((tip, idx) => (
              <div key={idx} className="text-xs text-gray-300 bg-slate-800/50 p-2 rounded border border-green-500/20">
                {tip}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="w-full mt-3 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-green-500/20 rounded-xl p-3 backdrop-blur-sm">
        {chart.type === 'area' && (
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={chart.data}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', borderRadius: '8px', color: '#fff' }} />
              <Legend />
              <Area type="monotone" dataKey="amount" stroke="#10b981" fillOpacity={1} fill="url(#colorAmount)" name="Spending" />
              {chart.data[0]?.budget && <Line type="monotone" dataKey="budget" stroke="#9ca3af" strokeDasharray="5 5" name="Budget" />}
              {chart.data[0]?.predicted && <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeDasharray="5 5" name="Predicted" />}
            </AreaChart>
          </ResponsiveContainer>
        )}

        {chart.type === 'pie' && (
          <ResponsiveContainer width="100%" height={240}>
            <RechartsChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={75}
                fill="#8884d8"
                dataKey="value"
              >
                {chart.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff' }} />
            </RechartsChart>
          </ResponsiveContainer>
        )}

        {chart.type === 'line' && (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
              <XAxis dataKey="day" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="spending" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" name="AI Prediction" />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chart.type === 'bar' && (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
              <XAxis dataKey="category" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff' }} />
              <Legend />
              <Bar dataKey="budget" fill="#10b981" name="Budget" />
              <Bar dataKey="spent" fill="#f59e0b" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chart.type === 'health' && (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chart.data} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
              <XAxis type="number" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis dataKey="metric" type="category" stroke="#6b7280" width={80} style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff' }} />
              <Bar dataKey="value" fill="#10b981" name="Score" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chart.type === 'scatter' && (
          <ResponsiveContainer width="100%" height={240}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.1} />
              <XAxis type="number" dataKey="x" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis type="number" dataKey="y" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #10b981', color: '#fff' }} />
              <Scatter name="Months" data={chart.data} fill="#10b981" />
            </ScatterChart>
          </ResponsiveContainer>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hero Header */}
      <div className="relative border-b border-green-500/20 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-75 animate-pulse" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-green-500/50">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-green-400 via-emerald-300 to-teal-300 bg-clip-text text-transparent drop-shadow-lg">
                NeuroFin Coach
              </h1>
              <p className="text-gray-400 text-sm font-medium">Next-gen AI financial intelligence powered by neural networks</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Insights at Top - 8 options now */}
      <div className="border-b border-green-500/20 backdrop-blur-sm p-6 z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-widest">AI Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickInsights.map((insight) => {
              const IconComponent = insight.icon;
              const isSelected = selectedWidget === insight.id;
              
              return (
                <button
                  key={insight.id}
                  onClick={() => handleQuickInsight(insight)}
                  className={`group relative overflow-hidden rounded-xl p-4 text-left transition-all duration-300 transform hover:scale-105 ${
                    isSelected ? 'ring-2 ring-green-400' : ''
                  }`}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="absolute inset-0 border border-green-500/20 group-hover:border-green-500/60 rounded-xl transition-colors" />
                  
                  {/* Glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${insight.color} rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`${insight.accent} p-2.5 rounded-lg group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-green-400 transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <h3 className="font-bold text-gray-100 text-sm group-hover:text-green-300 transition-colors">{insight.title}</h3>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">{insight.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'ai' && msg.showIcon && (
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                </div>
              )}
              <div className={`max-w-2xl ${msg.sender === 'user' ? 'flex justify-end' : ''}`}>
                <div className={`${msg.sender === 'user' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-3xl rounded-br-none' : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 text-gray-100 rounded-3xl rounded-bl-none'} px-5 py-3 shadow-xl backdrop-blur`}>
                  <p className="text-sm">{msg.text}</p>
                  {msg.chart && <ChartComponent chart={msg.chart} />}
                  {msg.showSuggestions && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {suggestedResponses.map((response, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestedResponse(response)}
                          className="text-xs bg-green-500/20 hover:bg-green-500/40 border border-green-500/40 text-green-300 px-3 py-2 rounded-full transition-all hover:scale-105 font-semibold"
                        >
                          {response}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                <Brain className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 px-5 py-3 rounded-3xl rounded-bl-none">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input & Questions Area */}
      <div className="bg-gradient-to-t from-gray-950 to-slate-900/50 border-t border-green-500/20 p-6 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* User Question Quick Access - 8 options now */}
          <div>
            <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Quick Questions</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {userQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleUserQuestion(q.text)}
                  className="group relative overflow-hidden rounded-lg p-3 text-left text-xs transition-all hover:scale-105 bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/20 hover:border-green-500/60 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-600/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <div className="relative z-10 font-medium text-gray-300 group-hover:text-green-300 transition-colors">
                    <span className="mr-1">{q.icon}</span>{q.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="flex gap-2 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-md border border-green-500/30 rounded-full p-1.5 hover:border-green-500/60 transition-all focus-within:border-green-500">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your finances..."
              className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none text-sm font-medium"
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all font-bold text-sm hover:shadow-2xl hover:shadow-green-500/50 shadow-lg shadow-green-600/30"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}