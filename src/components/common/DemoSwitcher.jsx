import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Smartphone,
  ChefHat,
  ShieldAlert,
  Clock,
  RotateCcw,
  HelpCircle,
  Maximize2,
  Minimize2
} from 'lucide-react';

export const DemoSwitcher = () => {
  const {
    role,
    setRole,
    mobileFrameEnabled,
    setMobileFrameEnabled,
    simulatePastCutoff,
    setSimulatePastCutoff,
    resetDemoState,
    setRulesModalOpen,
    setActiveRuleTab,
    cutoffCountdown
  } = useTiffin();

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur text-stone-100 border-b border-stone-800 px-3 py-2 text-xs shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center font-bold text-white shadow-sm text-sm">
            🍱
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm tracking-tight text-white">TiffinBox</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                Pune Prototype
              </span>
            </div>
          </div>
        </div>

        {/* Role Switcher Pills */}
        <div className="flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700">
          <span className="text-stone-400 text-[11px] px-2 font-medium hidden sm:inline">Role:</span>
          
          <button
            id="role-subscriber-btn"
            onClick={() => setRole('subscriber')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              role === 'subscriber'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Subscriber</span>
          </button>

          <button
            id="role-cook-btn"
            onClick={() => setRole('cook')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              role === 'cook'
                ? 'bg-[#166534] text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Cook Panel</span>
          </button>

          <button
            id="role-admin-btn"
            onClick={() => setRole('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              role === 'admin'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-stone-300 hover:text-white hover:bg-stone-700/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Demo Controls: Cut-off Toggle, Mobile Frame Toggle, Rules, Reset */}
        <div className="flex items-center gap-2">
          {/* Cut-off rule tester */}
          <button
            onClick={() => setSimulatePastCutoff(!simulatePastCutoff)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-medium transition-all border ${
              simulatePastCutoff
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-stone-800 text-stone-300 hover:text-white border-stone-700'
            }`}
            title="Toggle between before 9 PM and after 9 PM cut-off rule"
          >
            <Clock className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden md:inline">Cut-off:</span>
            <span className="font-semibold">
              {simulatePastCutoff ? 'Past 9 PM (Passed)' : `in ${cutoffCountdown}`}
            </span>
          </button>

          {/* Toggle Mobile Phone Mockup Frame (only on subscriber view) */}
          {role === 'subscriber' && (
            <button
              onClick={() => setMobileFrameEnabled(!mobileFrameEnabled)}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 transition-colors"
              title="Toggle Phone Bezel / Full Screen"
            >
              {mobileFrameEnabled ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{mobileFrameEnabled ? 'Phone Frame' : 'Full Screen'}</span>
            </button>
          )}

          {/* Business Rules Info Button */}
          <button
            onClick={() => {
              setActiveRuleTab('pause');
              setRulesModalOpen(true);
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-orange-300 border border-stone-700 transition-colors"
            title="View Business Rules & Policies"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Rules (ℹ️)</span>
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={resetDemoState}
            className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 border border-stone-700 transition-colors"
            title="Reset demo data to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
