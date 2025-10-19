import React, { useEffect, useMemo, useRef, useState } from "react";
import LeftDock from "./chat/LeftDock";
import ChatMessages from "./chat/ChatMessages";
import NeuralLoader from "./chat/NeuralLoader";
import InteractiveWalkthrough from "./chat/InteractiveWalkthrough";
import { chartData } from "./chat/chartData";
import { insights, explanations, actions } from "./chat/insightsContent";
import {
  SpendingChart,
  SavingsChart,
  PortfolioCharts,
  HealthChart,
  BudgetChart,
  GoalsChart,
  AlertsChart,
} from "./chat/ChartComponents";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    if (!showGuide) {
      setMessages([
        {
          id: 1,
          sender: "ai",
          variant: "welcome",
          text: "Start by selecting a financial category to analyze, or type naturally to explore your finances.",
        },
      ]);
    }
  }, [showGuide]);

  // Walkthrough visual highlight logic
  useEffect(() => {
    if (!showGuide) return;

    document.querySelectorAll("[data-walkthrough-highlight]").forEach((el) => {
      el.removeAttribute("data-walkthrough-highlight");
      el.style.cssText = "";
    });

    const highlightMap = {
      1: '[data-walkthrough-id="left-dock"]',
      2: '[data-walkthrough-id="chat-messages"]',
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

  // Guide step handlers
  const handleGuideNext = () => {
    if (guideStep < 5) setGuideStep((s) => s + 1);
    else {
      setShowGuide(false);
      handleUserMessage("spending");
    }
  };
  const handleGuideBack = () => guideStep > 0 && setGuideStep((s) => s - 1);
  const handleGuideSkip = () => setShowGuide(false);

  const chips = ["Show insights", "Explain more", "Give me actions"];

  // Handle chat messages
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

  // Chip interaction
  const handleChipClick = (chip) => handleUserMessage(chip);

  // Build AI Response
  const buildAIResponse = (text) => {
    // Handle expansions (insights, explain, actions)
    if (["insight", "insights"].some(k => text.includes(k))) {
      const tool = activeTool || "spending";
      return {
        id: Date.now(),
        sender: "ai",
        text: insights[tool] || "💡 AI insights will appear here.",
      };
    }

    if (["explain", "more"].some(k => text.includes(k))) {
      const tool = activeTool || "spending";
      return {
        id: Date.now(),
        sender: "ai",
        text: explanations[tool] || "📊 Detailed explanation will appear here.",
      };
    }

    if (["action", "actions"].some(k => text.includes(k))) {
      const tool = activeTool || "spending";
      return {
        id: Date.now(),
        sender: "ai",
        text: actions[tool] || "✅ Recommended actions will appear here.",
      };
    }

    // Main tool selection
    const toolMap = {
      spending: {
        title: "💳 Spending Analysis",
        subtitle: "Track expenses & trends",
        component: <SpendingChart data={chartData.spending} />,
      },
      savings: {
        title: "🎯 Instant Savings Opportunities",
        subtitle: "Find saving opportunities",
        component: <SavingsChart data={chartData.savings} />,
      },
      portfolio: {
        title: "📈 Portfolio Performance",
        subtitle: "Investment analytics",
        component: <PortfolioCharts roiData={chartData.portfolio} pieData={chartData.portfolioPie} />,
      },
      health: {
        title: "💪 Financial Health Score",
        subtitle: "Overall score & metrics",
        component: <HealthChart data={chartData.health} />,
      },
      budget: {
        title: "💰 Budget Overview",
        subtitle: "Category breakdown",
        component: <BudgetChart data={chartData.budget} />,
      },
      goals: {
        title: "🎯 Goal Tracking",
        subtitle: "Progress monitoring",
        component: <GoalsChart data={chartData.goals} />,
      },
      alerts: {
        title: "🔔 Smart Alerts",
        subtitle: "Notifications & warnings",
        component: <AlertsChart data={chartData.alerts} />,
      },
    };

    // Find matching tool
    const match = Object.keys(toolMap).find((k) => text.includes(k));

    if (!match) {
      return {
        id: Date.now(),
        sender: "ai",
        text: "🤖 Try typing 'spending', 'savings', 'portfolio', 'health', 'budget', 'goals', or 'alerts'. Then ask for 'insights', 'explain', or 'actions'.",
      };
    }

    setActiveTool(match);

    return {
      id: Date.now(),
      sender: "ai",
      title: toolMap[match].title,
      subtitle: toolMap[match].subtitle,
      chart: toolMap[match].component,
      chips,
    };
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] gap-4">
      {/* Left Dock - Collapsible */}
      <div 
        data-walkthrough-id="left-dock"
        className={`transition-all duration-300 flex-shrink-0 ${
          collapsed ? "w-0" : "w-64"
        } overflow-hidden`}
      >
        <LeftDock 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          onSelect={(cmd) => handleUserMessage(cmd)} 
        />
      </div>

      {/* Collapse/Expand Toggle */}
      {!collapsed && (
        <button
          onClick={() => setCollapsed(true)}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl border border-emerald-500/30 bg-slate-800/50 hover:bg-emerald-500/20 text-emerald-300 transition-all hover:scale-110 flex-shrink-0 mt-2"
          title="Collapse tools"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="hidden md:flex items-center justify-center w-8 h-8 rounded-xl border border-emerald-500/30 bg-slate-800/50 hover:bg-emerald-500/20 text-emerald-300 transition-all hover:scale-110 flex-shrink-0 mt-2"
          title="Expand tools"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Chat Area - Takes remaining space */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="mb-4">
          <div className="rounded-2xl border-2 border-emerald-500/25 bg-gradient-to-r from-slate-900/90 to-slate-950/90 backdrop-blur-md p-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                  AI INSIGHTS
                </h2>
                <p className="text-xs text-gray-400 mt-1">Neural Analysis Engine</p>
              </div>
              {activeTool && (
                <div className="text-right">
                  <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wide">{activeTool}</p>
                  <p className="text-[10px] text-gray-500">Active Analysis</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-4">
          <div data-walkthrough-id="chat-messages">
            <ChatMessages messages={messages} onChip={handleChipClick} />
          </div>
          {loading && <div className="mt-3"><NeuralLoader /></div>}
          <div ref={endRef} />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-4 z-20 mx-4 md:mx-8" data-walkthrough-id="input">
          <div className="bg-slate-900/70 border border-emerald-500/30 rounded-full p-2 backdrop-blur-md flex gap-2 items-center">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserMessage(inputValue)}
              placeholder="Ask anything – 'spending', 'portfolio', 'health', or chat naturally..."
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