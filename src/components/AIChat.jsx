// src/components/AIChat.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import LeftDock from "./chat/LeftDock";
import ChatMessages from "./chat/ChatMessages";
import NeuralLoader from "./chat/NeuralLoader";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  AreaChart, Area, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

export default function AIChat() {
  const [collapsed, setCollapsed] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // auto-scroll to the *end anchor* only when messages/loading change
  const endRef = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    return () => clearTimeout(t);
  }, [messages, loading]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: "ai",
        variant: "welcome",
        text:
          "👋 Welcome to OTP Insight — your neural financial companion.\nType one of: “spending”, “savings”, “portfolio”, “health”, “goals”, “alerts”, “insights”, “budget”.",
      },
    ]);
  }, []);

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

  const handleChipClick = (chip) => handleUserMessage(chip);

  const chartData = useMemo(() => ({
    spending: [
      { week: "Week 1", amount: 420, budget: 450 },
      { week: "Week 2", amount: 510, budget: 450 },
      { week: "Week 3", amount: 390, budget: 450 },
      { week: "Week 4", amount: 460, budget: 450 },
    ],
    savings: [
      { name: "Subscriptions", saved: 45 },
      { name: "Dining", saved: 30 },
      { name: "Transport", saved: 20 },
    ],
    portfolio: [
      { name: "Funds", roi: 1.6 },
      { name: "Bonds", roi: 1.1 },
      { name: "Equities", roi: 2.4 },
      { name: "Cash", roi: 0.8 },
    ],
    portfolioPie: [
      { name: "Equities", value: 50, color: "#22c55e" },
      { name: "Funds", value: 25, color: "#10b981" },
      { name: "Bonds", value: 15, color: "#34d399" },
      { name: "Cash", value: 10, color: "#059669" },
    ],
    health: [
      { metric: "Savings Rate", score: 78 },
      { metric: "Budget Adherence", score: 83 },
      { metric: "Credit Utilization", score: 42 },
      { metric: "Goal Momentum", score: 71 },
    ],
    budget: [
      { cat: "Groceries", used: 62 },
      { cat: "Transport", used: 48 },
      { cat: "Dining", used: 73 },
      { cat: "Shopping", used: 58 },
    ],
  }), []);

  const chips = ["Show insights", "Explain more", "Give me actions"];

  const buildAIResponse = (text) => {
    if (["insight", "insights"].some(k => text.includes(k))) return expansion("insights");
    if (["explain", "more"].some(k => text.includes(k))) return expansion("explain");
    if (["action", "actions"].some(k => text.includes(k))) return expansion("actions");

    if (text.includes("spending")) {
      setActiveTool("spending");
      return {
        id: Date.now(),
        sender: "ai",
        title: "Spending Analysis",
        subtitle: "This month’s trend vs budget",
        chips,
        onChip: handleChipClick,
        chart: (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={chartData.spending}>
              <defs>
                <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="week" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#10b981" fill="url(#a1)" />
              <Line type="monotone" dataKey="budget" stroke="#94a3b8" strokeDasharray="5 4" />
            </AreaChart>
          </ResponsiveContainer>
        ),
      };
    }

    if (text.includes("savings")) {
      setActiveTool("savings");
      return {
        id: Date.now(),
        sender: "ai",
        title: "Instant Savings",
        subtitle: "Where you can save today",
        chips,
        onChip: handleChipClick,
        chart: (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData.savings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="saved" fill="#22c55e" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ),
      };
    }

    if (text.includes("portfolio")) {
      setActiveTool("portfolio");
      return {
        id: Date.now(),
        sender: "ai",
        title: "Portfolio Performance",
        subtitle: "Quarter-to-date ROI & mix",
        chips,
        onChip: handleChipClick,
        chart: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData.portfolio}>
                <defs>
                  <linearGradient id="roi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Area type="monotone" dataKey="roi" stroke="#10b981" fill="url(#roi)" />
              </AreaChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={chartData.portfolioPie} innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                  {chartData.portfolioPie.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ),
      };
    }

    if (text.includes("health")) {
      setActiveTool("health");
      return {
        id: Date.now(),
        sender: "ai",
        title: "Financial Health",
        subtitle: "AI score by dimension",
        chips,
        onChip: handleChipClick,
        chart: (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData.health} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis type="number" stroke="#9ca3af" />
              <YAxis type="category" dataKey="metric" stroke="#9ca3af" width={120} />
              <Tooltip />
              <Bar dataKey="score" fill="#10b981" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ),
      };
    }

    if (text.includes("budget")) {
      setActiveTool("budget");
      return {
        id: Date.now(),
        sender: "ai",
        title: "Budget Overview",
        subtitle: "Utilization by category",
        chips,
        onChip: handleChipClick,
        chart: (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData.budget}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="cat" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Bar dataKey="used" fill="#059669" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        ),
      };
    }

    if (text.includes("insight") || text.includes("explain") || text.includes("action")) {
      return expansion(text);
    }

    return {
      id: Date.now(),
      sender: "ai",
      text:
        "🤖 Try typing: “spending”, “savings”, “portfolio”, “health”, “budget” — then “insights”, “explain”, or “actions”.",
    };
  };

  const expansion = (kind) => {
    let text;
    if (kind === "insights" || kind.includes("insight")) {
      text =
        activeTool === "spending"
          ? "Insight: 37% of spend is non-essential (food delivery + entertainment). Cap these to save ~€120/mo."
          : activeTool === "savings"
          ? "Insight: Cancelling idle subscriptions & switching energy plan yields ~€35/mo."
          : activeTool === "portfolio"
          ? "Insight: Your risk is equity-heavy (50%). Quarterly rebalance could smooth drawdowns."
          : activeTool === "health"
          ? "Insight: Credit utilization >40% is suppressing your score. Aim <30% for a quick boost."
          : "Insight: Dining and utilities exceed trend; set a smart cap for the next 2 weeks.";
    } else if (kind === "explain" || kind.includes("explain")) {
      text =
        activeTool === "spending"
          ? "Explanation: A mid-month spike coincides with weekend delivery + cinema. Budget line shows consistent overrun."
          : activeTool === "savings"
          ? "Explanation: We flag recurring charges not used in 30+ days, plus high-cost categories vs peers."
          : activeTool === "portfolio"
          ? "Explanation: Equities drive most ROI; bonds stabilize. Cash drag at 10% lowers compounding."
          : activeTool === "health"
          ? "Explanation: Score blends savings rate, budget adherence, credit usage, and goal momentum."
          : "Explanation: We compare rolling 4-week means to detect anomalies and opportunities.";
    } else {
      text =
        activeTool === "spending"
          ? "Actions: Create a €15/day cap; auto-categorize leisure; enable delivery-limit warning."
          : activeTool === "savings"
          ? "Actions: Auto-transfer €40/wk to savings; cancel 2 subs; switch energy provider."
          : activeTool === "portfolio"
          ? "Actions: Add 10% bonds; enable dividend reinvest; set quarterly rebalance rule."
          : activeTool === "health"
          ? "Actions: Pay down credit to <30% util; schedule bill reminders; raise emergency fund."
          : "Actions: Enable smart alerts; set 2 category limits; weekly check-in.";
    }
    return { id: Date.now(), sender: "ai", text };
  };

  const chipToCommand = (c) =>
    c.toLowerCase().includes("insight") ? "insights" :
    c.toLowerCase().includes("explain") ? "explain" : "actions";

  return (
    // IMPORTANT: remove fixed height; let page flow naturally
    <div className="grid grid-cols-12 gap-4 relative min-h-[calc(100vh-7rem)]">
      <LeftDock collapsed={collapsed} setCollapsed={setCollapsed} onSelect={(cmd) => handleUserMessage(cmd)} />

      <div className={`col-span-12 ${collapsed ? "md:col-span-12" : "md:col-span-9"} flex flex-col`}>
        {/* stream (no overflow trap) */}
        <div className="px-4 md:px-8 pt-2 pb-6">
          <ChatMessages messages={messages} onChip={(label) => handleUserMessage(chipToCommand(label))} />
          {loading && <div className="mt-3"><NeuralLoader /></div>}
          {/* end anchor to scroll into view */}
          <div ref={endRef} />
        </div>

        {/* sticky input (not fixed) */}
        <div className="sticky bottom-4 z-20 mx-4 md:mx-8">
          <div className="bg-slate-900/70 border border-emerald-500/30 rounded-full p-2 backdrop-blur-md flex gap-2 items-center">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserMessage(inputValue)}
              placeholder="Ask anything (e.g., 'spending', 'portfolio', 'health' … then 'insights' / 'explain' / 'actions')"
              className="flex-1 bg-transparent text-gray-100 px-4 py-2 focus:outline-none text-sm"
            />
            <button
              onClick={() => handleUserMessage(inputValue)}
              disabled={loading}
              className="bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white px-5 py-2 rounded-full transition-all font-bold text-sm"
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
          aria-label="Open AI tools"
        >
          ❮
        </button>
      )}

      {showGuide && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
          <div className="w-full max-w-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-300 mb-4">Quick Guide</h2>
            <ol className="space-y-3 text-gray-300">
              <li>1) Pick a tool on the left (or type <span className="text-emerald-300 font-semibold">“spending”</span>, <span className="text-emerald-300 font-semibold">“portfolio”</span>, etc.).</li>
              <li>2) Then type <span className="text-emerald-300 font-semibold">“insights”</span>, <span className="text-emerald-300 font-semibold">“explain”</span>, or <span className="text-emerald-300 font-semibold">“actions”</span> — or click the green chips.</li>
              <li>3) Cards are wide and stack. Scroll normally (no traps). The input stays visible.</li>
              <li>4) Demo ideas: “compare to last month”, “rebalance plan”, “reduce credit utilization”.</li>
            </ol>
            <div className="mt-6 flex flex-wrap gap-2">
              {["spending", "savings", "portfolio", "health", "budget"].map((q) => (
                <button
                  key={q}
                  onClick={() => { setShowGuide(false); handleUserMessage(q); }}
                  className="px-3 py-2 rounded-full text-sm bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 transition"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}