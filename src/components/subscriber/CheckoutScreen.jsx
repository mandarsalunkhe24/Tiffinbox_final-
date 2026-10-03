import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  QrCode,
  Wallet,
  AlertTriangle,
  Lock,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const CheckoutScreen = ({ onBack, onCompletePayment }) => {
  const {
    planDraft,
    cooks,
    simulateFailure,
    setSimulateFailure,
    processPayment,
    paymentAttempts
  } = useTiffin();

  const selectedCook = cooks.find((c) => c.id === planDraft.cookId) || cooks[0];
  const totalAmount = planDraft.mealDays * planDraft.dailyRate;

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'Wallet'
  const [upiOption, setUpiOption] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'id'
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const isSuccess = processPayment(paymentMethod);
      onCompletePayment(isSuccess);
    }, 1200);
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
          <h1 className="font-heading font-bold text-sm text-stone-900">Simulated Checkout</h1>
          <p className="text-[11px] text-stone-500">Secure Payment Gateway</p>
        </div>
        <div className="w-6" />
      </div>

      <div className="p-4 space-y-4">
        {/* Order Summary Card */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-orange-100 rounded-xl flex items-center justify-center text-lg">
                🍱
              </div>
              <div>
                <h3 className="font-heading font-bold text-stone-900 text-xs">
                  {selectedCook.name}
                </h3>
                <p className="text-[10px] text-stone-400">
                  {planDraft.mealType} • {planDraft.deliverySlot}
                </p>
              </div>
            </div>
            <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-xl uppercase">
              {planDraft.planType} Plan
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Total Meal Days</span>
              <span className="font-bold text-stone-800">{planDraft.mealDays} Days</span>
            </div>
            <div className="flex justify-between">
              <span>Start Date</span>
              <span className="font-bold text-stone-800">{planDraft.startDate}</span>
            </div>
            <div className="flex justify-between">
              <span>Daily Rate</span>
              <span className="font-bold text-stone-800">₹{planDraft.dailyRate} / meal</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span className="text-emerald-600 font-bold">FREE (₹0)</span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="font-bold text-xs text-stone-800">Total Payable Amount</span>
            <span className="font-heading font-extrabold text-lg text-orange-600">
              ₹{totalAmount}
            </span>
          </div>
        </div>

        {/* Required Mandatory Note */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 flex items-start gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Important Note:</strong> Your plan starts only after payment is confirmed.
          </p>
        </div>

        {/* Payment Failure Simulation Toggle Switch */}
        <div className="p-3.5 bg-stone-900 text-white rounded-2xl border border-stone-800 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-stone-800 rounded-lg text-orange-400">🧪</span>
              <div>
                <span className="font-bold text-xs block">Simulate payment failure</span>
                <span className="text-[10px] text-stone-400">
                  Toggle ON to test failure & 3-attempt limit
                </span>
              </div>
            </div>

            {/* Toggle switch button */}
            <button
              type="button"
              id="simulate-failure-toggle"
              onClick={() => setSimulateFailure(!simulateFailure)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                simulateFailure ? 'bg-rose-600 justify-end' : 'bg-stone-700 justify-start'
              }`}
            >
              <div className="bg-white w-4 h-4 rounded-full shadow-md transform transition-transform" />
            </button>
          </div>

          {simulateFailure && (
            <div className="p-2 bg-rose-500/20 rounded-xl border border-rose-500/40 text-[11px] text-rose-300">
              ⚠️ Simulated failure is <strong>ACTIVE</strong>. Clicking Pay will simulate an authorization rejection.
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div>
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
            Select Payment Method
          </label>

          <div className="space-y-2">
            {/* UPI Option */}
            <div
              onClick={() => setPaymentMethod('UPI')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'UPI'
                  ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                    UPI
                  </div>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">UPI Instant Payment</span>
                    <span className="text-[10px] text-stone-400">Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="accent-orange-600"
                />
              </div>

              {paymentMethod === 'UPI' && (
                <div className="mt-3 pt-3 border-t border-orange-200/60 grid grid-cols-4 gap-1.5 text-center text-[10px] font-bold">
                  {['Google Pay', 'PhonePe', 'Paytm', 'Any UPI ID'].map((app) => (
                    <div key={app} className="p-2 bg-white rounded-xl border border-stone-200 text-stone-700 hover:border-orange-400">
                      {app}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Credit / Debit Card Option */}
            <div
              onClick={() => setPaymentMethod('Card')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'Card'
                  ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Credit / Debit Card</span>
                    <span className="text-[10px] text-stone-400">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="accent-orange-600"
                />
              </div>
            </div>

            {/* Wallets */}
            <div
              onClick={() => setPaymentMethod('Wallet')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                paymentMethod === 'Wallet'
                  ? 'border-orange-500 bg-orange-50/50 ring-2 ring-orange-500/20'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-stone-900 block">Online Wallets</span>
                    <span className="text-[10px] text-stone-400">Paytm, Amazon Pay, Mobikwik</span>
                  </div>
                </div>
                <input
                  type="radio"
                  name="pm"
                  checked={paymentMethod === 'Wallet'}
                  onChange={() => setPaymentMethod('Wallet')}
                  className="accent-orange-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Pay Button */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-stone-200 z-30 flex items-center justify-between max-w-[430px] mx-auto">
        <div className="flex items-center gap-1.5 text-stone-500 text-xs">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted</span>
        </div>

        <button
          id="pay-button"
          disabled={isProcessing}
          onClick={handlePay}
          className="px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center gap-2 min-w-[170px] justify-center"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Contacting Bank...</span>
            </span>
          ) : (
            <span>Pay ₹{totalAmount} Now</span>
          )}
        </button>
      </div>
    </div>
  );
};
