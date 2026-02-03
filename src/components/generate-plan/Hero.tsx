"use client";

import React, { SetStateAction, useState } from 'react';
import { Sparkles, ArrowRight, Map, ShieldCheck, Globe2, Calendar, Wallet, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { searchField } from '@/store/slice/aiSlice';
import { toast } from 'react-toastify';

const Hero = ({ setReady }: { setReady: React.Dispatch<SetStateAction<boolean>> }) => {
    const [prompt, setPrompt] = useState<string>("")
    const { aiLoading } = useSelector((state: RootState) => state.ai)
    const dispatch = useDispatch<AppDispatch>()

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        try {
            await dispatch(searchField({ prompt })).unwrap()
            setReady(true)
        } catch (error: any) {
            toast.error(error.message)
        }
    };

    const suggestions = [
        { text: "3 days in Sylhet under 10k", icon: <Calendar size={16} /> },
        { text: "Solo trip to Kyoto Japan", icon: <Sparkles size={16} /> },
        { text: "Family weekend in Bali", icon: <Wallet size={16} /> }
    ];

    return (
        <div className="min-h-screen bg-[#FCFCFC] py-8 relative overflow-hidden">
            {/* Background Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-150 bg-linear-to-b from-red-50/40 to-transparent -z-10 pointer-events-none"></div>

            <div className="max-w-5xl mx-auto px-6">

                {/* Header Section */}
                <div className="max-w-3xl mb-14">
                    <h1 className="text-5xl lg:text-7xl font-[1000] text-slate-900 tracking-tighter leading-[1.05] mb-6">
                        Define your journey. <br />
                        <span className="text-red-600 italic">AI will execute.</span>
                    </h1>
                    <p className="text-slate-500 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                        Enter your travel concept. Our engine orchestrates every detail, from complex logistics to hidden cultural gems.
                    </p>
                </div>

                <div className="relative mb-16">
                    <form onSubmit={handleGenerate} className="relative group">
                        <div className="absolute -inset-1 bg-linear-to-r from-red-600/20 to-transparent rounded-[32px] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
                        <div className="relative flex flex-col md:flex-row items-center gap-3 bg-white border border-slate-200 p-3 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] focus-within:border-red-200 transition-all">
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt(e.target.value)}
                                placeholder="Where would you like to go?"
                                className="flex-1 min-w-0 bg-transparent px-4 py-5 text-xl font-bold text-slate-800 overflow-hidden focus:outline-none placeholder-slate-300"
                            />
                            <button
                                type="submit"
                                disabled={!prompt.trim() || aiLoading}
                                className="group relative w-full md:w-auto bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-10 py-5 rounded-2xl font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-red-500/30 overflow-hidden"
                            >
                                {aiLoading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span>Get Started</span>
                                        <ArrowRight
                                            size={18}
                                            className="group-hover:translate-x-1 transition-transform"
                                        />
                                    </div>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Suggestions Grid */}
                <div className="pb-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {suggestions.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setPrompt(item.text)}
                                className="flex cursor-pointer items-center gap-4 px-6 py-5 bg-white border border-slate-100 rounded-2xl text-slate-600 font-bold text-sm hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all duration-300 text-left group"
                            >
                                <span className="p-2 bg-slate-50 rounded-lg text-red-500 group-hover:bg-white transition-colors">
                                    {item.icon}
                                </span>
                                {item.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Trust & Logic Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-4">

                    <div className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-red-100 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-slate-50 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-10 transform transition-all duration-300 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:border-red-600">
                            <Map size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-[0.15em] text-xs mb-3">Logic Driven</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                                Itineraries calculated based on real-world transit data and seasonal trends.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-red-100 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-slate-50 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-10 transform transition-all duration-300 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:border-red-600">
                            <Globe2 size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-[0.15em] text-xs mb-3">Global Knowledge</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                                Accessing hyper-local data from Gemini Pro across 190+ countries.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 p-8 rounded-[32px] bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:border-red-100 hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                        <div className="w-14 h-14 bg-slate-50 group-hover:bg-red-600 group-hover:text-white group-hover:rotate-10 transform transition-all duration-300 rounded-2xl flex items-center justify-center text-slate-900 border border-slate-100 group-hover:border-red-600">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 uppercase tracking-[0.15em] text-xs mb-3">Verified Safety</h3>
                            <p className="text-sm text-slate-500 leading-relaxed font-medium group-hover:text-slate-600">
                                Suggestions are audited for current safety standards and travel advisories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero