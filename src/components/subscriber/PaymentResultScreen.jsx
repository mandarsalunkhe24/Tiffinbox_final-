import React, { useEffect } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Receipt,
  ArrowRight,
  ShieldAlert,
  Download,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';

export const PaymentResultScreen = ({ isSuccess, onRetry, onGoToSubscription, onBrowseMore }) => {
  const { subscription, paymentAttempts, lastPaymentResult, addToast } = useTiffin();

  const isThreeFailures = paymentAttempts >= 3 || lastPaymentResult === 'cancelled_after_failures';

  // Blast confetti on success
  useEffect(() => {
    if (isSuccess) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // graceful fallback if canvas-confetti is not loaded
      }
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col p-5 bg-white overflow-y-auto pb-16 animate-fade-in">
        {/* Success Icon & Badge */}
        <div className="text-center pt-4 pb-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl mx-auto flex items-center justify-center mb-3 shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Subscription Active
          </span>
          <h1 className="font-heading font-extrabold text-xl text-stone-900 mt-2">
            Payment Successful!
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Your daily tiffin subscription is confirmed.
          </p>
        </div>

        {/* Digital Receipt Card */}
        <div className="bg-stone-50 p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3 my-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
              <Receipt className="w-4 h-4 text-orange-500" />
              <span>Digital Tax Receipt</span>
            </div>
            <span className="text-[10px] font-mono text-stone-400">
              {subscription.payment?.transactionId || 'TXN-PUN-982187'}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-stone-500">Cook / Kitchen</span>
              <span className="font-bold text-stone-900">{subscription.cookName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Subscription Plan</span>
              <span className="font-bold text-stone-900">
                {subscription.planType?.toUpperCase()} ({subscription.totalMealDays} Meals)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Start Date</span>
              <span className="font-bold text-stone-900">{subscription.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Delivery Window</span>
              <span className="font-bold text-stone-900">{subscription.deliverySlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Payment Mode</span>
              <span className="font-bold text-stone-900">{subscription.payment?.method || 'UPI'}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 text-sm">
              <span className="font-bold text-stone-800">Amount Paid</span>
              <span className="font-heading font-extrabold text-emerald-700">
                ₹{subscription.payment?.amount || 2200}
              </span>
            </div>
          </div>
        </div>

        {/* Next Step Info */}
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
          <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            Remember: You can pause or skip any meal day from <strong>My Plan</strong> tab before the 9:00 PM evening cut-off.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-6 space-y-2.5">
          <button
            id="view-my-plan-btn"
            onClick={onGoToSubscription}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Go to My Subscription</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => addToast('Receipt downloaded to device storage', 'info')}
            className="w-full py-2.5 bg-white hover:bg-stone-100 text-stone-700 rounded-xl font-semibold text-xs border border-stone-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-stone-500" />
            <span>Download Invoice PDF</span>
          </button>
        </div>
      </div>
    );
  }

  // Payment Failure Flow
  return (
    <div className="flex-1 flex flex-col p-5 bg-white justify-between animate-fade-in">
      <div className="text-center pt-8 space-y-3">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-3xl mx-auto flex items-center justify-center shadow-md shadow-rose-500/20">
          <XCircle className="w-10 h-10" />
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
          Payment Authorization Failed
        </span>

        <h1 className="font-heading font-extrabold text-xl text-stone-900">
          {isThreeFailures ? 'Subscription Cancelled' : 'Payment Incomplete'}
        </h1>

        <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
          {isThreeFailures
            ? '3 payment attempts failed. As per security rules, this draft order has been automatically cancelled.'
            : 'Your simulated bank or UPI authorization was not completed. Please retry or choose another payment method.'}
        </p>
      </div>

      {/* Failure Details Card */}
      <div className="p-4 bg-rose-50/70 rounded-3xl border border-rose-200/80 space-y-2 text-xs text-rose-950 my-6">
        <div className="flex items-center gap-2 font-bold text-rose-900">
          <ShieldAlert className="w-4 h-4 text-rose-600" />
          <span>Failure Reason (Simulated)</span>
        </div>
        <p className="text-[11px] text-rose-800">
          Error code: <code>BANK_AUTH_TIMEOUT_SIMULATED</code>.
        </p>

        <div className="pt-2 border-t border-rose-200 flex justify-between font-semibold">
          <span>Failed Attempts</span>
          <span className="font-mono text-rose-700">
            {paymentAttempts} of 3 Allowed
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4">
        {!isThreeFailures ? (
          <button
            onClick={onRetry}
            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry (attempt {paymentAttempts + 1} of 3)</span>
          </button>
        ) : (
          <button
            onClick={onBrowseMore}
            className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Start Fresh Plan</span>
          </button>
        )}

        <button
          onClick={onBrowseMore}
          className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl font-semibold text-xs transition-colors"
        >
          Back to Browse Kitchens
        </button>
      </div>
    </div>
  );
};
