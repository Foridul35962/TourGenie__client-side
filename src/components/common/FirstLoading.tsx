"use client";

import React from 'react';

const FirstLoading = () => {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-white overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[grid-[#ff0000]_20px_20px] mask-[radial-gradient(ellipse_at_center,black,transparent)]"></div>

            <div className="relative flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-32 h-32 border border-red-600/10 rounded-full scale-150 animate-[ping_2s_linear_infinite]"></div>
                    
                    <div className="absolute w-28 h-28 border-2 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>

                    <div className="relative z-10 w-20 h-20 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-[0_10px_40px_rgba(220,38,38,0.1)]">
                        <span className="text-3xl font-black text-gray-900 italic tracking-tighter">
                            T<span className="text-red-600 font-normal">G</span>
                        </span>
                    </div>
                </div>

                {/* Text Area */}
                <div className="mt-16 text-center">
                    <h2 className="text-gray-900 text-lg font-bold tracking-[0.4em] uppercase">
                        Tour <span className="text-red-600">Genie</span>
                    </h2>

                    {/* Progress Indicator */}
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="w-48 h-1 bg-gray-100 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-red-600 to-transparent animate-shimmer"></div>
                        </div>
                        <span className="text-[10px] text-gray-400 font-mono font-bold tracking-widest mt-2">
                            SYNCING_WITH_AI...
                        </span>
                    </div>
                </div>
            </div>

            {/* Subtle Red Soft Glows */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-50 rounded-full blur-[120px] opacity-60"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-50 rounded-full blur-[120px] opacity-60"></div>

            <style jsx>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.8s infinite linear;
                }
            `}</style>
        </div>
    );
};

export default FirstLoading;