import React from 'react';
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import LandingPageButton from '@/components/common/LandingPageButton';

export default function Home() {
  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-8 overflow-hidden">
        {/* Soft Background Glows */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-red-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-fade-in">
            <Sparkles size={18} />
            <span>AI-Powered Travel Planning</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight">
            Your Next Adventure, <br />
            Planned by <span className="text-red-600 italic">Genie AI</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-gray-500 text-lg lg:text-xl mb-10 font-medium">
            Tour Genie uses Gemini AI to create personalized itineraries based on your preferences, budget, and style. Travel smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/create-plan" 
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-red-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Planning Free
              <ArrowRight size={20} />
            </Link>
            <Link 
              href="/view-plan" 
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all"
            >
              View Sample Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4">Why Choose Tour Genie?</h2>
            <div className="h-1.5 w-20 bg-red-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Compass size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Custom Itineraries</h3>
              <p className="text-gray-500 leading-relaxed">
                No more cookie-cutter plans. Get a day-by-day schedule tailored specifically to your interests.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Sparkles size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Intelligence</h3>
              <p className="text-gray-500 leading-relaxed">
                Powered by Gemini API, we analyze thousands of locations to find the hidden gems just for you.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Reliable Data</h3>
              <p className="text-gray-500 leading-relaxed">
                Get real-time suggestions for hotels, restaurants, and attractions that fit your budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-[2.5rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-6">
                Ready to explore the world?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Join thousands of travelers who use Tour Genie to plan their dream vacations in seconds.
              </p>
              <LandingPageButton />
            </div>
          </div>
        </div>
      </section>      
    </div>
  );
}