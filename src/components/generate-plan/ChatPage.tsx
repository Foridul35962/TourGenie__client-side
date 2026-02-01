"use client";

import React, { useState } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import Image from 'next/image';
import logo from '@/asset/logo.png';

const ChatPage = () => {
  const [input, setInput] = useState("");

  const messages = [
    {
      id: 1,
      role: 'ai',
      text: "Hello Foridul! I'm your Tour Genie. Where would you like to explore next? I can help you plan the perfect itinerary.",
      time: '10:00 AM'
    },
    {
      id: 2,
      role: 'user',
      text: "I want to plan a 5-day trip to Cox's Bazar within a budget of 20,000 BDT.",
      time: '10:01 AM'
    },
    {
      id: 3,
      role: 'ai',
      text: "That sounds like a great plan! For a budget of 20,000 BDT, I recommend focusing on local beach points, Inani beach, and a half-day trip to Himchari. Should I generate the day-by-day plan for you?",
      time: '10:02 AM'
    }
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* --- Chat Header --- */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
              <Image src={logo} alt="AI" width={24} height={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Tour Genie AI</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Online | Powered by Gemini</p>
          </div>
        </div>
      </div>

      {/* --- Chat Messages Area --- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
            <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {/* Avatar */}
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${msg.role === 'ai' ? 'bg-red-600 text-white' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'ai' ? <Sparkles size={16} /> : <User size={16} />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div className={`px-5 py-3 rounded-4xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'ai' 
                  ? 'bg-slate-50 text-slate-700 rounded-tl-none border border-slate-100' 
                  : 'bg-red-600 text-white rounded-tr-none shadow-red-200'
                }`}>
                  {msg.text}
                </div>
                <p className={`text-[10px] font-bold text-gray-400 uppercase tracking-widest ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Chat Input Area --- */}
      <div className="p-6 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto relative flex items-center gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your Genie to plan a trip..."
              className="w-full pl-4 sm:pl-12 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all font-medium text-slate-700"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
               <button 
                className={`p-2.5 rounded-xl transition-all ${input ? 'bg-red-600 text-white shadow-lg shadow-red-200 scale-100' : 'bg-gray-200 text-gray-400 scale-90'}`}
                disabled={!input}
               >
                 <Send size={18} />
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;