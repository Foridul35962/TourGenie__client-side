"use client"

import Image from 'next/image';
import {
  Bus, MapPin, Calendar, Users, Wallet,
  Utensils, Info, CheckCircle2, Navigation, Hotel,
  Clock, Lightbulb, TrendingUp, ArrowRight,
  Star
} from 'lucide-react';
import placeholder from '@/asset/placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { savePlan } from '@/store/slice/tripPlanSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const TripPlan = ({ plans, task }: { plans: any, task?: string }) => {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { tripLoading } = useSelector((state: RootState) => state.tripPlan)

  const handleSave = async () => {
    try {
      await dispatch(savePlan({ plans })).unwrap()
      toast.success('Plan saved')
      router.push('/my-plan')
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
    }
  }

  if (!plans) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Architecting Your Plan...</p>
    </div>
  );

  return (
    <div className="min-h-screen text-black bg-white pt-8 pb-20 relative selection:bg-red-100 selection:text-red-600">
      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-red-50/40 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- HERO SECTION --- */}
        <div className="mb-20">
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
            {/* Left Side: Brand/Logic Tag */}
            <div className="flex items-center gap-2 text-red-600">
              <div className="p-2 bg-red-50 rounded-lg">
                <Navigation size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Proprietary AI Logic
              </span>
            </div>

            {task === "save" && (
              <div className="w-full sm:w-auto flex justify-end">
                <button
                  disabled={tripLoading}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-300 cursor-pointer text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-red-200 active:scale-95 disabled:cursor-not-allowed"
                  onClick={handleSave}
                >
                  {tripLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Star size={16} className="fill-white" />
                  )}
                  {tripLoading ? "Saving..." : "Save Plan"}
                </button>
              </div>
            )}
          </div>
          <h1 className="text-6xl lg:text-8xl font-[1000] text-slate-900 tracking-tighter mb-10 leading-[0.95]">
            {plans.tripName}
          </h1>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Users size={18} />, label: 'Travelers', val: `${plans.totalMembers} Person` },
              { icon: <Calendar size={18} />, label: 'Duration', val: `${plans.days} Days` },
              { icon: <TrendingUp size={18} />, label: 'Pace', val: plans.prompt.pace },
              { icon: <Wallet size={18} />, label: 'Budget', val: plans.budget }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-50/50 p-6 rounded-[30px] border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300">
                <div className="text-red-600">{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-sm font-black text-slate-900">{stat.val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TRANSPORTATION & ROUTE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          <div className="lg:col-span-2 bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700"><Bus size={150} /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Bus className="text-red-500" size={24} />
                <h2 className="text-2xl font-black uppercase tracking-tight">Logistic Strategy</h2>
              </div>
              <p className="text-sm font-black text-red-500 uppercase tracking-widest mb-3">Mode: {plans.transportation.mode}</p>
              <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-xl mb-8">{plans.transportation.details}</p>
              <div className="inline-block bg-white/5 border border-white/10 p-5 rounded-3xl">
                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Estimated Cost</p>
                <p className="text-2xl font-black text-white">{plans.transportation.estimatedCost}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-600 rounded-[40px] p-10 text-white flex flex-col justify-between shadow-2xl shadow-red-200">
            <div className="flex justify-between items-start">
              <Navigation size={32} />
              <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Route Detail</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <p className="font-bold uppercase tracking-widest text-sm leading-none">{plans.origin}</p>
              </div>
              <div className="w-0.5 h-10 bg-white/30 ml-0.75 my-1"></div>
              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <p className="font-bold uppercase tracking-widest text-sm leading-none">{plans.destination}</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- ACCOMMODATION --- */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Hotel className="text-red-600" size={26} />
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Curated Stays</h2>
            </div>
            <div className="h-0.5 grow ml-10 bg-slate-50 hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.accommodation.map((hotel: any, index: number) => (
              <div key={index} className="group flex flex-col">
                <div className="relative h-64 rounded-[35px] overflow-hidden mb-6 shadow-sm">
                  <Image
                    src={hotel.imageUrl || placeholder}
                    alt={hotel.hotelName}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute top-5 left-5 bg-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-red-600 tracking-widest shadow-xl">
                    {hotel.type}
                  </div>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">{hotel.hotelName}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4 grow">{hotel.description}</p>
                <div className="flex items-center gap-2 text-red-600 font-black text-sm uppercase tracking-tighter">
                  {hotel.estimatedCostPerNight} <span className="text-slate-300">/ night</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- DAILY ITINERARY --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3 mb-16">
            <Calendar className="text-red-600" size={26} />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Timeline Architecture</h2>
          </div>
          <div className="space-y-24">
            {plans.dailyItinerary.map((dayPlan: any, dIdx: number) => (
              <div key={dIdx} className="relative">
                <div className="flex items-center gap-6 mb-12">
                  <div className="text-[80px] font-black text-slate-400 leading-none">0{dayPlan.day}</div>
                  <div className="h-0.5 grow bg-slate-50"></div>
                  <div className="bg-red-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">Day Sequence</div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {dayPlan.activities.map((act: any, aIdx: number) => (
                    <div key={aIdx} className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-2 rounded-[45px] hover:bg-slate-50 transition-all duration-500 border border-transparent hover:border-slate-100">
                      <div className="lg:col-span-4 h-72 relative rounded-[40px] overflow-hidden shadow-sm">
                        <Image
                          src={act.imageUrl || placeholder}
                          alt={act.placeName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="lg:col-span-8 p-6 lg:pr-12">
                        <div className="flex items-center gap-4 mb-4 text-red-600">
                          <Clock size={16} />
                          <span className="text-[10px] font-black uppercase tracking-[0.3em]">{act.timeSlot}</span>
                          <span className="text-slate-200">|</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{act.area}</span>
                        </div>
                        <h4 className="text-3xl font-black text-slate-900 mb-6 group-hover:text-red-600 transition-colors">{act.placeName}</h4>
                        <p className="text-slate-500 font-medium leading-relaxed mb-8">{act.description}</p>

                        <div className="flex flex-wrap gap-3">
                          <div className="bg-white border border-slate-100 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <Wallet size={14} className="text-slate-400" />
                            <span className="text-xs font-bold text-slate-700">{act.estimatedCost}</span>
                          </div>
                          <div className="bg-red-50 border border-red-100 px-5 py-3 rounded-2xl flex items-center gap-3">
                            <Lightbulb size={14} className="text-red-600" />
                            <span className="text-xs font-bold text-red-700">{act.tips}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- GASTRONOMY & BUDGET --- */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 mb-24">
          {/* Gastronomy */}
          <div className="bg-slate-50 rounded-[50px] p-12 lg:p-16 border border-slate-100">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-10">
                  <Utensils className="text-red-600" size={24} />
                  <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Gastronomy</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {plans.food.famousLocalDishes.map((dish: string, i: number) => (
                    <div key={i} className="bg-white px-6 py-3 rounded-2xl border border-slate-200 font-bold text-sm text-slate-700 flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-red-500" />
                      {dish}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 lg:border-l lg:border-slate-200 lg:pl-16 flex flex-col justify-center">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Recommended Palette</p>
                <p className="text-2xl font-bold text-slate-800 italic leading-relaxed">"{plans.food.recommendations}"</p>
              </div>
            </div>
          </div>

          {/* Final Budget Architecture */}
          <div className="bg-white border border-slate-100 rounded-[50px] p-12 lg:p-20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-[0.03] text-red-600 pointer-events-none"><Wallet size={300} /></div>

            <div className="flex items-center gap-3 mb-16">
              <Wallet className="text-red-600" size={28} />
              <h2 className="text-3xl font-black text-slate-900 tracking-tight text-center">Financial Breakdown</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              <div className="space-y-10">
                {Object.entries(plans.budgetBreakdown).map(([key, value]: [string, any], i) => {
                  if (key === "totalEstimatedCost" || key === "notes") return null;
                  return (
                    <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-6 group">
                      <div className="max-w-xs">
                        <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm text-slate-400 font-medium group-hover:text-slate-600 transition-colors">{value.description}</p>
                      </div>
                      <p className="text-xl font-black text-slate-900">{value.estimatedCost}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-10">
                <div className="bg-slate-950 rounded-[45px] p-12 text-center text-white relative shadow-2xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 rounded-full blur-[80px] opacity-20"></div>
                  <p className="text-xs font-black text-red-500 uppercase tracking-[0.5em] mb-6">Aggregate Total Cost</p>
                  <p className="text-6xl font-[1000] tracking-tighter mb-4">{plans.budgetBreakdown.totalEstimatedCost}</p>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <Users size={14} className="text-red-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total Group of {plans.totalMembers}</span>
                  </div>
                </div>
                <div className="bg-red-50 p-8 rounded-[35px] border border-red-100 flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <Info className="text-red-600" size={22} />
                  </div>
                  <p className="text-xs font-bold text-red-900/70 leading-relaxed uppercase tracking-widest">
                    {plans.budgetBreakdown.notes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;