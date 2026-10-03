import React, { useState, useEffect } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import { Phone, KeyRound, ShieldAlert, Sparkles, CheckCircle2, Lock } from 'lucide-react';

export const LoginScreen = ({ onLoginSuccess }) => {
  const { setIsLoggedIn, setCurrentUser, addToast } = useTiffin();
  
  const [phone, setPhone] = useState('9823012345');
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(300); // 5:00 minutes (300 seconds)
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(900); // 15 minutes (900 seconds)
  const [errorMessage, setErrorMessage] = useState('');

  // OTP Countdown timer (5 minutes)
  useEffect(() => {
    let interval = null;
    if (step === 'otp' && otpTimer > 0 && !isLocked) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer, isLocked]);

  // Account Lock Timer (15 minutes)
  useEffect(() => {
    let interval = null;
    if (isLocked && lockTimer > 0) {
      interval = setInterval(() => {
        setLockTimer((prev) => prev - 1);
      }, 1000);
    } else if (lockTimer === 0) {
      setIsLocked(false);
      setFailedAttempts(0);
      setLockTimer(900);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockTimer]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setErrorMessage('');
    setStep('otp');
    setOtpTimer(300);
    addToast('OTP sent to +91 ' + phone + ' (Use 123456 or any 6 digits)', 'info');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOtp = (simulateInvalid = false) => {
    if (isLocked) return;

    const enteredOtp = otp.join('');
    
    // Test Wrong OTP Simulation
    if (simulateInvalid || enteredOtp === '000000') {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      
      if (newAttempts >= 5) {
        setIsLocked(true);
        setErrorMessage('Account locked for 15 minutes due to 5 consecutive failed attempts.');
        addToast('Account locked for 15 minutes', 'error');
      } else {
        setErrorMessage(`Invalid OTP. Attempt ${newAttempts} of 5. After 5 tries, account will lock.`);
        addToast(`Invalid OTP (${newAttempts}/5 attempts)`, 'error');
      }
      return;
    }

    // Accept any 6 digit OTP or non-empty
    if (enteredOtp.length === 6 || enteredOtp.length > 0) {
      setErrorMessage('');
      setIsLoggedIn(true);
      addToast('Welcome back, Rohan! Logged in successfully.', 'success');
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setErrorMessage('Please enter all 6 digits of the OTP.');
    }
  };

  const quickDemoLogin = () => {
    setIsLoggedIn(true);
    addToast('Quick demo login as Rohan Deshmukh (Hinjewadi)', 'success');
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white">
      {/* Brand Hero */}
      <div className="pt-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-lg shadow-orange-500/20 mb-4 animate-bounce">
          🍱
        </div>
        <h1 className="font-heading font-extrabold text-2xl text-stone-900 tracking-tight">
          TiffinBox <span className="text-orange-500">Pune</span>
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Authentic home-cooked meals for Pune IT professionals
        </p>

        <div className="flex justify-center gap-1.5 mt-3 flex-wrap">
          {['Kothrud', 'Hinjewadi', 'Baner', 'Viman Nagar', 'Magarpatta'].map((area) => (
            <span key={area} className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-medium border border-orange-100">
              📍 {area}
            </span>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="my-auto py-6">
        {isLocked ? (
          <div className="p-6 bg-rose-50 border border-rose-200 rounded-3xl text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-rose-950 text-base">Account Locked</h3>
            <p className="text-xs text-rose-700">
              Account locked for 15 minutes due to 5 failed OTP attempts.
            </p>
            <div className="p-2.5 bg-white rounded-xl border border-rose-200 inline-block font-mono text-xs font-bold text-rose-600">
              Unlock in {formatTimer(lockTimer)}
            </div>
            <p className="text-[11px] text-stone-500">
              Demo tip: You can bypass this with Quick Demo Login below.
            </p>
          </div>
        ) : step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Mobile Number
              </label>
              <div className="flex rounded-2xl border border-stone-200 overflow-hidden focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 bg-stone-50/50">
                <span className="px-3.5 py-3 bg-stone-100 text-stone-600 font-semibold text-sm border-r border-stone-200 flex items-center gap-1">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10 digit number"
                  className="flex-1 px-3 py-3 text-sm text-stone-900 bg-transparent focus:outline-none font-medium"
                  required
                />
              </div>
              {errorMessage && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              Get 6-Digit OTP
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-stone-700">Enter 6-Digit OTP</span>
                <p className="text-[11px] text-stone-500">Sent to +91 {phone}</p>
              </div>
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-xs text-orange-600 hover:underline font-medium"
              >
                Change
              </button>
            </div>

            {/* OTP Boxes */}
            <div className="flex justify-between gap-1.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-bold bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-2 focus:ring-orange-500/20 text-stone-900"
                />
              ))}
            </div>

            {/* OTP Expiry Countdown */}
            <div className="flex items-center justify-between text-xs text-stone-500 px-1">
              <span>
                OTP expires in <strong className="text-orange-600 font-mono">{formatTimer(otpTimer)}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setOtpTimer(300);
                  addToast('New OTP resent to +91 ' + phone, 'info');
                }}
                className="text-orange-600 hover:underline font-semibold"
              >
                Resend OTP
              </button>
            </div>

            {errorMessage && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => handleVerifyOtp(false)}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verify & Login
            </button>

            {/* Simulation Helper Button: Test Wrong OTP */}
            <div className="pt-2 flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleVerifyOtp(true)}
                className="text-[11px] text-stone-400 hover:text-stone-700 underline flex items-center gap-1"
              >
                <span>🧪 Test wrong OTP attempt ({failedAttempts}/5)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Fast Demo Pass */}
      <div className="pt-4 border-t border-stone-100 text-center space-y-2">
        <button
          onClick={quickDemoLogin}
          className="w-full py-2.5 px-4 bg-orange-50 hover:bg-orange-100 text-orange-800 rounded-xl font-semibold text-xs border border-orange-200 transition-colors flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-orange-600" />
          <span>One-Tap Quick Demo Login (Rohan Deshmukh)</span>
        </button>
        <p className="text-[11px] text-stone-400">
          Demo prototype for SE evaluation • Pune, Maharashtra
        </p>
      </div>
    </div>
  );
};
