import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  AlertCircle,
  Check,
  ChevronRight,
  ShieldCheck,
  Info
} from 'lucide-react';

export const PlanBuilderScreen = ({ onBack, onProceedToCheckout }) => {
  const { planDraft, setPlanDraft, cooks } = useTiffin();
  const selectedCook = cooks.find((c) => c.id === planDraft.cookId) || cooks[0];

  const [durationMode, setDurationMode] = useState(planDraft.planType || 'monthly'); // 'weekly' | 'monthly' | 'custom'
  const [customDays, setCustomDays] = useState(planDraft.mealDays || 15);
  const [startDate, setStartDate] = useState(planDraft.startDate || '2026-10-15');
  const [mealType, setMealType] = useState(planDraft.mealType || 'Pure Veg');
  const [slot, setSlot] = useState(planDraft.deliverySlot || 'Lunch (12:30 PM - 1:30 PM)');

  // Determine current meal days based on mode
  let mealDays = 20;
  if (durationMode === 'weekly') mealDays = 5;
  else if (durationMode === 'monthly') mealDays = 20;
  else mealDays = Number(customDays);

  // Validation: custom duration must be between 5 and 60 meal days
  const isCustom = durationMode === 'custom';
  const isCustomInvalid = isCustom && (isNaN(customDays) || customDays < 5 || customDays > 60);

  const dailyRate = selectedCook.pricePerMeal || 110;
  const totalPrice = isCustomInvalid ? 0 : mealDays * dailyRate;

  const handleProceed = () => {
    if (isCustomInvalid) return;

    setPlanDraft({
      ...planDraft,
      cookId: selectedCook.id,
      planType: durationMode,
      mealDays,
      dailyRate,
      startDate,
      mealType,
      deliverySlot: slot
    });

    onProceedToCheckout();
  };

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Top Header */}
      <div className="bg-white p-4 border-b border-stone-200 flex items-center justify-between sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="font-heading font-bold text-sm text-stone-900">Customize Your Plan</h1>
          <p className="text-[11px] text-stone-500">{selectedCook.name}</p>
        </div>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-5">
        {/* Plan Duration Selector */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            1. Select Plan Duration
          </label>

          <div className="grid grid-cols-3 gap-2">
            {/* Weekly */}
            <button
              type="button"
              onClick={() => setDurationMode('weekly')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all relative ${
                durationMode === 'weekly'
                  ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold text-stone-500 block">Trial</span>
                <span className="font-heading font-bold text-stone-900 text-sm">Weekly</span>
              </div>
              <div className="mt-2 text-xs font-bold text-orange-600">
                5 Meals <span className="text-[10px] text-stone-400 block font-normal">(Mon - Fri)</span>
              </div>
            </button>

            {/* Monthly */}
            <button
              type="button"
              onClick={() => setDurationMode('monthly')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                durationMode === 'monthly'
                  ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-bl-md">
                Popular
              </div>
              <div>
                <span className="text-[11px] font-bold text-stone-500 block">Regular</span>
                <span className="font-heading font-bold text-stone-900 text-sm">Monthly</span>
              </div>
              <div className="mt-2 text-xs font-bold text-orange-600">
                20 Meals <span className="text-[10px] text-stone-400 block font-normal">(4 Weeks)</span>
              </div>
            </button>

            {/* Custom */}
            <button
              type="button"
              onClick={() => setDurationMode('custom')}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                durationMode === 'custom'
                  ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div>
                <span className="text-[11px] font-bold text-stone-500 block">Flexible</span>
                <span className="font-heading font-bold text-stone-900 text-sm">Custom</span>
              </div>
              <div className="mt-2 text-xs font-bold text-orange-600">
                5 to 60 <span className="text-[10px] text-stone-400 block font-normal">Choose days</span>
              </div>
            </button>
          </div>

          {/* Custom Duration Input & Strict Inline Validation */}
          {durationMode === 'custom' && (
            <div className="mt-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-700">
                  Enter Exact Meal Days:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id="custom-days-input"
                    type="number"
                    min={1}
                    max={100}
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
                    className={`w-20 px-3 py-1.5 text-center font-bold text-sm rounded-xl border bg-white focus:outline-none ${
                      isCustomInvalid
                        ? 'border-rose-500 text-rose-600 ring-2 ring-rose-500/20'
                        : 'border-stone-300 text-stone-900 focus:border-orange-500'
                    }`}
                  />
                  <span className="text-xs text-stone-500 font-medium">Days</span>
                </div>
              </div>

              {/* Exact Validation Message Required by Prompt */}
              {isCustomInvalid && (
                <div className="p-2 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 animate-fade-in font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Duration must be between 5 and 60 meal days</span>
                </div>
              )}
              <p className="text-[10px] text-stone-400">
                Custom plans include up to 4 pauses and 4 skips.
              </p>
            </div>
          )}
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            2. Choose Start Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={startDate}
              min="2026-10-01"
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-white border border-stone-200 text-stone-900 text-xs font-medium py-3 px-3.5 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
            />
            <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>
          <span className="text-[10px] text-stone-400 mt-1 block">
            Deliveries occur Monday to Friday (excluding Pune public holidays).
          </span>
        </div>

        {/* Meal Type & Dietary preference */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            3. Meal Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'Pure Veg', label: 'Pure Veg', icon: '🥬', sub: 'No egg/meat' },
              { id: 'Non-Veg', label: 'Non-Veg (Wed/Fri)', icon: '🍗', sub: 'Kolhapuri / Curry' }
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMealType(option.id)}
                className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all ${
                  mealType === option.id
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <div>
                  <span className="font-heading font-bold text-xs text-stone-900 block">
                    {option.label}
                  </span>
                  <span className="text-[10px] text-stone-500">{option.sub}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Delivery Slot */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            4. Delivery Time Window
          </label>
          <div className="space-y-1.5">
            {[
              'Lunch (12:30 PM - 1:30 PM)',
              'Dinner (7:30 PM - 8:30 PM)'
            ].map((timeOption) => (
              <label
                key={timeOption}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors text-xs font-medium ${
                  slot === timeOption
                    ? 'border-orange-500 bg-orange-50 text-orange-950 font-bold'
                    : 'border-stone-200 bg-white text-stone-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{timeOption}</span>
                </div>
                <input
                  type="radio"
                  name="deliverySlot"
                  checked={slot === timeOption}
                  onChange={() => setSlot(timeOption)}
                  className="accent-orange-600"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Live Price Summary Box */}
        <div className="p-4 bg-stone-900 text-stone-100 rounded-3xl space-y-2.5 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <span className="text-xs font-bold text-stone-300">Live Price Calculation</span>
            <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded-full font-mono">
              ₹{dailyRate} / day
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-stone-300">
              <span>Meal Days</span>
              <span className="font-semibold">{isCustomInvalid ? '—' : `${mealDays} days`}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Daily Rate</span>
              <span className="font-semibold">₹{dailyRate}</span>
            </div>
            <div className="flex justify-between text-stone-300">
              <span>Office Delivery</span>
              <span className="text-emerald-400 font-bold">FREE (₹0)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
            <span className="font-bold text-sm text-white">Total Plan Payable</span>
            <span className="font-heading font-extrabold text-xl text-orange-400">
              {isCustomInvalid ? '—' : `₹${totalPrice}`}
            </span>
          </div>
        </div>
      </div>

      {/* Floating Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center justify-between max-w-[430px] mx-auto">
        <div>
          <span className="text-[11px] text-stone-400 block">Total Payable</span>
          <span className="font-heading font-extrabold text-stone-900 text-base">
            {isCustomInvalid ? 'Fix duration' : `₹${totalPrice}`}
          </span>
        </div>

        <button
          id="proceed-checkout-btn"
          disabled={isCustomInvalid}
          onClick={handleProceed}
          className={`px-6 py-3 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${
            isCustomInvalid
              ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
          }`}
        >
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
