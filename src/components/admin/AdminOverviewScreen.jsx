import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Users,
  IndianRupee,
  ShieldCheck,
  ChefHat,
  TrendingUp,
  Percent,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2
} from 'lucide-react';

export const AdminOverviewScreen = ({ onNavigateTab }) => {
  const { adminSubscribers, cooks } = useTiffin();

  // Platform KPIs
  const activeSubsCount = 1180;
  const targetSubs = 1500;
  const subsProgress = Math.round((activeSubsCount / targetSubs) * 100);

  const monthlyRevenue = 284500;
  const cooksOnboarded = 96;
  const targetCooks = 140;
  const cooksProgress = Math.round((cooksOnboarded / targetCooks) * 100);

  // Unpaid Dues KPI:
  // Baseline before app: 12% (paper slips, informal credit in Pune)
  // Target: ≤ 2%
  // Current app metric: 1.8% achieved!
  const currentUnpaidDues = 1.8;
  const baselineUnpaid = 12.0;
  const targetUnpaid = 2.0;

  // Payment success rate: target 99.5%, current 98.9%
  const paymentSuccessRate = 98.9;

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Pune City Executive Dashboard
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            Founder & Platform Metrics
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Real-time subscriber acquisition, prepaid collection efficiency, and kitchen onboarding
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync: Hinjewadi & Kothrud Active
          </span>
        </div>
      </div>

      {/* 4 CORE KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Subscribers toward 1,500 */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
            <span>Active Subscribers</span>
            <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl text-stone-900">
              {activeSubsCount.toLocaleString()}
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              Target: <strong>{targetSubs.toLocaleString()} subscribers</strong>
            </div>
          </div>
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-500"
                style={{ width: `${subsProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>{subsProgress}% achieved</span>
              <span>{targetSubs - activeSubsCount} to go</span>
            </div>
          </div>
        </div>

        {/* Card 2: Monthly Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
            <span>Monthly Revenue</span>
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
              <IndianRupee className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl text-stone-900">
              ₹{(monthlyRevenue / 1000).toFixed(1)}k
            </div>
            <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-400 pt-1 border-t border-stone-100">
            Average plan size: ₹2,150 / 20 meal days
          </p>
        </div>

        {/* Card 3: UNPAID DUES % GAUGE (CRITICAL PROMPT REQUIREMENT) */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
            <span>Unpaid Dues %</span>
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Percent className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-3xl text-emerald-600">
                {currentUnpaidDues}%
              </span>
              <span className="text-xs font-semibold text-stone-400">
                (Prepaid app model)
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              Target Line: <strong className="text-stone-800">≤ {targetUnpaid}%</strong> • Pre-app baseline: <span className="text-rose-600 font-semibold">{baselineUnpaid}%</span>
            </div>
          </div>

          {/* Visual Gauge Bar with Target & Baseline Markers */}
          <div className="space-y-1 relative pt-1">
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden flex relative border border-stone-200">
              {/* Current Level */}
              <div
                className="h-full bg-emerald-500 rounded-l-full"
                style={{ width: `${(currentUnpaidDues / 15) * 100}%` }}
              />
            </div>

            {/* Target line marker at 2% */}
            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-0.5">
              <span className="text-emerald-700 font-bold">Current: 1.8%</span>
              <span className="text-amber-700 font-bold">Goal Target: 2.0%</span>
              <span className="text-rose-600">Old Baseline: 12%</span>
            </div>
          </div>
        </div>

        {/* Card 4: Cooks Onboarded toward 140 */}
        <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-stone-400 uppercase tracking-wider">
            <span>Cooks Onboarded</span>
            <div className="p-2 bg-orange-100 text-orange-700 rounded-xl">
              <ChefHat className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="font-heading font-black text-3xl text-stone-900">
              {cooksOnboarded} <span className="text-base font-normal text-stone-400">/ {targetCooks}</span>
            </div>
            <div className="text-xs text-stone-500 mt-0.5">
              {cooksProgress}% of city network target
            </div>
          </div>
          {/* Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${cooksProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-stone-500">
              <span>{cooksProgress}% reached</span>
              <span>{targetCooks - cooksOnboarded} remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart 1: Subscribers Growth Over Time (Area Chart) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-base text-stone-900">
                Subscriber Growth (Past 6 Months)
              </h3>
              <p className="text-xs text-stone-500">
                Monthly active subscriptions across Kothrud, Hinjewadi, and Baner
              </p>
            </div>
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-xl">
              +42% Growth
            </span>
          </div>

          {/* SVG Area Chart */}
          <div className="h-56 w-full pt-4">
            <svg viewBox="0 0 500 180" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#9333ea" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="80" x2="500" y2="80" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area */}
              <path
                d="M 20 145 Q 100 130, 180 100 T 340 50 T 480 25 L 480 160 L 20 160 Z"
                fill="url(#purpleGrad)"
              />

              {/* Line */}
              <path
                d="M 20 145 Q 100 130, 180 100 T 340 50 T 480 25"
                fill="none"
                stroke="#9333ea"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {[
                { cx: 20, cy: 145, label: 'May: 320' },
                { cx: 110, cy: 125, label: 'Jun: 480' },
                { cx: 200, cy: 95, label: 'Jul: 670' },
                { cx: 290, cy: 70, label: 'Aug: 850' },
                { cx: 380, cy: 45, label: 'Sep: 1040' },
                { cx: 480, cy: 25, label: 'Oct: 1180' }
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="#9333ea" stroke="#fff" strokeWidth="2" />
                </g>
              ))}

              {/* X Axis Labels */}
              <text x="20" y="175" fontSize="10" fill="#94a3b8" textAnchor="middle">May</text>
              <text x="110" y="175" fontSize="10" fill="#94a3b8" textAnchor="middle">Jun</text>
              <text x="200" y="175" fontSize="10" fill="#94a3b8" textAnchor="middle">Jul</text>
              <text x="290" y="175" fontSize="10" fill="#94a3b8" textAnchor="middle">Aug</text>
              <text x="380" y="175" fontSize="10" fill="#94a3b8" textAnchor="middle">Sep</text>
              <text x="480" y="175" fontSize="10" fill="#9333ea" fontWeight="bold" textAnchor="middle">Oct (1,180)</text>
            </svg>
          </div>
        </div>

        {/* Chart 2: Payment Success Rate & Weekly Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-base text-stone-900">
              Payment Reliability
            </h3>
            <p className="text-xs text-stone-500">
              UPI, Card & Netbanking gateway SLA
            </p>
          </div>

          {/* Payment Success Gauge */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
              Payment Success Rate
            </span>
            <div className="font-heading font-black text-3xl text-emerald-950 font-mono">
              {paymentSuccessRate}%
            </div>
            <div className="text-xs text-emerald-700">
              Target SLA: <strong>99.5%</strong> (Prepaid gateway)
            </div>
          </div>

          {/* Revenue Per Week (Mini Bar Chart) */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-stone-700 block">
              Revenue Per Week (October)
            </span>

            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs">
              {[
                { week: 'W1', val: '₹68k', h: '65%' },
                { week: 'W2', val: '₹72k', h: '75%' },
                { week: 'W3', val: '₹70k', h: '70%' },
                { week: 'W4 (Est)', val: '₹74k', h: '80%' }
              ].map((w, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div className="w-full bg-stone-100 rounded-xl h-24 flex items-end p-1">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-amber-400 rounded-lg transition-all"
                      style={{ height: w.h }}
                    />
                  </div>
                  <span className="font-mono font-bold text-stone-800 text-[11px]">{w.val}</span>
                  <span className="text-[10px] text-stone-400">{w.week}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
