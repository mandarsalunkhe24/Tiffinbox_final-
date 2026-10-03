import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Calendar,
  Clock,
  PauseCircle,
  SkipForward,
  XCircle,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  MapPin
} from 'lucide-react';

export const MySubscriptionScreen = ({ onOpenPauseSkip, onOpenCancelRefund, onBrowseCooks }) => {
  const {
    subscription,
    resumePlan,
    cutoffCountdown,
    isCutoffPassed,
    setRulesModalOpen,
    setActiveRuleTab
  } = useTiffin();

  // Status Badge styling helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            ACTIVE
          </span>
        );
      case 'Paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            PAUSED
          </span>
        );
      case 'Pending Payment':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
            PENDING PAYMENT
          </span>
        );
      case 'Expired':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-300">
            EXPIRED
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            CANCELLED
          </span>
        );
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            REFUNDED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-600">
            {status}
          </span>
        );
    }
  };

  const percentUsed = Math.round((subscription.mealsUsed / subscription.totalMealDays) * 100) || 0;
  const isTerminated = ['Expired', 'Cancelled', 'Refunded'].includes(subscription.status);

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header with Business Rules Shortcut */}
      <div className="bg-white p-4 border-b border-stone-200 sticky top-0 z-20 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-base text-stone-900">
            My Tiffin Plan
          </h1>
          <p className="text-[11px] text-stone-500 font-mono">{subscription.id}</p>
        </div>

        <button
          onClick={() => {
            setActiveRuleTab('pause');
            setRulesModalOpen(true);
          }}
          className="flex items-center gap-1 text-[11px] font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-xl border border-orange-200 transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Rules</span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Main Subscription Card */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-3.5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                {subscription.planType} Plan ({subscription.totalMealDays} Meals)
              </span>
              <h2 className="font-heading font-bold text-stone-900 text-base mt-0.5">
                {subscription.cookName}
              </h2>
              <p className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>Hinjewadi Tech Park delivery</span>
              </p>
            </div>
            {getStatusBadge(subscription.status)}
          </div>

          {/* Dates Bar */}
          <div className="grid grid-cols-2 gap-2 bg-stone-50 p-2.5 rounded-2xl border border-stone-100 text-xs">
            <div>
              <span className="text-stone-400 text-[10px] block">Start Date</span>
              <span className="font-semibold text-stone-800">{subscription.startDate}</span>
            </div>
            <div>
              <span className="text-stone-400 text-[10px] block">End Date (Extended)</span>
              <span className="font-semibold text-stone-800">{subscription.endDate}</span>
            </div>
          </div>

          {/* Progress of Meals Used */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-stone-600">Meals Delivered Progress</span>
              <span className="font-bold text-stone-900 font-mono">
                {subscription.mealsUsed} of {subscription.totalMealDays} meals ({percentUsed}%)
              </span>
            </div>

            <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, percentUsed))}%` }}
              />
            </div>
          </div>

          {/* Counters: Pause Days Used & Skips Used */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider block">
                Pause Days Used
              </span>
              <span className="font-heading font-extrabold text-xl text-amber-950 font-mono">
                {subscription.pauseDaysUsed} <span className="text-xs text-amber-700 font-normal">/ 14</span>
              </span>
              <span className="text-[9px] text-amber-700/80 block mt-0.5">
                {14 - subscription.pauseDaysUsed} days remaining
              </span>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider block">
                Skips Used
              </span>
              <span className="font-heading font-extrabold text-xl text-blue-950 font-mono">
                {subscription.skipsUsed} <span className="text-xs text-blue-700 font-normal">/ {subscription.maxSkips || 4}</span>
              </span>
              <span className="text-[9px] text-blue-700/80 block mt-0.5">
                {(subscription.maxSkips || 4) - subscription.skipsUsed} skips remaining
              </span>
            </div>
          </div>

          {/* Resume Banner if currently Paused */}
          {subscription.status === 'Paused' && (
            <div className="p-3 bg-amber-100/90 rounded-2xl border border-amber-300 flex items-center justify-between text-xs text-amber-950">
              <div className="flex items-center gap-2">
                <PauseCircle className="w-5 h-5 text-amber-700 shrink-0" />
                <div>
                  <span className="font-bold block">Your plan is currently paused</span>
                  <span className="text-[11px] text-amber-800">Deliveries temporarily paused</span>
                </div>
              </div>
              <button
                onClick={resumePlan}
                className="px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            </div>
          )}

          {/* Refunded confirmation info if status is Refunded */}
          {subscription.status === 'Refunded' && (
            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-purple-900">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Plan Cancelled & Refunded</span>
              </div>
              <p className="text-[11px] text-purple-800">
                Refund amount of ₹{subscription.refundDetails?.refundAmount || 0} processed. 5-7 working days to source account.
              </p>
            </div>
          )}
        </div>

        {/* 9:00 PM Cut-off Live Status Widget */}
        <div className="p-3 bg-white rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <div>
              <span className="font-bold text-stone-800 block">Tomorrow's Delivery Cut-off</span>
              <span className="text-[10px] text-stone-500">Must request pause/skip before 9:00 PM</span>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-xl font-mono font-bold text-xs ${
            isCutoffPassed()
              ? 'bg-rose-100 text-rose-800'
              : 'bg-orange-100 text-orange-800'
          }`}>
            {isCutoffPassed() ? 'Cut-off Passed' : `in ${cutoffCountdown}`}
          </span>
        </div>

        {/* Month Calendar Grid with Color Coding */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-500" />
              <h3 className="font-heading font-bold text-xs text-stone-900">
                October 2026 Delivery Calendar
              </h3>
            </div>
            <span className="text-[10px] text-stone-400 font-mono">Today: Oct 14</span>
          </div>

          {/* Calendar Legend */}
          <div className="flex items-center justify-between text-[10px] text-stone-600 bg-stone-50 p-2 rounded-xl border border-stone-100 flex-wrap gap-1">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Upcoming
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Paused
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Skipped
            </span>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-stone-400 uppercase py-1">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* 3 offset blanks for Thursday start */}
            <div />
            <div />
            <div />
            {subscription.calendarDays.map((cd) => {
              let bg = 'bg-stone-50 text-stone-700';
              let ring = '';

              if (cd.status === 'delivered') {
                bg = 'bg-emerald-500 text-white font-bold shadow-xs';
              } else if (cd.status === 'upcoming') {
                bg = 'bg-orange-100 text-orange-950 font-bold border border-orange-300';
              } else if (cd.status === 'paused') {
                bg = 'bg-amber-400 text-amber-950 font-bold border border-amber-500';
              } else if (cd.status === 'skipped') {
                bg = 'bg-slate-300 text-slate-700 line-through';
              } else if (cd.status === 'weekend') {
                bg = 'bg-stone-100 text-stone-300';
              }

              if (cd.dayNumber === 14) {
                ring = 'ring-2 ring-stone-900 ring-offset-1 font-extrabold';
              }

              return (
                <div
                  key={cd.dayNumber}
                  className={`h-8 rounded-lg flex items-center justify-center text-xs transition-all ${bg} ${ring}`}
                  title={`Day ${cd.dayNumber}: ${cd.status}`}
                >
                  {cd.dayNumber}
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons: Pause, Skip, Cancel Plan */}
        {!isTerminated ? (
          <div className="space-y-2 pt-1">
            <div className="grid grid-cols-2 gap-2">
              <button
                id="btn-pause-plan"
                onClick={() => onOpenPauseSkip('pause')}
                className="py-3 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-2xl font-bold text-xs border border-amber-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <PauseCircle className="w-4 h-4 text-amber-600" />
                <span>Pause Plan</span>
              </button>

              <button
                id="btn-skip-meal"
                onClick={() => onOpenPauseSkip('skip')}
                className="py-3 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-2xl font-bold text-xs border border-blue-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <SkipForward className="w-4 h-4 text-blue-600" />
                <span>Skip a Meal</span>
              </button>
            </div>

            <button
              id="btn-cancel-plan"
              onClick={onOpenCancelRefund}
              className="w-full py-2.5 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl font-semibold text-xs border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancel Plan & Refund</span>
            </button>
          </div>
        ) : (
          <div className="p-4 bg-stone-100 rounded-2xl text-center space-y-2">
            <p className="text-xs text-stone-600">
              This subscription is currently <strong>{subscription.status}</strong>.
            </p>
            <button
              onClick={onBrowseCooks}
              className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-xs transition-colors"
            >
              Browse & Subscribe Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
