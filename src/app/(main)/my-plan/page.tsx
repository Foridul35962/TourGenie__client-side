"use client"

import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Calendar, Users, Wallet,
  Trash2, ArrowRight, Navigation, Sparkles
} from "lucide-react";
import placeholder from '@/asset/placeholder.jpg';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { deletePlan, getAllPlans, optimizeDeleteTrip } from "@/store/slice/tripPlanSlice";
import { toast } from "react-toastify";

const MyPlanPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { tripAllPlans, allPlanFetched } = useSelector((state: RootState) => state.tripPlan)

  useEffect(() => {
    if (!allPlanFetched) {
      dispatch(getAllPlans())
    }
  }, [dispatch])

  const handleDelete = async (planId: string) => {
    if (window.confirm('Are you really want to remove this plan?')) {
      try {
        dispatch(optimizeDeleteTrip({ planId }))
        await dispatch(deletePlan(planId)).unwrap()
      } catch (err: any) {
        toast.error(err.message)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FCFCFC] pt-8 pb-20 relative overflow-hidden">
      {/* Background Aesthetic */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-red-50 rounded-full blur-[120px] -z-10 opacity-60"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-red-600 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Navigation size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">User Dashboard</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-[1000] text-slate-900 tracking-tighter leading-none">
              My Saved <span className="text-red-600 italic">Expeditions</span>
            </h1>
          </div>
          <div className="bg-white border border-slate-100 px-6 py-4 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-400 rounded-2xl">
              <Sparkles size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Plans</p>
              <p className="text-xl font-black text-slate-900 leading-none">{tripAllPlans.length}</p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        {tripAllPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tripAllPlans.map((item: any) => (
              <div key={item._id} className="group bg-white rounded-[35px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-red-500/5 transition-all duration-500 flex flex-col relative overflow-hidden">

                {/* Visual Header / Image */}
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={placeholder}
                    alt={item.plan.tripName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-red-600 tracking-widest shadow-sm">
                    {item.plan.budget} Plan
                  </div>

                  {/* Delete Action Overlay */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-5 cursor-pointer right-5 p-3 bg-white/90 backdrop-blur-md text-slate-400 hover:text-red-600 rounded-2xl shadow-sm transition-colors group/delete">
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-8 grow flex flex-col">
                  <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">
                    <MapPin size={12} className="text-red-500" />
                    {item.plan.origin} to {item.plan.destination}
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-6 leading-tight group-hover:text-red-600 transition-colors">
                    {item.plan.tripName}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-400 rounded-xl"><Calendar size={14} /></div>
                      <span className="text-xs font-bold text-slate-600">{item.plan.days} Days</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-50 text-slate-400 rounded-xl"><Users size={14} /></div>
                      <span className="text-xs font-bold text-slate-600">{item.plan.totalMembers} Members</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex items-center gap-3">
                    <Link
                      href={`/my-plan/${item._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-200"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center bg-white border border-dashed border-slate-200 rounded-[50px]">
            <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Navigation size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Expeditions Found</h3>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">You haven't saved any AI travel plans yet. Let's create your first masterpiece.</p>
            <Link
              href="/create-plan"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-200"
            >
              Start Planning
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlanPage;