"use client";

import React from 'react';

const FirstLoading = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
            {/* Background Grid Effect */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[grid-white_20px_20px] mask-[radial-gradient(ellipse_at_center,black,transparent)]"></div>

            <div className="relative flex flex-col items-center">
                {/* Animated Hexagon or Outer Ring */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-32 h-32 border border-red-600/20 rounded-full scale-150 animate-[ping_2s_linear_infinite]"></div>
                    <div className="absolute w-32 h-32 border-2 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

                    {/* Central Logo */}
                    <div className="relative z-10 w-20 h-20 bg-[#1a1a1a] border border-red-900/40 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                        <span className="text-3xl font-black text-white italic tracking-tighter">
                            T<span className="text-red-600 font-normal">G</span>
                        </span>
                    </div>
                </div>

                {/* Text Area */}
                <div className="mt-16 text-center">
                    <h2 className="text-white text-lg font-bold tracking-[0.4em] uppercase">
                        Tour <span className="text-red-600">Genie</span>
                    </h2>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="w-48 h-0.5 bg-gray-900 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-red-600 to-transparent animate-shimmer"></div>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono tracking-widest mt-2">
                            CONNECTING_TO_GEMINI_CORE...
                        </span>
                    </div>
                </div>
            </div>

            {/* Floating Red Particles (Blur effect) */}
            <div className="absolute top-1/4 -left-10 w-64 h-64 bg-red-600 rounded-full blur-[140px] opacity-10"></div>
            <div className="absolute bottom-1/4 -right-10 w-64 h-64 bg-red-600 rounded-full blur-[140px] opacity-10"></div>

            <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
        </div>
    );
};

export default FirstLoading;