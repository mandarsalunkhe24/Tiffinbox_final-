import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Award,
  Calendar,
  Sparkles,
  Utensils,
  MapPin,
  Flame,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const CookDetailScreen = ({ cookId, onBack, onSubscribe }) => {
  const { cooks, setPlanDraft } = useTiffin();
  const cook = cooks.find((c) => c.id === cookId) || cooks[0];

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const [selectedDay, setSelectedDay] = useState('monday');

  const handleStartSubscribe = () => {
    setPlanDraft((prev) => ({
      ...prev,
      cookId: cook.id,
      dailyRate: cook.pricePerMeal
    }));
    onSubscribe(cook.id);
  };

  const dayMenu = cook.menu[selectedDay] || cook.menu.monday;

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Top Banner & Header */}
      <div className="relative h-48 bg-stone-900">
        <img
          src={cook.coverImage}
          alt={cook.name}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-3 left-3 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-sm transition-colors z-10"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Tag on Top Right */}
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
          📍 Pune Verified Kitchen
        </span>

        {/* Cook Summary on banner bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={cook.avatar}
              alt={cook.owner}
              className="w-12 h-12 rounded-2xl border-2 border-white object-cover shadow-md"
            />
            <div className="text-white">
              <h1 className="font-heading font-extrabold text-base leading-tight">
                {cook.name}
              </h1>
              <p className="text-xs text-stone-200">
                Managed by {cook.owner}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-orange-400 font-bold text-base leading-none block">
              ₹{cook.pricePerMeal}
            </span>
            <span className="text-[10px] text-stone-300">per meal</span>
          </div>
        </div>
      </div>

      {/* Badges & Trust Metrics */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs text-center">
          <div className="border-r border-stone-100 pr-1">
            <div className="flex items-center justify-center gap-1 text-stone-900 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{cook.rating}</span>
            </div>
            <span className="text-[10px] text-stone-400">({cook.reviewCount} reviews)</span>
          </div>

          <div className="border-r border-stone-100 pr-1">
            <div className="text-emerald-700 font-bold text-xs flex items-center justify-center gap-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>98%</span>
            </div>
            <span className="text-[10px] text-stone-400">Hygiene Score</span>
          </div>

          <div>
            <div className="text-stone-900 font-bold text-xs flex items-center justify-center gap-0.5">
              <Award className="w-3.5 h-3.5 text-orange-500" />
              <span>{cook.experienceYears} Yrs</span>
            </div>
            <span className="text-[10px] text-stone-400">Home Cooking</span>
          </div>
        </div>

        {/* Bio & Specialty */}
        <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-100/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-orange-950">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" />
            <span>Kitchen Specialty</span>
          </div>
          <p className="text-xs text-orange-900/90 leading-relaxed">
            {cook.specialty}
          </p>
          <div className="pt-1 text-[11px] text-orange-800/80 font-medium">
            📜 {cook.fssaiLicense} • Serving {cook.areasServed.join(', ').toUpperCase()}
          </div>
        </div>

        {/* 7-Day Interactive Menu */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div>
              <h2 className="font-heading font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span>7-Day Rotating Menu</span>
              </h2>
              <p className="text-[11px] text-stone-500">Fresh daily rotating menu planned weekly</p>
            </div>
          </div>

          {/* Day Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {daysOfWeek.map((day) => {
              const isActive = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider shrink-0 transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Active Day Menu Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3 mt-1 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600">
                  {selectedDay} Meal
                </span>
                <h3 className="font-heading font-bold text-stone-900 text-sm mt-0.5">
                  {dayMenu.title}
                </h3>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                dayMenu.isVeg
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {dayMenu.isVeg ? '🥬 100% Veg' : '🍗 Non-Veg'}
              </span>
            </div>

            {/* Dish Items Checklist */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-stone-400 block uppercase tracking-wider">
                What's in the tiffin:
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {dayMenu.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-700 bg-stone-50 p-2 rounded-xl border border-stone-100">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition estimate */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-[11px] text-stone-500">
              <span className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-500" />
                Est. {dayMenu.calories || '550 kcal'}
              </span>
              <span>Packed in 3-Tier Insulated Steel Box</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Subscribe CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center justify-between max-w-[430px] mx-auto">
        <div>
          <span className="text-[11px] text-stone-400 block">Subscription starts from</span>
          <span className="font-heading font-extrabold text-stone-900 text-base">
            ₹{cook.pricePerMeal * 5} <span className="text-xs font-normal text-stone-500">/ 5 days</span>
          </span>
        </div>

        <button
          id="subscribe-cta-btn"
          onClick={handleStartSubscribe}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-2xl shadow-md shadow-orange-500/25 transition-all flex items-center gap-1.5"
        >
          <span>Subscribe Now</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
