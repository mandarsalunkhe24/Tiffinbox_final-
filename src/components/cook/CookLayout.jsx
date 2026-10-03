import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ChefHat,
  LayoutDashboard,
  UtensilsCrossed,
  ClipboardList,
  Languages,
  CheckCircle2,
  Printer,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';

import { CookDashboardScreen } from './CookDashboardScreen';
import { MenuCapacityScreen } from './MenuCapacityScreen';
import { DailyOrderListScreen } from './DailyOrderListScreen';

export const CookLayout = () => {
  const {
    cooks,
    activeCookId,
    setActiveCookId,
    currentActiveCook,
    cookLanguage,
    setCookLanguage
  } = useTiffin();

  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'menu' | 'orders'

  // Translation Dictionaries
  const translations = {
    en: {
      title: 'Cook Kitchen Portal',
      subtitle: 'Pune Tiffin Operations',
      switchCook: 'Switch Kitchen:',
      dashboard: 'Dashboard',
      menuCapacity: 'Menu & Capacity',
      orderList: 'Daily Delivery List',
      switchLanguage: 'Language:',
      activeKitchen: 'Active Kitchen',
      phone: 'Phone',
      capacity: 'Daily Capacity',
      verified: 'FSSAI Verified'
    },
    hi: {
      title: 'रसोई संचालक पोर्टल',
      subtitle: 'पुणे टिफिन सेवा',
      switchCook: 'रसोई चुनें:',
      dashboard: 'डॅशबोर्ड',
      menuCapacity: 'मेन्यू एवं क्षमता',
      orderList: 'दैनिक आर्डर सूची',
      switchLanguage: 'भाषा:',
      activeKitchen: 'सक्रिय रसोई',
      phone: 'फोन',
      capacity: 'दैनिक क्षमता',
      verified: 'एफएसएसएआई प्रमाणित'
    },
    mr: {
      title: 'स्वयंपाकघर ऑपरेशन्स',
      subtitle: 'पुणे डबेवाला प्लॅटफॉर्म',
      switchCook: 'स्वयंपाकघर निवडा:',
      dashboard: 'डॅशबोर्ड',
      menuCapacity: 'मेन्यू आणि क्षमता',
      orderList: 'दैनिक डबे यादी',
      switchLanguage: 'भाषा:',
      activeKitchen: 'सक्रिय स्वयंपाकघर',
      phone: 'फोन',
      capacity: 'रोजची क्षमता',
      verified: 'FSSAI प्रमाणित'
    }
  };

  const t = translations[cookLanguage] || translations.en;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-50px)] bg-stone-100 text-stone-900 font-sans">
      {/* Desktop Left Sidebar */}
      <aside className="w-full md:w-72 bg-emerald-950 text-white flex flex-col border-r border-emerald-900/60 shadow-xl shrink-0">
        {/* Kitchen Brand Header */}
        <div className="p-5 border-b border-emerald-900/80 bg-emerald-900/40">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-400 flex items-center justify-center text-2xl shadow-md">
              👨‍🍳
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base leading-tight text-white">
                {currentActiveCook.name}
              </h2>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">
                {t.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Kitchen Selector */}
          <div className="mt-4 pt-3 border-t border-emerald-800/80">
            <label className="text-[10px] uppercase font-bold text-emerald-300 block mb-1">
              {t.switchCook}
            </label>
            <select
              value={activeCookId}
              onChange={(e) => setActiveCookId(e.target.value)}
              className="w-full bg-emerald-900 text-white text-xs font-semibold py-2 px-3 rounded-xl border border-emerald-700 focus:outline-none cursor-pointer"
            >
              {cooks.map((c) => (
                <option key={c.id} value={c.id} className="text-stone-900 bg-white">
                  {c.name} ({c.cuisineType})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2 flex-1">
          <button
            id="cook-nav-dashboard"
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5 shrink-0 text-amber-300" />
            <span>{t.dashboard}</span>
          </button>

          <button
            id="cook-nav-menu"
            onClick={() => setActiveTab('menu')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'menu'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            <UtensilsCrossed className="w-5 h-5 shrink-0 text-amber-300" />
            <span>{t.menuCapacity}</span>
          </button>

          <button
            id="cook-nav-orders"
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'orders'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-emerald-200 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            <ClipboardList className="w-5 h-5 shrink-0 text-amber-300" />
            <span>{t.orderList}</span>
          </button>
        </nav>

        {/* Language Switcher Bar in Sidebar */}
        <div className="p-4 border-t border-emerald-900/80 bg-emerald-900/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-emerald-300 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              <span>{t.switchLanguage}</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold">
              {cookLanguage}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 bg-emerald-950 p-1 rounded-xl border border-emerald-800">
            <button
              onClick={() => setCookLanguage('en')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                cookLanguage === 'en'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setCookLanguage('hi')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                cookLanguage === 'hi'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setCookLanguage('mr')}
              className={`py-1.5 text-xs font-bold rounded-lg transition-colors ${
                cookLanguage === 'mr'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-300 hover:text-white'
              }`}
            >
              मराठी
            </button>
          </div>
        </div>
      </aside>

      {/* Main Desktop Work Area */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <CookDashboardScreen onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'menu' && (
          <MenuCapacityScreen />
        )}
        {activeTab === 'orders' && (
          <DailyOrderListScreen />
        )}
      </main>
    </div>
  );
};
