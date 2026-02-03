"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Wallet, Users, Sparkles, Loader2, Minus, Plus, Plane, Heart, Home, Users2, DollarSign, Coins, Gem, Navigation } from 'lucide-react';
import Image from 'next/image';
import logo from '@/asset/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { createPlan } from '@/store/slice/aiSlice';
import { toast } from 'react-toastify';

const ChatPage = () => {
    const { allFields, aiLoading } = useSelector((state: RootState) => state.ai);
    const [showOtherMembers, setShowOtherMembers] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

    const [formData, setFormData] = useState({
        origin: '',
        destination: '',
        days: 1,
        budgetType: '',
        members: '',
        prompt: ''
    });

    useEffect(() => {
        if (allFields) {
            const m = Number(allFields.members);
            let matchedMember = '';
            let isOther = false;

            if (m === 1) matchedMember = 'Just Me';
            else if (m === 2) matchedMember = 'A Couple';
            else if (m >= 4 && m <= 5) matchedMember = '4-5 People';
            else if (m >= 7 && m <= 8) matchedMember = '7-8 People';
            else if (m > 0) {
                matchedMember = 'Others';
                isOther = true;
            }

            setShowOtherMembers(isOther);

            setFormData({
                origin: allFields.origin || '',
                destination: allFields.destination || '',
                days: Number(allFields.days) || 1,
                budgetType: allFields.budgetType ? (allFields.budgetType.charAt(0).toUpperCase() + allFields.budgetType.slice(1)) : '',
                members: isOther ? String(allFields.members) : matchedMember,
                prompt: allFields.originalPrompt
            });
        }
    }, [allFields]);

    const handleSelect = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateDays = (type: string) => {
        setFormData(prev => ({
            ...prev,
            days: type === 'inc' ? prev.days + 1 : Math.max(1, prev.days - 1)
        }));
    };

    const handleSubmit = async () => {
        try {
            await dispatch(createPlan(formData)).unwrap()
            toast.success('Plan create successfully')
        } catch (error:any) {
            toast.error(error.message)
        }
    };

    return (
        <div className="flex text-black flex-col h-screen bg-slate-50">
            {/* Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center gap-3 sticky top-0 z-20">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center border border-red-100">
                    <Image src={logo} alt="Logo" width={24} height={24} />
                </div>
                <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Tour Genie AI</h2>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8">
                <div className="max-w-2xl mx-auto space-y-10 pb-24">

                    {/* 1. Route Section */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Plan Your Route</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="relative group">
                                <Navigation size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Starting From..."
                                    value={formData.origin}
                                    onChange={(e) => handleSelect('origin', e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-600 font-bold text-sm transition-all"
                                />
                            </div>
                            <div className="relative group">
                                <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500" />
                                <input
                                    type="text"
                                    placeholder="Destination..."
                                    value={formData.destination}
                                    onChange={(e) => handleSelect('destination', e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-red-600 font-bold text-sm transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 2. Members Selection */}
                    <div className="space-y-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Who's going?</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                            {[
                                { id: 'Just Me', icon: <Plane size={22} />, label: 'Solo', sub: '1 Person' },
                                { id: 'A Couple', icon: <Heart size={22} />, label: 'Couple', sub: '2 People' },
                                { id: '4-5 People', icon: <Home size={22} />, label: 'Family', sub: '4-5 People' },
                                { id: '7-8 People', icon: <Users2 size={22} />, label: 'Friends', sub: '7-8 People' },
                                { id: 'Others', icon: <Plus size={22} />, label: 'Others', sub: 'Custom' },
                            ].map((item) => {
                                // Dynamic Active State check
                                const isSelected = 
                                    (item.id === 'Others' && showOtherMembers) || 
                                    (formData.members === item.id);

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            if (item.id === 'Others') {
                                                setShowOtherMembers(true);
                                                handleSelect('members', '');
                                            } else {
                                                setShowOtherMembers(false);
                                                handleSelect('members', item.id);
                                            }
                                        }}
                                        className={`group p-4 rounded-[24px] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 min-h-27.5 ${isSelected
                                            ? 'border-red-600 bg-red-50/50 shadow-md shadow-red-100 scale-[1.02]'
                                            : 'border-slate-100 bg-white hover:border-red-200 hover:bg-slate-50/50'
                                        }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-red-50 group-hover:text-red-400'}`}>
                                            {item.icon}
                                        </div>
                                        <div className="text-center">
                                            <p className={`text-[11px] font-black uppercase tracking-tight ${isSelected ? 'text-red-600' : 'text-slate-800'}`}>
                                                {item.label}
                                            </p>
                                            <p className={`text-[9px] font-bold uppercase tracking-tighter opacity-60 ${isSelected ? 'text-red-500' : 'text-slate-400'}`}>
                                                {item.sub}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        {showOtherMembers && (
                            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                                <input
                                    type="text"
                                    placeholder="Enter member count (e.g. 15 people)"
                                    value={formData.members !== 'Just Me' && formData.members !== 'A Couple' && formData.members !== '4-5 People' && formData.members !== '7-8 People' ? formData.members : ''}
                                    className="w-full mt-2 px-5 py-4 bg-white border-2 border-red-100 rounded-2xl focus:border-red-600 outline-none font-bold text-sm shadow-sm"
                                    onChange={(e) => handleSelect('members', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* 3. Budget & 4. Days (Remain same as your base) */}
                    <div className="space-y-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">What's your budget?</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { id: 'Cheap', title: 'Cheap', desc: 'Stay conscious of costs', icon: <Coins className="text-green-500" /> },
                                { id: 'Moderate', title: 'Moderate', desc: 'Keep cost on the average', icon: <DollarSign className="text-yellow-500" /> },
                                { id: 'Luxury', title: 'Luxury', desc: 'Don\'t worry about cost', icon: <Gem className="text-purple-500" /> },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelect('budgetType', item.id)}
                                    className={`p-5 rounded-[24px] border-2 text-left transition-all bg-white flex items-start gap-4 ${formData.budgetType.toLowerCase() === item.id.toLowerCase() ? 'border-red-600 bg-red-50/30 shadow-sm shadow-red-50' : 'border-slate-100 hover:border-slate-200'}`}
                                >
                                    <div className="p-3 bg-slate-50 rounded-xl">{item.icon}</div>
                                    <div>
                                        <h4 className="font-black text-slate-900 text-xs uppercase">{item.title}</h4>
                                        <p className="text-[10px] text-slate-400 font-medium leading-tight mt-1">{item.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm text-center">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Trip Duration</p>
                        <div className="flex items-center justify-center gap-10">
                            <button onClick={() => updateDays('dec')} className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-sm">
                                <Minus size={20} />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-4xl font-black text-slate-900">{formData.days}</span>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Days</span>
                            </div>
                            <button onClick={() => updateDays('inc')} className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-sm">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="pt-6">
                        <button
                            onClick={handleSubmit}
                            disabled={aiLoading || !formData.destination || !formData.budgetType || !formData.members || !formData.origin || !formData.destination}
                            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-red-500/20"
                        >
                            {aiLoading ? (
                                <><Loader2 className="animate-spin" size={20} /> <span>Creating Itinerary...</span></>
                            ) : (
                                <><Sparkles size={18} /> <span>Generate Travel Plan</span></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;