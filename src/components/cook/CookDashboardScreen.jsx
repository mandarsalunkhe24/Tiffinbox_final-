import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Utensils,
  Calendar,
  Users,
  Flame,
  Printer,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const CookDashboardScreen = ({ onNavigateTab }) => {
  const {
    currentActiveCook,
    cookOrders,
    cookLanguage,
    addToast
  } = useTiffin();

  // Translations
  const labels = {
    en: {
      heading: "Today's Kitchen Operations",
      subheading: 'Live meal tally, subscriber counts, and packing manifest',
      todayCount: "Today's Tiffins",
      todaySub: 'Cooked & ready for Pune tech corridor dispatch',
      tomorrowCount: "Tomorrow's Booked Tiffins",
      tomorrowSub: 'Estimated grocery requirement',
      activeSubs: 'Active Subscribers',
      activeSubDesc: 'Monthly and weekly subscribers',
      capacityGauge: 'Kitchen Capacity Utilization',
      quickActions: 'Quick Kitchen Actions',
      updateMenu: "Update Tomorrow's Special Menu",
      viewManifest: 'Open Daily Delivery Manifest',
      broadcastMsg: 'Send SMS Alert to Subscribers'
    },
    hi: {
      heading: 'आज की रसोई गतिविधि',
      subheading: 'लाइव टिफिन गिनती, ग्राहक संख्या और डिलीवरी सूची',
      todayCount: 'आज के टिफिन',
      todaySub: 'तैयार एवं डिस्पैच के लिए उपलब्ध',
      tomorrowCount: 'कल के कुल टिफिन',
      tomorrowSub: 'अनुमानित कच्चा माल आवश्यकता',
      activeSubs: 'सक्रिय ग्राहक',
      activeSubDesc: 'मासिक और साप्ताहिक प्लान्स',
      capacityGauge: 'रसोई क्षमता उपयोग',
      quickActions: 'त्वरित क्रियाएँ',
      updateMenu: 'कल का विशेष मेन्यू अपडेट करें',
      viewManifest: 'दैनिक डिलीवरी सूची देखें',
      broadcastMsg: 'ग्राहकों को सूचना भेजें'
    },
    mr: {
      heading: 'आजचे स्वयंपाकघर नियोजन',
      subheading: 'डब्यांची थेट संख्या, वर्गणीदार आणि वितरण यादी',
      todayCount: 'आजचे डबे',
      todaySub: 'तयार आणि आयटी पार्क डिलिव्हरीसाठी सज्ज',
      tomorrowCount: 'उद्याचे बुक केलेले डबे',
      tomorrowSub: 'भाजीपाला व धान्याची आवश्यक खरेदी',
      activeSubs: 'सक्रिय वर्गणीदार',
      activeSubDesc: 'महिना आणि आठवडा वर्गणीदार',
      capacityGauge: 'स्वयंपाकघर क्षमता वापर',
      quickActions: 'जलद कृती',
      updateMenu: 'उद्याचा मेन्यू सेट करा',
      viewManifest: 'डबे वितरण यादी उघडा',
      broadcastMsg: 'ग्राहकांना मेसेज पाठवा'
    }
  };

  const l = labels[cookLanguage] || labels.en;

  // Active cooking orders today (excluding paused and skipped)
  const activeOrdersToday = cookOrders.filter((o) => !o.isPaused && !o.isSkipped);
  const pausedOrdersCount = cookOrders.filter((o) => o.isPaused).length;
  const skippedOrdersCount = cookOrders.filter((o) => o.isSkipped).length;

  const todayCount = activeOrdersToday.length + 38; // base realistic demo count
  const tomorrowCount = todayCount + 6;
  const activeSubscribers = 52;
  const capacity = currentActiveCook.dailyCapacity || 60;
  const utilization = Math.round((todayCount / capacity) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {currentActiveCook.name} • {currentActiveCook.fssaiLicense}
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            {l.heading}
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            {l.subheading}
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('orders')}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-700/20 transition-all flex items-center justify-center gap-2"
        >
          <span>{l.viewManifest}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Main Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Today's Tiffin Count */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {l.todayCount}
            </span>
            <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-2xl">
              <Utensils className="w-6 h-6" />
            </div>
          </div>
          <div className="font-heading font-black text-4xl text-stone-900">
            {todayCount} <span className="text-base font-normal text-stone-400">tiffins</span>
          </div>
          <p className="text-xs text-stone-500 pt-1 border-t border-stone-100">
            {l.todaySub}
          </p>
        </div>

        {/* Card 2: Tomorrow's Tiffin Count */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {l.tomorrowCount}
            </span>
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <div className="font-heading font-black text-4xl text-stone-900">
            {tomorrowCount} <span className="text-base font-normal text-stone-400">tiffins</span>
          </div>
          <p className="text-xs text-stone-500 pt-1 border-t border-stone-100">
            {l.tomorrowSub}
          </p>
        </div>

        {/* Card 3: Active Subscribers */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              {l.activeSubs}
            </span>
            <div className="p-2.5 bg-blue-100 text-blue-700 rounded-2xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="font-heading font-black text-4xl text-stone-900">
            {activeSubscribers} <span className="text-base font-normal text-stone-400">workers</span>
          </div>
          <p className="text-xs text-stone-500 pt-1 border-t border-stone-100">
            {l.activeSubDesc}
          </p>
        </div>
      </div>

      {/* Kitchen Capacity Meter */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-stone-900">
              {l.capacityGauge}
            </h3>
            <p className="text-xs text-stone-500">
              {todayCount} tiffins prepared out of {capacity} daily kitchen capacity
            </p>
          </div>
          <span className="font-mono font-bold text-sm bg-stone-100 px-3 py-1 rounded-xl text-stone-700">
            {utilization}% Capacity
          </span>
        </div>

        <div className="w-full h-3.5 bg-stone-100 rounded-full overflow-hidden p-0.5 border border-stone-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              utilization > 95
                ? 'bg-rose-500'
                : utilization > 80
                ? 'bg-amber-500'
                : 'bg-emerald-600'
            }`}
            style={{ width: `${Math.min(100, utilization)}%` }}
          />
        </div>
      </div>

      {/* Automatic Exclusions Notification Bar */}
      {(pausedOrdersCount > 0 || skippedOrdersCount > 0) && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Automatic schedule sync: <strong>{pausedOrdersCount} paused</strong> and <strong>{skippedOrdersCount} skipped</strong> subscribers are automatically excluded from today's cooking and delivery batch.
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-amber-800 font-bold hover:underline shrink-0 pl-2"
          >
            Review Manifest →
          </button>
        </div>
      )}

      {/* Quick Kitchen Actions */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-base text-stone-900">
          {l.quickActions}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onNavigateTab('menu')}
            className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group"
          >
            <span className="text-xl mb-1 block">🍲</span>
            <span className="font-bold text-sm text-stone-900 block group-hover:text-emerald-700">
              {l.updateMenu}
            </span>
            <span className="text-xs text-stone-500 mt-1 block">
              Set tomorrow's thali menu & dishes
            </span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group"
          >
            <span className="text-xl mb-1 block">📋</span>
            <span className="font-bold text-sm text-stone-900 block group-hover:text-emerald-700">
              {l.viewManifest}
            </span>
            <span className="text-xs text-stone-500 mt-1 block">
              Check delivery tokens & office addresses
            </span>
          </button>

          <button
            onClick={() => addToast('SMS broadcast sent to all 52 active subscribers', 'success')}
            className="p-4 rounded-2xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-left transition-all group"
          >
            <span className="text-xl mb-1 block">📢</span>
            <span className="font-bold text-sm text-stone-900 block group-hover:text-emerald-700">
              {l.broadcastMsg}
            </span>
            <span className="text-xs text-stone-500 mt-1 block">
              Notify subscribers about festive treats
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
