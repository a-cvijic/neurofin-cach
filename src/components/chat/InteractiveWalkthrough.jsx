import React, { useEffect, useState } from "react";
import { Sparkles, Brain, ChevronRight, X } from "lucide-react";

export default function InteractiveWalkthrough({ step, onNext, onBack, onSkip, onClose }) {
  const [highlightRect, setHighlightRect] = useState(null);

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
      highlight: "chat-messages",
      position: "left",
      icon: "📊"
    },
    {
      id: 3,
      title: "Action Chips",
      description: "After viewing any category, click these chips to dive deeper:\n• 'Show insights' → AI recommendations\n• 'Explain more' → detailed analysis\n• 'Give me actions' → specific steps",
      highlight: "action-chips",
      position: "top",
      icon: "🔗",
      scrollTarget: "action-chips"
    },
    {
      id: 4,
      title: "Smart Conversation",
      description: "Type naturally! Try 'How can I save more?' or 'Show my portfolio health' or 'Compare spending to last month'. The AI understands context.",
      highlight: "input",
      position: "top",
      icon: "💬",
      scrollTarget: "input"
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

  // Update highlight rect on mount and when step changes
  useEffect(() => {
    if (currentStep.highlight) {
      // Scroll highlighted element into view
      if (currentStep.scrollTarget) {
        const el = document.querySelector(`[data-walkthrough-id="${currentStep.scrollTarget}"]`);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }, 100);
        }
      }

      const selector = `[data-walkthrough-id="${currentStep.highlight}"]`;
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        setHighlightRect({
          top: rect.top - 8,
          left: rect.left - 8,
          width: rect.width + 16,
          height: rect.height + 16,
          radius: 24
        });
      }
    } else {
      setHighlightRect(null);
    }
  }, [step, currentStep.highlight]);

  const getTooltipStyle = () => {
    if (!highlightRect) {
      return {
        position: "fixed",
        zIndex: 70,
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "24rem"
      };
    }

    const padding = 20;
    const tooltipWidth = 384; // 24rem in pixels
    const tooltipHeight = 300; // approximate
    const viewportPadding = 16;
    
    const baseStyle = {
      position: "fixed",
      zIndex: 70,
      maxWidth: "24rem"
    };

    // Helper to constrain position within viewport
    const constrainPosition = (left, top) => {
      let constrainedLeft = left;
      let constrainedTop = top;

      // Keep within horizontal bounds
      if (constrainedLeft < viewportPadding) {
        constrainedLeft = viewportPadding;
      } else if (constrainedLeft + tooltipWidth > window.innerWidth - viewportPadding) {
        constrainedLeft = window.innerWidth - tooltipWidth - viewportPadding;
      }

      // Keep within vertical bounds
      if (constrainedTop < viewportPadding) {
        constrainedTop = viewportPadding;
      } else if (constrainedTop + tooltipHeight > window.innerHeight - viewportPadding) {
        constrainedTop = window.innerHeight - tooltipHeight - viewportPadding;
      }

      return { left: constrainedLeft, top: constrainedTop };
    };

    switch(currentStep.position) {
      case "right": {
        const pos = constrainPosition(
          highlightRect.left + highlightRect.width + padding,
          highlightRect.top + highlightRect.height / 2 - tooltipHeight / 2
        );
        return {
          ...baseStyle,
          left: pos.left,
          top: pos.top
        };
      }
      case "left": {
        const pos = constrainPosition(
          highlightRect.left - tooltipWidth - padding,
          highlightRect.top + highlightRect.height / 2 - tooltipHeight / 2
        );
        return {
          ...baseStyle,
          left: pos.left,
          top: pos.top
        };
      }
      case "bottom": {
        const pos = constrainPosition(
          window.innerWidth / 2 - tooltipWidth / 2,
          highlightRect.top + highlightRect.height + padding
        );
        return {
          ...baseStyle,
          left: pos.left,
          top: pos.top
        };
      }
      case "top": {
        const pos = constrainPosition(
          window.innerWidth / 2 - tooltipWidth / 2,
          highlightRect.top - tooltipHeight - padding
        );
        return {
          ...baseStyle,
          left: pos.left,
          top: pos.top
        };
      }
      case "center":
      default:
        return {
          position: "fixed",
          zIndex: 70,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: "24rem"
        };
    }
  };

  return (
    <>
      {/* Dark Backdrop with spotlight effect */}
      {currentStep.highlight && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 z-50 transition-opacity duration-300"
            onClick={() => {}} // Prevent clicks on backdrop
          />
          
          {/* Spotlight cutout */}
          {highlightRect && (
            <svg
              className="fixed inset-0 z-50 pointer-events-none"
              width="100%"
              height="100%"
              style={{ mixBlendMode: "multiply" }}
            >
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                  <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
                </radialGradient>
              </defs>
              
              {/* Glow around highlight */}
              <rect
                x={highlightRect.left - 20}
                y={highlightRect.top - 20}
                width={highlightRect.width + 40}
                height={highlightRect.height + 40}
                rx={highlightRect.radius}
                fill="url(#glow)"
                opacity="0.6"
              />
              
              {/* Animated border */}
              <rect
                x={highlightRect.left}
                y={highlightRect.top}
                width={highlightRect.width}
                height={highlightRect.height}
                rx={highlightRect.radius}
                fill="none"
                stroke="rgba(16, 185, 129, 0.8)"
                strokeWidth="2"
                style={{
                  animation: "borderPulse 2s ease-in-out infinite"
                }}
              />
            </svg>
          )}

          <style>{`
            @keyframes borderPulse {
              0%, 100% { stroke-width: 2; stroke: rgba(16, 185, 129, 0.8); }
              50% { stroke-width: 3; stroke: rgba(16, 185, 129, 1); }
            }
          `}</style>
        </>
      )}

      {/* Tooltip Card */}
      <div style={getTooltipStyle()}>
        <div className="bg-gradient-to-br from-slate-900/98 to-slate-950/98 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl shadow-2xl shadow-emerald-500/30 p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header with icon and progress */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3 flex-1">
              {currentStep.icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30 flex-shrink-0">
                  {currentStep.icon}
                </div>
              )}
              {!currentStep.icon && (
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-500/30 flex-shrink-0">
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
              className="text-gray-400 hover:text-white transition-colors ml-2 p-1 hover:bg-slate-800 rounded-lg flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-5">
            <h3 className="text-lg font-bold text-emerald-300 mb-2 flex items-center gap-2">
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
      </div>
    </>
  );
}