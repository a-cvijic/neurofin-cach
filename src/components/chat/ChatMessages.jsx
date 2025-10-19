import React from "react";


export default function ChatMessages({ messages, onChip }) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-4">
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
                  ? "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-3xl rounded-br-none"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 text-gray-100 rounded-3xl rounded-bl-none"
              } shadow-xl backdrop-blur px-5 py-4 w-full md:w-[82%] lg:w-[86%] 2xl:w-[90%]`}
            >
              {/* Titles for AI cards */}
              {!isUser && (m.title || m.subtitle) && (
                <div className="mb-2">
                  {m.title && (
                    <h3 className="text-lg font-bold text-emerald-300 tracking-tight">
                      {m.title}
                    </h3>
                  )}
                  {m.subtitle && (
                    <p className="text-sm text-gray-400">{m.subtitle}</p>
                  )}
                </div>
              )}

              {/* Text body */}
              {m.text && (
                <p className={`text-sm leading-relaxed ${isUser ? "" : "text-gray-200"}`}>
                  {m.text}
                </p>
              )}

              {/* Chart / Widget */}
              {m.chart && <div className="mt-3">{m.chart}</div>}

              {/* Chips */}
              {!isUser && Array.isArray(m.chips) && m.chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {m.chips.map((c) => (
                    <button
                      key={c}
                      onClick={() => onChip?.(c)}
                      className="text-xs bg-emerald-500/20 hover:bg-emerald-500/35 border border-emerald-500/40 text-emerald-300 px-3 py-2 rounded-full transition-all hover:scale-[1.02] font-semibold"
                    >
                      {c}
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