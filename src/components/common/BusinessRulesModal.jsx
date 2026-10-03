import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import { X, Clock, PauseCircle, SkipForward, Receipt, CheckCircle, AlertTriangle } from 'lucide-react';

export const BusinessRulesModal = () => {
  const { rulesModalOpen, setRulesModalOpen, activeRuleTab, setActiveRuleTab } = useTiffin();

  if (!rulesModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-orange-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-100 text-orange-600 rounded-xl">ℹ️</span>
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-900">TiffinBox Business Rules & Policies</h3>
              <p className="text-xs text-stone-500">Transparent subscription rules designed for fresh home cooking</p>
            </div>
          </div>
          <button
            onClick={() => setRulesModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex p-1 bg-stone-100 rounded-xl my-4 gap-1">
          <button
            onClick={() => setActiveRuleTab('cutoff')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeRuleTab === 'cutoff'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            9 PM Cut-Off
          </button>
          <button
            onClick={() => setActiveRuleTab('pause')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeRuleTab === 'pause'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <PauseCircle className="w-3.5 h-3.5" />
            Pause Rules
          </button>
          <button
            onClick={() => setActiveRuleTab('skip')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeRuleTab === 'skip'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <SkipForward className="w-3.5 h-3.5" />
            Skip Rules
          </button>
          <button
            onClick={() => setActiveRuleTab('refund')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeRuleTab === 'refund'
                ? 'bg-white text-orange-600 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            Refund Rules
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 text-sm text-stone-700 space-y-4">
          {activeRuleTab === 'cutoff' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Daily 9:00 PM Kitchen Cut-Off</h4>
                  <p className="text-xs text-amber-800 mt-1">
                    Home cooks in Pune purchase fresh farm produce at night for the early morning cooking cycle.
                  </p>
                </div>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Requests before 9:00 PM:</strong> Applies immediately to tomorrow’s meal with full credit extension.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Pause requests after 9:00 PM:</strong> Blocked with <em>"Cut-off passed – earliest date is day after tomorrow"</em>. Cook has already prepaid for tomorrow's vegetables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span><strong>Skip requests after 9:00 PM:</strong> Marked with <em>"No credit will be given"</em> warning. Cook will not prepare, but meal value cannot be refunded.</span>
                </li>
              </ul>
            </div>
          )}

          {activeRuleTab === 'pause' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-orange-50 rounded-2xl border border-orange-200 text-orange-900">
                <h4 className="font-bold text-sm">Flexible Plan Pausing</h4>
                <p className="text-xs text-orange-800 mt-0.5">Pause your subscription when travelling or working from home.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block mb-1">Per-Request Limit</span>
                  <span className="font-bold text-stone-900 text-base">1 to 14 Days</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-stone-400 block mb-1">Max Plan Lifetime</span>
                  <span className="font-bold text-stone-900 text-base">14 Total Days</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                When you pause, your plan’s calendar end date is automatically pushed forward by the exact number of paused days. The cook’s manifest automatically excludes you from delivery.
              </p>
            </div>
          )}

          {activeRuleTab === 'skip' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
                <h4 className="font-bold text-sm">Single Meal Skip Policy</h4>
                <p className="text-xs text-emerald-800 mt-0.5">Office team lunch or personal fast? Skip individual days effortlessly.</p>
              </div>
              <ul className="space-y-2 text-xs">
                <li className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <strong>Weekly Plan (5 meals):</strong> Up to <strong>1 skip</strong> allowed per cycle.
                </li>
                <li className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <strong>Monthly / Custom Plans:</strong> Up to <strong>4 skips</strong> allowed per cycle.
                </li>
                <li className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <strong>Cut-off condition:</strong> Must be submitted before 9:00 PM the previous evening to earn meal rollover credit.
                </li>
              </ul>
            </div>
          )}

          {activeRuleTab === 'refund' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-200 text-purple-900">
                <h4 className="font-bold text-sm">Cancellation & Refund Policy Matrix</h4>
                <p className="text-xs text-purple-800 mt-0.5">Fair refund framework balancing student/worker flexibility and cook earnings.</p>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                  <div className="font-bold text-emerald-800">Rule 1: 100% Full Refund</div>
                  <div className="text-emerald-700 text-[11px] mt-0.5">
                    If zero meals have been delivered yet, 100% of plan amount is refunded with ₹0 fee.
                  </div>
                </div>
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                  <div className="font-bold text-blue-800">Rule 2: 90% Refund on Unused Days</div>
                  <div className="text-blue-700 text-[11px] mt-0.5">
                    If meals delivered & <strong>3 or more unused meal days</strong>: Refund = Unused Days × Daily Rate × 90% (10% platform & packaging admin fee).
                  </div>
                </div>
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <div className="font-bold text-amber-800">Rule 3: ₹0 Refund</div>
                  <div className="text-amber-700 text-[11px] mt-0.5">
                    If <strong>fewer than 3 unused meal days</strong> remain: ₹0 cash refund (kitchen has committed grocery orders).
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 italic">
                All approved refunds are credited back to the original source account (UPI/Bank) within 5-7 working days.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-stone-100 flex justify-end">
          <button
            onClick={() => setRulesModalOpen(false)}
            className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium text-xs rounded-xl shadow-md transition-colors"
          >
            Got it, close
          </button>
        </div>
      </div>
    </div>
  );
};
