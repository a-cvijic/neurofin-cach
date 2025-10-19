import React from "react";

export default function ChatMessages({ messages, onChip }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4" data-walkthrough-id="chat-messages">
      {messages.map((m) => {
        const isUser = m.sender === "user";
        return (
          <div
            key={m.id}
            className={`flex ${isUser ? "justify-end" : "justify-start"} w-full`}
          >
            <div
              className={`${
                isUser
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-3xl rounded-br-none shadow-lg shadow-emerald-500/20 md:w-auto md:max-w-xs"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 text-gray-100 rounded-3xl rounded-bl-none shadow-xl w-full md:w-[82%] lg:w-[86%] 2xl:w-[90%]"
              } backdrop-blur px-5 py-4 transition-all hover:shadow-2xl`}
            >
              {/* Header for AI cards */}
              {!isUser && (m.title || m.subtitle) && (
                <div className="mb-3 border-b border-emerald-500/20 pb-3">
                  {m.title && (
                    <h3 className="text-xl font-bold text-emerald-300 tracking-tight flex items-center gap-2">
                      <span className="text-2xl">{m.title.match(/[^\w\s]/)?.[0]}</span>
                      {m.title.replace(/[^\w\s]/g, '')}
                    </h3>
                  )}
                  {m.subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{m.subtitle}</p>
                  )}
                </div>
              )}

              {/* Text body with better formatting */}
              {m.text && (
                <div className={`text-sm leading-relaxed ${isUser ? "" : "text-gray-200"}`}>
                  {m.text.split('\n').map((line, i) => {
                    // Handle bold text (wrapped in **)
                    if (line.includes('**')) {
                      const parts = line.split(/\*\*(.*?)\*\*/g);
                      return (
                        <p key={i} className={i > 0 ? 'mt-2' : ''}>
                          {parts.map((part, j) => 
                            j % 2 === 1 ? <strong key={j} className="text-emerald-300 font-bold">{part}</strong> : part
                          )}
                        </p>
                      );
                    }
                    // Handle bullet points
                    if (line.trim().startsWith('•')) {
                      return (
                        <p key={i} className="ml-4 mt-1.5 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          <span>{line.replace('•', '').trim()}</span>
                        </p>
                      );
                    }
                    // Handle numbered lists
                    if (/^\d+\./.test(line.trim())) {
                      return (
                        <p key={i} className="ml-4 mt-1.5 flex items-start gap-2">
                          <span className="text-emerald-400 font-semibold">{line.match(/^\d+\./)?.[0]}</span>
                          <span>{line.replace(/^\d+\./, '').trim()}</span>
                        </p>
                      );
                    }
                    // Regular paragraphs
                    return line.trim() ? <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p> : null;
                  })}
                </div>
              )}

              {/* Chart / Widget */}
              {m.chart && (
                <div className="mt-4 bg-slate-950/30 rounded-xl p-4 border border-emerald-500/10">
                  {m.chart}
                </div>
              )}

              {/* Action Chips */}
              {!isUser && Array.isArray(m.chips) && m.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-emerald-500/20 walkthrough-chips" data-walkthrough-id="action-chips">
                  {m.chips.map((c) => (
                    <button
                      key={c}
                      onClick={() => onChip?.(c)}
                      className="group text-xs bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-full transition-all hover:scale-105 font-semibold flex items-center gap-2"
                    >
                      <span>{c}</span>
                      <span className="text-emerald-400 group-hover:translate-x-0.5 transition-transform">→</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}