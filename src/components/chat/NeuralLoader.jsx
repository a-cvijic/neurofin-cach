import React from "react";

export default function NeuralLoader() {
  return (
    <div className="flex flex-col items-start gap-4 mt-6 p-4 bg-gradient-to-br from-emerald-950/30 to-slate-950/30 rounded-2xl border border-emerald-500/20 backdrop-blur-sm">
      {/* Animated Neural Network Grid */}
      <div className="w-full h-32 relative rounded-lg bg-slate-900/40 border border-emerald-500/10 overflow-hidden">
        {/* Grid background */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ background: "repeating-linear-gradient(0deg, rgba(16,185,129,0.1) 0px, rgba(16,185,129,0.1) 1px, transparent 1px, transparent 20px)" }}>
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>

        {/* Animated data points and connections */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Center pulsing core */}
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-emerald-400 to-green-300 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            <div className="absolute inset-4 bg-emerald-300 rounded-full"></div>
          </div>

          {/* Orbiting nodes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full"
              style={{
                animation: `orbit ${4 + i * 0.5}s linear infinite`,
                transformOrigin: "0 0",
                left: "50%",
                top: "50%",
                boxShadow: "0 0 8px rgba(16, 185, 129, 0.8)",
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(50px); }
            100% { transform: rotate(360deg) translateX(50px); }
          }
        `}</style>
      </div>

      {/* Status indicator and text */}
      <div className="flex items-center gap-3 w-full">
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-emerald-500 to-green-300 rounded-full"
              style={{
                animation: `pulse 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.25}s`,
              }}
            />
          ))}
        </div>
        <div>
          <p className="text-emerald-300 text-sm font-bold tracking-widest">
            NEURAL ENGINE ACTIVE
          </p>
          <p className="text-emerald-400/70 text-xs">
            Analyzing financial patterns with OTP AI...
          </p>
        </div>
      </div>

      {/* Real-time processing dots */}
      <div className="flex items-center gap-2 w-full px-1">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Processing:</span>
        <div className="flex gap-1 flex-1">
          {["Pattern", "Risk", "Opportunity", "Insight"].map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className="h-1 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full mx-auto mb-1"
                style={{
                  animation: `loadBar 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  width: "60%",
                }}
              />
              <p className="text-[9px] text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scaleY(0.5);
            opacity: 0.4;
          }
          50% { 
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @keyframes loadBar {
          0% { 
            width: 20%;
            opacity: 0.3;
          }
          50% { 
            width: 100%;
            opacity: 1;
          }
          100% { 
            width: 60%;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}