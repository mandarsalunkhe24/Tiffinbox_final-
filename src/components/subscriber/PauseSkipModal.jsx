import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  X,
  PauseCircle,
  SkipForward,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const PauseSkipModal = ({ isOpen, initialTab = 'pause', onClose }) => {
  const {
    subscription,
    pausePlan,
    skipMeal,
    cutoffCountdown,
    isCutoffPassed,
    setRulesModalOpen,
    setActiveRuleTab
  } = useTiffin();

  const [activeTab, setActiveTab] = useState(initialTab); // 'pause' | 'skip'
  
  // Pause State
  const [pauseDays, setPauseDays] = useState(2);
  const [pauseStartDate, setPauseStartDate] = useState('2026-10-15');
  const [pauseError, setPauseError] = useState('');
  const [pauseSuccessMsg, setPauseSuccessMsg] = useState('');

  // Skip State
  const [skipDate, setSkipDate] = useState('2026-10-15');
  const [skipSuccessMsg, setSkipSuccessMsg] = useState('');
  const [skipError, setSkipError] = useState('');

  if (!isOpen) return null;

  const cutoffPassed = isCutoffPassed();
  const maxPauseRemaining = 14 - subscription.pauseDaysUsed;
  const maxSkipsAllowed = subscription.planType === 'weekly' ? 1 : 4;
  const skipsRemaining = maxSkipsAllowed - subscription.skipsUsed;

  const handleConfirmPause = () => {
    setPauseError('');
    setPauseSuccessMsg('');

    // Cut-off check first
    if (cutoffPassed) {
      setPauseError('Cut-off passed – earliest date is day after tomorrow');
      return;
    }

    const numDays = parseInt(pauseDays, 10);
    if (isNaN(numDays) || numDays < 1 || numDays > 14) {
      setPauseError('Pause duration must be between 1 and 14 days');
      return;
    }

    if (subscription.pauseDaysUsed + numDays > 14) {
      setPauseError(`Total pause days cannot exceed 14. You only have ${maxPauseRemaining} day(s) left.`);
      return;
    }

    const res = pausePlan(numDays, pauseStartDate);
    if (res.success) {
      setPauseSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
      }, 1800);
    } else {
      setPauseError(res.error);
    }
  };

  const handleConfirmSkip = () => {
    setSkipError('');
    setSkipSuccessMsg('');

    if (skipsRemaining <= 0) {
      setSkipError(`You have used all ${maxSkipsAllowed} skips allowed on this plan.`);
      return;
    }

    const res = skipMeal(skipDate);
    if (res.success) {
      setSkipSuccessMsg(res.message);
      setTimeout(() => {
        onClose();
      }, 1800);
    } else {
      setSkipError(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-t-[36px] max-w-[430px] w-full p-5 shadow-2xl border-t border-stone-200 max-h-[85vh] flex flex-col animate-slide-up">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-1.5">
            <h3 className="font-heading font-bold text-base text-stone-900">
              Manage Tiffin Schedule
            </h3>
            <button
              onClick={() => {
                setActiveRuleTab(activeTab);
                setRulesModalOpen(true);
              }}
              className="text-stone-400 hover:text-orange-600 transition-colors p-1"
              title="Read Business Rules"
            >
              <HelpCircle className="w-4 h-4 text-orange-500" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-stone-100 rounded-2xl my-3 gap-1">
          <button
            onClick={() => {
              setActiveTab('pause');
              setPauseError('');
              setPauseSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'pause'
                ? 'bg-white text-orange-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PauseCircle className="w-4 h-4" />
            Pause Plan
          </button>

          <button
            onClick={() => {
              setActiveTab('skip');
              setSkipError('');
              setSkipSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'skip'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <SkipForward className="w-4 h-4" />
            Skip Single Meal
          </button>
        </div>

        {/* Cut-off Live Countdown Banner */}
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between text-xs mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-orange-500" />
            <div>
              <span className="font-bold text-stone-800 block">Cut-Off for Tomorrow</span>
              <span className="text-[10px] text-stone-500">9:00 PM kitchen deadline</span>
            </div>
          </div>
          <span className={`px-2.5 py-1 rounded-xl font-mono font-bold text-xs ${
            cutoffPassed ? 'bg-rose-100 text-rose-800' : 'bg-orange-100 text-orange-800'
          }`}>
            {cutoffPassed ? 'Cut-off Passed (Past 9 PM)' : `in ${cutoffCountdown}`}
          </span>
        </div>

        {/* TAB 1: PAUSE PLAN */}
        {activeTab === 'pause' && (
          <div className="space-y-4 overflow-y-auto">
            {/* Number of days input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Number of Pause Days (1 to 14):
                </label>
                <span className="text-[11px] text-stone-400">
                  {maxPauseRemaining} days available
                </span>
              </div>

              <input
                id="pause-days-input"
                type="number"
                min={1}
                max={14}
                value={pauseDays}
                onChange={(e) => {
                  setPauseDays(e.target.value);
                  setPauseError('');
                }}
                className="w-full bg-white border border-stone-200 py-2.5 px-3.5 rounded-2xl text-stone-900 font-bold text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                Pause Starts From Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={pauseStartDate}
                  min="2026-10-15"
                  onChange={(e) => setPauseStartDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 py-2.5 px-3.5 rounded-2xl text-stone-900 text-xs font-medium focus:outline-none focus:border-orange-500"
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* CUT-OFF WARNING IF PASSED */}
            {cutoffPassed && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>Cut-off passed – earliest date is day after tomorrow.</strong> Since 9:00 PM has passed, tomorrow’s meal is already locked for morning cooking.
                </p>
              </div>
            )}

            {/* Inline Error Message */}
            {pauseError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-medium animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{pauseError}</span>
              </div>
            )}

            {/* Success Message Banner */}
            {pauseSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-bold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{pauseSuccessMsg}</span>
              </div>
            )}

            <button
              id="confirm-pause-btn"
              onClick={handleConfirmPause}
              disabled={cutoffPassed}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                cutoffPassed
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25'
              }`}
            >
              <PauseCircle className="w-4 h-4" />
              <span>Confirm Pause & Extend End Date</span>
            </button>
          </div>
        )}

        {/* TAB 2: SKIP MEAL */}
        {activeTab === 'skip' && (
          <div className="space-y-4 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700">
                  Pick Date to Skip:
                </label>
                <span className="text-[11px] text-stone-400">
                  {skipsRemaining} of {maxSkipsAllowed} skips remaining
                </span>
              </div>

              <div className="relative">
                <input
                  id="skip-date-input"
                  type="date"
                  value={skipDate}
                  min="2026-10-15"
                  onChange={(e) => setSkipDate(e.target.value)}
                  className="w-full bg-white border border-stone-200 py-2.5 px-3.5 rounded-2xl text-stone-900 text-xs font-medium focus:outline-none focus:border-blue-500"
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3 pointer-events-none" />
              </div>
            </div>

            {/* CUT-OFF WARNING FOR SKIP */}
            {cutoffPassed ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  <strong>⚠️ Warning:</strong> 9:00 PM cut-off has passed. A skip for tomorrow will be recorded, but <strong>No credit will be given</strong>.
                </p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  Request is before 9:00 PM. <strong>1 meal rollover credit</strong> will be saved to your subscription.
                </p>
              </div>
            )}

            {skipError && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2 font-medium animate-fade-in">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{skipError}</span>
              </div>
            )}

            {skipSuccessMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-bold animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{skipSuccessMsg}</span>
              </div>
            )}

            <button
              id="confirm-skip-btn"
              onClick={handleConfirmSkip}
              disabled={skipsRemaining <= 0}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 ${
                skipsRemaining <= 0
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25'
              }`}
            >
              <SkipForward className="w-4 h-4" />
              <span>Confirm Single Meal Skip</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
