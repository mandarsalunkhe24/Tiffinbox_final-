import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ArrowLeft,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const CancelRefundScreen = ({ onBack, onCompleteCancellation }) => {
  const {
    subscription,
    calculateRefund,
    confirmCancelAndRefund,
    setRulesModalOpen,
    setActiveRuleTab
  } = useTiffin();

  // Allow tester to simulate delivered meals to test all 3 refund policies
  const [simulatedDelivered, setSimulatedDelivered] = useState(subscription.mealsUsed);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const calc = calculateRefund(simulatedDelivered);

  const handleConfirm = () => {
    confirmCancelAndRefund();
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="flex-1 flex flex-col p-5 bg-white justify-between animate-fade-in pb-16">
        <div className="text-center pt-8 space-y-3">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-md shadow-purple-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
            Status: REFUNDED
          </span>

          <h1 className="font-heading font-extrabold text-xl text-stone-900">
            Cancellation Confirmed
          </h1>

          <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
            Your tiffin subscription has been cancelled and unassigned from the cook’s cooking manifest.
          </p>
        </div>

        {/* Refund Status Card */}
        <div className="p-4 bg-purple-50/70 rounded-3xl border border-purple-200 space-y-3 my-4">
          <div className="flex items-center justify-between pb-2 border-b border-purple-200">
            <span className="text-xs font-bold text-purple-900">Refund Settlement</span>
            <span className="font-mono text-xs font-extrabold text-purple-800">
              ₹{calc.refundAmount}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-purple-950">
            <div className="flex justify-between">
              <span>Payout Method</span>
              <span className="font-semibold">Original UPI / Bank Source</span>
            </div>
            <div className="flex justify-between">
              <span>Timeline</span>
              <span className="font-bold text-purple-800">5-7 working days</span>
            </div>
            <div className="flex justify-between">
              <span>Refund Ref ID</span>
              <span className="font-mono">REF-PUN-34981</span>
            </div>
          </div>
        </div>

        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
          <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            A confirmation SMS and receipt has been sent to your registered mobile number.
          </p>
        </div>

        <button
          onClick={onCompleteCancellation}
          className="w-full py-3.5 bg-stone-900 hover:bg-black text-white rounded-2xl font-bold text-xs shadow-md transition-all mt-4"
        >
          Return to My Plan Overview
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-24 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 border-b border-stone-200 sticky top-0 z-20 flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="text-center">
          <h1 className="font-heading font-bold text-sm text-stone-900">Cancel Plan & Refund</h1>
          <p className="text-[11px] text-stone-500">Live Policy Calculator</p>
        </div>
        <button
          onClick={() => {
            setActiveRuleTab('refund');
            setRulesModalOpen(true);
          }}
          className="text-stone-400 hover:text-orange-600 transition-colors p-1"
        >
          <HelpCircle className="w-4 h-4 text-orange-500" />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Scenario Simulator for Quick Grading/Testing */}
        <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-orange-950 flex items-center gap-1">
              <span>🧪</span> Test All 3 Refund Rules:
            </span>
            <span className="text-[10px] text-orange-700 font-mono">
              Delivered: {simulatedDelivered} days
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[10px]">
            <button
              onClick={() => setSimulatedDelivered(0)}
              className={`py-1.5 px-2 rounded-xl font-bold border transition-colors ${
                simulatedDelivered === 0
                  ? 'bg-emerald-600 text-white border-emerald-700'
                  : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-100'
              }`}
            >
              0 Delivered (100% Refund)
            </button>
            <button
              onClick={() => setSimulatedDelivered(7)}
              className={`py-1.5 px-2 rounded-xl font-bold border transition-colors ${
                simulatedDelivered === 7
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-100'
              }`}
            >
              7 Delivered (90% Refund)
            </button>
            <button
              onClick={() => setSimulatedDelivered(18)}
              className={`py-1.5 px-2 rounded-xl font-bold border transition-colors ${
                simulatedDelivered === 18
                  ? 'bg-amber-600 text-white border-amber-700'
                  : 'bg-white text-stone-700 border-orange-200 hover:bg-orange-100'
              }`}
            >
              18 Delivered (₹0 Refund)
            </button>
          </div>
        </div>

        {/* Applied Rule Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
          calc.refundAmount > 0
            ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
            : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          <div className="flex items-center gap-1.5 font-bold">
            {calc.refundAmount > 0 ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{calc.ruleApplied}</span>
          </div>
          <p className="text-[11px] leading-relaxed opacity-90">
            {calc.explanation}
          </p>
        </div>

        {/* Refund Breakdown Table */}
        <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900 pb-2 border-b border-stone-100">
            <Receipt className="w-4 h-4 text-orange-500" />
            <span>Refund Calculation Breakdown</span>
          </div>

          <table className="w-full text-xs">
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="py-2 text-stone-500">Total Plan Value (20 days × ₹110)</td>
                <td className="py-2 font-bold text-stone-800 text-right">₹{calc.totalPaid}</td>
              </tr>
              <tr>
                <td className="py-2 text-stone-500">Meals Consumed ({calc.delivered} days)</td>
                <td className="py-2 font-semibold text-stone-800 text-right">- ₹{calc.consumedValue}</td>
              </tr>
              <tr>
                <td className="py-2 text-stone-500">Gross Unused Value ({calc.unusedDays} days)</td>
                <td className="py-2 font-semibold text-stone-800 text-right">₹{calc.grossUnusedValue}</td>
              </tr>
              {calc.adminFee > 0 && (
                <tr>
                  <td className="py-2 text-stone-500">
                    Admin & Packing Surcharge {calc.delivered > 0 ? '(10%)' : ''}
                  </td>
                  <td className="py-2 font-semibold text-rose-600 text-right">- ₹{calc.adminFee}</td>
                </tr>
              )}
              <tr className="border-t-2 border-stone-200">
                <td className="py-3 font-heading font-extrabold text-sm text-stone-900">
                  Net Refund to Account
                </td>
                <td className="py-3 font-heading font-extrabold text-base text-emerald-700 text-right">
                  ₹{calc.refundAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Timeline Note */}
        <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 text-stone-600 text-xs flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            Processed via automated UPI/Banking refund gateway. <strong>5-7 working days</strong> to reflect in your source account.
          </p>
        </div>
      </div>

      {/* Floating Bottom Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center justify-between max-w-[430px] mx-auto">
        <div>
          <span className="text-[10px] text-stone-400 block">Calculated Refund</span>
          <span className="font-heading font-extrabold text-stone-900 text-base">
            ₹{calc.refundAmount}
          </span>
        </div>

        <button
          id="confirm-cancellation-btn"
          onClick={handleConfirm}
          className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-rose-600/25 transition-all flex items-center gap-1.5"
        >
          <span>Confirm Cancellation</span>
        </button>
      </div>
    </div>
  );
};
