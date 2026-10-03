import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  User,
  Phone,
  Mail,
  MapPin,
  Utensils,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronRight,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const ProfileScreen = ({ onLogout }) => {
  const {
    currentUser,
    setCurrentUser,
    subscription,
    resetDemoState,
    setRulesModalOpen,
    setActiveRuleTab,
    addToast
  } = useTiffin();

  return (
    <div className="flex-1 flex flex-col pb-20 overflow-y-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl font-bold border border-white/30 shadow-inner">
            👨‍💼
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-base leading-tight">
              {currentUser.name}
            </h1>
            <p className="text-xs text-orange-100 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3" />
              <span>+91 {currentUser.phone}</span>
            </p>
            <span className="inline-block mt-1 text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full font-semibold">
              Pune Tech Corridor Subscriber
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Office Delivery Address */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Office Delivery Location</span>
            </span>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
              Primary Desk
            </span>
          </div>
          <p className="text-xs text-stone-700 font-medium leading-relaxed">
            {currentUser.address}
          </p>
          <div className="text-[11px] text-stone-400">
            Pincode: {currentUser.pincode} • Hinjewadi Phase 2
          </div>
        </div>

        {/* Dietary Preferences */}
        <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-2xs space-y-2">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Utensils className="w-4 h-4 text-orange-500" />
            <span>Food Preferences</span>
          </span>
          <div className="p-2.5 bg-stone-50 rounded-xl text-xs text-stone-700">
            <strong>Diet Type:</strong> {currentUser.dietPreference}
          </div>
          <p className="text-[10px] text-stone-400">
            Cook is instructed to prepare fresh tiffins with low oil and medium spice.
          </p>
        </div>

        {/* Action Links */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs divide-y divide-stone-100 overflow-hidden text-xs">
          <div
            onClick={() => {
              setActiveRuleTab('pause');
              setRulesModalOpen(true);
            }}
            className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <HelpCircle className="w-4 h-4 text-orange-500" />
              <span>Subscription Rules & Policies</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>

          <div
            onClick={() => addToast('Connecting to WhatsApp TiffinBox Pune concierge (+91 98230 00000)', 'info')}
            className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer"
          >
            <div className="flex items-center gap-2.5 text-stone-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pune Desk Support & Delivery Help</span>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400" />
          </div>

          <div
            onClick={resetDemoState}
            className="p-3.5 flex items-center justify-between hover:bg-stone-50 cursor-pointer text-orange-600"
          >
            <div className="flex items-center gap-2.5 font-medium">
              <RotateCcw className="w-4 h-4 text-orange-500" />
              <span>Reset Prototype Demo State</span>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-400" />
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3 bg-white hover:bg-rose-50 text-rose-600 font-bold text-xs rounded-2xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out (Test Login Flow Again)</span>
        </button>
      </div>
    </div>
  );
};
