// src/components/AIChat.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import LeftDock from "./chat/LeftDock";
import ChatMessages from "./chat/ChatMessages";
import NeuralLoader from "./chat/NeuralLoader";
import InteractiveWalkthrough from "./chat/InteractiveWalkthrough";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

export default function AIChat() {
  const [collapsed, setCollapsed] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [guideStep, setGuideStep] = useState(0);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const endRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    const t = setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(t);
  }, [messages, loading]);

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        variant: "welcome",
        text: "👋 Welcome to NeuroFin — your neural financial companion.\n\n🎯 Choose any category from the left, then dive deeper with:\n• 'insights' — AI-powered recommendations\n• 'explain' — detailed breakdown\n• 'actions' — specific steps to take",
      },
    ]);
  }, []);

  // 🧭 Walkthrough visual highlight logic
  useEffect(() => {
    if (!showGuide) return;

    // Remove old highlights
    document.querySelectorAll("[data-walkthrough-highlight]").forEach((el) => {
      el.removeAttribute("data-walkthrough-highlight");
      el.style.cssText = "";
    });

    const highlightMap = {
      1: '[data-walkthrough-id="left-dock"]',
      2: '[data-walkthrough-id="chat-area"]',
      3: ".walkthrough-chips",
      4: '[data-walkthrough-id="input"]',
    };

    const selector = highlightMap[guideStep];
    if (selector) {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute("data-walkthrough-highlight", "true");
        el.style.cssText = `
          position: relative;
          z-index: 60;
          outline: 4px solid rgba(16, 185, 129, 0.6);
          outline-offset: 8px;
          border-radius: ${selector.includes("input") ? "9999px" : "24px"};
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.7),
                      0 0 60px rgba(16, 185, 129, 0.4);
          transition: all 0.3s ease-in-out;
        `;
      }
    }
  }, [guideStep, showGuide]);

  // 🧭 Guide step handlers
  const handleGuideNext = () => {
    if (guideStep < 5) setGuideStep((s) => s + 1);
    else {
      setShowGuide(false);
      handleUserMessage("spending");
    }
  };
  const handleGuideBack = () => guideStep > 0 && setGuideStep((s) => s - 1);
  const handleGuideSkip = () => setShowGuide(false);

  // 🧠 AI Data Sources
  const chartData = useMemo(() => ({
    spending: [
      { week: "Week 1", amount: 420, budget: 450, lastMonth: 380 },
      { week: "Week 2", amount: 510, budget: 450, lastMonth: 440 },
      { week: "Week 3", amount: 390, budget: 450, lastMonth: 410 },
      { week: "Week 4", amount: 460, budget: 450, lastMonth: 425 },
    ],
    savings: [
      { name: "Subscriptions", saved: 45, potential: 65 },
      { name: "Dining", saved: 30, potential: 80 },
      { name: "Transport", saved: 20, potential: 35 },
      { name: "Entertainment", saved: 15, potential: 40 },
    ],
    portfolio: [
      { name: "Funds", roi: 1.6, target: 2.0 },
      { name: "Bonds", roi: 1.1, target: 1.3 },
      { name: "Equities", roi: 2.4, target: 2.2 },
      { name: "Cash", roi: 0.8, target: 1.0 },
    ],
    portfolioPie: [
      { name: "Equities", value: 50, color: "#10b981" },
      { name: "Funds", value: 25, color: "#22c55e" },
      { name: "Bonds", value: 15, color: "#34d399" },
      { name: "Cash", value: 10, color: "#6ee7b7" },
    ],
    health: [
      { metric: "Savings Rate", score: 78, target: 85 },
      { metric: "Budget Adherence", score: 83, target: 90 },
      { metric: "Credit Utilization", score: 42, target: 70 },
      { metric: "Goal Momentum", score: 71, target: 80 },
    ],
    budget: [
      { cat: "Groceries", used: 62, budget: 100 },
      { cat: "Transport", used: 48, budget: 100 },
      { cat: "Dining", used: 73, budget: 100 },
      { cat: "Shopping", used: 58, budget: 100 },
    ],
    goals: [
      { goal: "Emergency Fund", progress: 75, target: 100 },
      { goal: "Vacation", progress: 60, target: 100 },
      { goal: "Home Down Payment", progress: 35, target: 100 },
      { goal: "Retirement", progress: 45, target: 100 },
    ],
    alerts: [
      { day: "Mon", alerts: 2 },
      { day: "Tue", alerts: 1 },
      { day: "Wed", alerts: 4 },
      { day: "Thu", alerts: 3 },
      { day: "Fri", alerts: 5 },
      { day: "Sat", alerts: 2 },
      { day: "Sun", alerts: 1 },
    ],
  }), []);

  const chips = ["Show insights", "Explain more", "Give me actions"];

  // 🧠 Handle chat messages
  const handleUserMessage = (text) => {
    if (!text.trim()) return;
    const cleaned = text.trim();
    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: cleaned }]);
    setInputValue("");
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, buildAIResponse(cleaned.toLowerCase())]);
      setLoading(false);
    }, 800);
  };

  // 🧩 Chip interaction (insights, explain, actions)
  const handleChipClick = (chip) => handleUserMessage(chip);

  // 🧮 Build AI Response
  const buildAIResponse = (text) => {
    if (["insight", "insights"].some(k => text.includes(k))) return expansion("insights");
    if (["explain", "more"].some(k => text.includes(k))) return expansion("explain");
    if (["action", "actions"].some(k => text.includes(k))) return expansion("actions");

    const map = {
      spending: "💳 Spending Analysis",
      savings: "🎯 Instant Savings Opportunities",
      portfolio: "📈 Portfolio Performance",
      health: "💪 Financial Health Score",
      budget: "💰 Budget Overview",
      goals: "🎯 Goal Tracking",
      alerts: "🔔 Smart Alerts",
    };

    const match = Object.keys(map).find((k) => text.includes(k));
    if (!match)
      return {
        id: Date.now(),
        sender: "ai",
        text: "🤖 Try typing 'spending', 'savings', 'portfolio', 'health', 'budget', 'goals', or 'alerts'. Then ask for 'insights', 'explain', or 'actions'.",
      };

    setActiveTool(match);

    const chartRender = {
      spending: (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData.spending}>
            <defs>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="week" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #10b981" }} />
            <Area type="monotone" dataKey="amount" stroke="#10b981" fill="url(#spendGrad)" />
            <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeDasharray="5 4" />
          </AreaChart>
        </ResponsiveContainer>
      ),
      savings: (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData.savings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #10b981" }} />
            <Bar dataKey="saved" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="potential" fill="#059669" opacity={0.4} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
      portfolio: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData.portfolio}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #10b981" }} />
              <Bar dataKey="roi" fill="#10b981" />
              <Bar dataKey="target" fill="#34d399" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={chartData.portfolioPie} dataKey="value" innerRadius={60} outerRadius={90}>
                {chartData.portfolioPie.map((s, i) => <Cell key={i} fill={s.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ),
      health: (
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={chartData.health}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="metric" stroke="#9ca3af" />
            <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
            <Radar dataKey="target" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
          </RadarChart>
        </ResponsiveContainer>
      ),
    };

    return {
      id: Date.now(),
      sender: "ai",
      title: map[match],
      subtitle: `AI analysis for ${match.charAt(0).toUpperCase() + match.slice(1)}`,
      chips,
      chart: chartRender[match],
      onChip: handleChipClick,
    };
  };

  // Contextual expansions
  const expansion = (type) => {
    const textMap = {
      insights: "💡 **AI Insight:** Personalized recommendations for improvement.",
      explain: "📊 **Analysis:** Detailed breakdown and reasoning for this result.",
      actions: "✅ **Next Steps:** Practical actions to improve outcomes.",
    };
    return { id: Date.now(), sender: "ai", text: textMap[type] };
  };

  return (
    <div className="grid grid-cols-12 gap-4 relative min-h-[calc(100vh-7rem)]">
      <div data-walkthrough-id="left-dock">
        <LeftDock collapsed={collapsed} setCollapsed={setCollapsed} onSelect={(cmd) => handleUserMessage(cmd)} />
      </div>

      <div className={`col-span-12 ${collapsed ? "md:col-span-12" : "md:col-span-9"} flex flex-col`}>
        <div className="px-4 md:px-8 pt-2 pb-6" data-walkthrough-id="chat-area">
          <ChatMessages messages={messages} onChip={(label) => handleUserMessage(label)} />
          {loading && <div className="mt-3"><NeuralLoader /></div>}
          <div ref={endRef} />
        </div>

        <div className="sticky bottom-4 z-20 mx-4 md:mx-8" data-walkthrough-id="input">
          <div className="bg-slate-900/70 border border-emerald-500/30 rounded-full p-2 backdrop-blur-md flex gap-2 items-center">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserMessage(inputValue)}
              placeholder="Ask anything — 'spending', 'portfolio', 'health', or chat naturally..."
              className="flex-1 bg-transparent text-gray-100 px-4 py-2 focus:outline-none text-sm"
            />
            <button
              onClick={() => handleUserMessage(inputValue)}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white px-5 py-2 rounded-full transition-all font-bold text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-28 left-3 bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-full shadow-lg transition-all"
        >
          ❮
        </button>
      )}

      {showGuide && (
        <InteractiveWalkthrough
          step={guideStep}
          onNext={handleGuideNext}
          onBack={handleGuideBack}
          onSkip={handleGuideSkip}
          onClose={handleGuideSkip}
        />
      )}
    </div>
  );
}