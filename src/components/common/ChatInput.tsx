"use client"

import { Send } from 'lucide-react'
import React, { useState } from 'react'

const ChatInput = () => {
    const [input, setInput] = useState("");

    return (
        <div className="max-w-4xl mx-auto relative flex items-center gap-3">
            <div className="relative flex-1">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask your Genie to plan a trip..."
                    className="w-full pl-12 pr-14 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-red-600/5 focus:border-red-600 transition-all font-medium text-slate-700"
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
    )
}

export default ChatInput