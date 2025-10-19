import React from "react";
import { Sparkles, Brain, ChevronRight, X } from "lucide-react";

export default function InteractiveWalkthrough({ step, onNext, onBack, onSkip, onClose }) {
  const steps = [
    {
      id: 0,
      title: "Welcome to NeuroFin AI Coach! 🧠",
      description: "Your intelligent financial companion powered by neural networks. Let's take a 30-second tour to show you how to get the most insights from your finances.",
      highlight: null,
      position: "center"
    },
    {
      id: 1,
      title: "AI Tools Panel",
      description: "These 8 tools analyze different aspects of your finances. Each uses AI to find patterns, opportunities, and risks. Click any tool to start analyzing.",
      highlight: "left-dock",
      position: "right",
      icon: "🛠️"
    },
    {
      id: 2,
      title: "Visual Analytics",
      description: "Every analysis comes with interactive charts showing trends, comparisons, and projections. Charts update in real-time as your financial data changes.",
      highlight: "chat-area",
      position: "bottom",
      icon: "📊"
    },
    {
      id: 3,
      title: "Action Chips",
      description: "After viewing any category, click these chips to dive deeper:\n• 'Show insights' → AI recommendations\n• 'Explain more' → detailed analysis\n• 'Give me actions' → specific steps",
      highlight: "chips",
      position: "bottom",
      icon: "🔍"
    },
    {
      id: 4,
      title: "Smart Conversation",
      description: "Type naturally! Try 'How can I save more?' or 'Show my portfolio health' or 'Compare spending to last month'. The AI understands context.",
      highlight: "input",
      position: "top",
      icon: "💬"
    },
    {
      id: 5,
      title: "Ready to Start!",
      description: "Click any tool on the left, or try typing 'spending' or 'portfolio' in the input below. The AI is here to help you make smarter financial decisions!",
      highlight: null,
      position: "center",
      icon: "🚀"
    }
  ];

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  const getHighlightStyle = () => {
    switch(currentStep.highlight) {
      case "left-dock":
        return {
          outline: "4px solid rgba(16, 185, 129, 0.6)",
          outlineOffset: "8px",
          borderRadius: "24px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 60px rgba(16, 185, 129, 0.4)",
          position: "relative",
          zIndex: 60
        };
      case "chat-area":
        return {
          outline: "4px solid rgba(16, 185, 129, 0.6)",
          outlineOffset: "8px",
          borderRadius: "24px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 60px rgba(16, 185, 129, 0.4)",
          position: "relative",
          zIndex: 60
        };
      case "chips":
        return {
          outline: "4px solid rgba(16, 185, 129, 0.6)",
          outlineOffset: "8px",
          borderRadius: "24px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 60px rgba(16, 185, 129, 0.4)",
          position: "relative",
          zIndex: 60
        };
      case "input":
        return {
          outline: "4px solid rgba(16, 185, 129, 0.6)",
          outlineOffset: "8px",
          borderRadius: "9999px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.7), 0 0 60px rgba(16, 185, 129, 0.4)",
          position: "relative",
          zIndex: 60
        };
      default:
        return null;
    }
  };

  const getTooltipPosition = () => {
    const base = "fixed z-[70] max-w-md";
    switch(currentStep.position) {
      case "right":
        return `${base} left-[23rem] top-1/2 -translate-y-1/2`;
      case "bottom":
        return `${base} left-1/2 -translate-x-1/2 top-[60%]`;
      case "top":
        return `${base} left-1/2 -translate-x-1/2 bottom-24`;
      case "center":
      default:
        return `${base} left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`;
    }
  };

  return (
    <>
      {/* Backdrop and highlight effect */}
      {currentStep.highlight && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
        />
      )}

      {/* Floating tooltip card */}
      <div className={getTooltipPosition()}>
        <div className="bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border-2 border-emerald-500/40 rounded-2xl shadow-2xl shadow-emerald-500/20 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header with icon and progress */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              {currentStep.icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
                  {currentStep.icon}
                </div>
              )}
              {!currentStep.icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30">
                  {step + 1}
                </div>
              )}
              <div className="flex-1">
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-1">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-500 font-medium">
                  Step {step + 1} of {steps.length}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors ml-2 p-1 hover:bg-slate-800 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-5">
            <h3 className="text-xl font-bold text-emerald-300 mb-2 flex items-center gap-2">
              {currentStep.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
              {currentStep.description}
            </p>
          </div>

          {/* Demo visual for first step */}
          {step === 0 && (
            <div className="grid grid-cols-2 gap-2 mb-5">
              {["Spending", "Savings", "Portfolio", "Health"].map((cat) => (
                <div key={cat} className="bg-slate-800/50 border border-emerald-500/30 rounded-lg p-3 text-center group hover:border-emerald-500/60 transition-all">
                  <div className="text-emerald-400 text-xs font-semibold group-hover:scale-105 transition-transform">
                    {cat}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 rounded-xl border-2 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 transition-all font-semibold text-sm flex items-center gap-2"
              >
                ← Back
              </button>
            )}
            <button
              onClick={onNext}
              className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold hover:from-emerald-400 hover:to-green-400 transition-all shadow-lg shadow-emerald-500/30 text-sm flex items-center justify-center gap-2"
            >
              {step < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Start Exploring!
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Skip button */}
          <div className="mt-3 text-center">
            <button
              onClick={onSkip}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline decoration-dotted"
            >
              Skip tutorial
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-1 -right-1 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-green-500/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Pointer arrow for non-center positions */}
        {currentStep.position !== "center" && currentStep.position === "right" && (
          <div className="absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-emerald-500/40" />
          </div>
        )}
        {currentStep.position === "bottom" && (
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-3">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-b-8 border-b-emerald-500/40" />
          </div>
        )}
        {currentStep.position === "top" && (
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-3">
            <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-emerald-500/40" />
          </div>
        )}
      </div>

      {/* Pulsing attention grabber on highlighted element */}
      {currentStep.highlight && (
        <div className="fixed inset-0 pointer-events-none z-[65]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
          </div>
        </div>
      )}
    </>
  );
}