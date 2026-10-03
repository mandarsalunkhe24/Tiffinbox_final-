import React, { useState, useEffect } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

export const MobileFrame = ({ children }) => {
  const { mobileFrameEnabled } = useTiffin();
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!mobileFrameEnabled) {
    return (
      <main className="w-full min-h-[calc(100vh-50px)] flex justify-center bg-[#FFF7ED]">
        <div className="w-full max-w-[430px] min-h-[calc(100vh-50px)] bg-white shadow-xl flex flex-col relative">
          {children}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-[calc(100vh-50px)] flex items-center justify-center p-2 sm:p-6 bg-gradient-to-br from-orange-100/60 via-amber-50 to-emerald-50/40">
      <div className="relative w-full max-w-[430px] h-[870px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-2xl ring-1 ring-stone-900/10 shadow-orange-950/20 flex flex-col">
        {/* Outer Phone Frame Accents */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-42 w-[3px] h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -left-[3px] top-58 w-[3px] h-12 bg-stone-700 rounded-l-sm" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-stone-700 rounded-r-sm" />

        {/* Screen Container */}
        <div className="w-full h-full bg-[#FFF7ED] rounded-[38px] overflow-hidden flex flex-col relative border border-stone-800/80">
          
          {/* iOS Status Bar */}
          <div className="w-full px-6 pt-3 pb-1 flex items-center justify-between z-30 select-none bg-inherit">
            <span className="text-[13px] font-semibold text-stone-900 tracking-tight">{currentTime}</span>
            
            {/* Dynamic Island */}
            <div className="w-24 h-6 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-medium text-white/90 truncate">TiffinBox</span>
            </div>

            <div className="flex items-center gap-1.5 text-stone-900">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4" />
            </div>
          </div>

          {/* App Body Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
            {children}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="w-full py-1.5 flex justify-center bg-inherit z-30">
            <div className="w-32 h-1 bg-stone-400 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
};
