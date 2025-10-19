import React from "react";

export default function NeuralLoader() {
  return (
    <div className="flex flex-col items-start gap-2 mt-4 animate-pulse-slow">
      <div className="flex gap-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-5 bg-gradient-to-t from-emerald-600 to-green-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></div>
        ))}
      </div>
      <div className="text-emerald-400 text-xs font-semibold tracking-widest mt-2">
        Processing with OTP Neural Engine...
      </div>
    </div>
  );
}