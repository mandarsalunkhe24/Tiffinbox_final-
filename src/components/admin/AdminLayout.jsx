import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  ShieldAlert,
  BarChart3,
  Users,
  CheckSquare,
  CreditCard,
  Building2,
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';

import { AdminOverviewScreen } from './AdminOverviewScreen';
import { CookApprovalsScreen } from './CookApprovalsScreen';
import { SubscribersPaymentsScreen } from './SubscribersPaymentsScreen';

export const AdminLayout = () => {
  const { setRole, cookApplications, adminSubscribers } = useTiffin();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'approvals' | 'subscribers'

  const pendingApprovalsCount = cookApplications.filter((a) => a.status === 'Pending').length;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-50px)] bg-stone-100 text-stone-900 font-sans">
      {/* Desktop Left Sidebar */}
      <aside className="w-full md:w-72 bg-stone-900 text-stone-100 flex flex-col border-r border-stone-800 shadow-xl shrink-0">
        {/* Brand Header */}
        <div className="p-5 border-b border-stone-800 bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-xl shadow-md">
              📊
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-base leading-tight text-white">
                Admin Console
              </h2>
              <p className="text-xs text-purple-400 font-semibold mt-0.5">
                Founder & City Ops
              </p>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-stone-400">
            Aditya Kulkarni • Pune Hub Operations
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="p-4 space-y-1.5 flex-1">
          <button
            id="admin-nav-overview"
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <BarChart3 className="w-5 h-5 shrink-0 text-purple-300" />
            <span>Platform Overview</span>
          </button>

          <button
            id="admin-nav-approvals"
            onClick={() => setActiveTab('approvals')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'approvals'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckSquare className="w-5 h-5 shrink-0 text-purple-300" />
              <span>Cook Approvals</span>
            </div>
            {pendingApprovalsCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-900 text-xs font-black flex items-center justify-center">
                {pendingApprovalsCount}
              </span>
            )}
          </button>

          <button
            id="admin-nav-subscribers"
            onClick={() => setActiveTab('subscribers')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all ${
              activeTab === 'subscribers'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-stone-400 hover:text-white hover:bg-stone-800/60'
            }`}
          >
            <Users className="w-5 h-5 shrink-0 text-purple-300" />
            <span>Subscribers & Dues</span>
          </button>
        </nav>

        {/* Quick Link back to Subscriber view */}
        <div className="p-4 border-t border-stone-800 bg-stone-950/40">
          <button
            onClick={() => setRole('subscriber')}
            className="w-full py-2.5 px-3 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Switch to Subscriber App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* Main Admin Screen Content */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {activeTab === 'overview' && (
          <AdminOverviewScreen onNavigateTab={setActiveTab} />
        )}
        {activeTab === 'approvals' && (
          <CookApprovalsScreen />
        )}
        {activeTab === 'subscribers' && (
          <SubscribersPaymentsScreen />
        )}
      </main>
    </div>
  );
};
