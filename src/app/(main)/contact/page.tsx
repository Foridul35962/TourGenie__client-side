"use client";

import React from 'react';
import { Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';

const ContactPage = () => {
    return (
        <div className="min-h-screen bg-white py-10 relative overflow-hidden">
            {/* Background Minimalist Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-red-50/50 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[-5%] w-100 h-100 bg-red-50/50 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="max-w-3xl mb-24">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-100 bg-red-50/30 text-red-600 text-xs font-black uppercase tracking-widest mb-6">
                        Contact Support
                    </div>
                    <h1 className="text-6xl lg:text-[80px] font-black tracking-tighter text-slate-900 leading-[0.9] mb-8">
                        We're here to <br />
                        <span className="text-red-600">help you scale.</span>
                    </h1>
                    <p className="text-slate-500 text-xl font-medium leading-relaxed">
                        No forms, no waiting. Reach out to us directly through our official channels or visit our global headquarters.
                    </p>
                </div>

                {/* Contact Channels Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">

                    {/* Channel: Email */}
                    <div className="group p-10 bg-slate-50 rounded-[40px] border border-transparent hover:border-red-100 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                            <Mail size={28} />
                        </div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Direct Mail</h3>
                        <p className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">hello@tourgenie.ai</p>
                        <a
                            href="mailto:hello@tourgenie.ai"
                            target='_blank'
                            className="inline-flex items-center gap-2 text-red-600 font-bold group/link">
                            Send Email <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Channel: Community */}
                    <div className="group p-10 bg-slate-50 rounded-[40px] border border-transparent hover:border-red-100 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                            <MessageCircle size={28} />
                        </div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Live Chat</h3>
                        <p className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Discord Community</p>
                        <a href="https://www.facebook.com/foridul35962"
                            target='_blank'
                            className="inline-flex items-center gap-2 text-red-600 font-bold group/link">
                            Join Server <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                    </div>

                    {/* Channel: Headquarters */}
                    <div className="group p-10 bg-slate-50 rounded-[40px] border border-transparent hover:border-red-100 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/5">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-10 shadow-sm text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Global HQ</h3>
                        <p className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Dhaka, Bangladesh</p>
                        <a
                            href="https://www.google.com/maps?q=23.705186,90.416322"
                            target='_blank'
                            className="inline-flex items-center gap-2 text-red-600 font-bold group/link">
                            View on Maps <ArrowUpRight size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;