import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Home,
  CalendarCheck,
  Bell,
  User,
  Sparkles
} from 'lucide-react';

import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { CookDetailScreen } from './CookDetailScreen';
import { PlanBuilderScreen } from './PlanBuilderScreen';
import { CheckoutScreen } from './CheckoutScreen';
import { PaymentResultScreen } from './PaymentResultScreen';
import { MySubscriptionScreen } from './MySubscriptionScreen';
import { PauseSkipModal } from './PauseSkipModal';
import { CancelRefundScreen } from './CancelRefundScreen';
import { AlertsScreen } from './AlertsScreen';
import { ProfileScreen } from './ProfileScreen';

export const SubscriberShell = () => {
  const { isLoggedIn, setIsLoggedIn, notifications, subscription } = useTiffin();

  // Active view within the subscriber app
  const [currentView, setCurrentView] = useState('home'); 
  // 'login' | 'home' | 'cook-detail' | 'plan-builder' | 'checkout' | 'payment-result' | 'my-plan' | 'cancel-refund' | 'alerts' | 'profile'

  const [activeCookId, setActiveCookId] = useState('cook-1');
  const [pauseSkipModalOpen, setPauseSkipModalOpen] = useState(false);
  const [pauseSkipInitialTab, setPauseSkipInitialTab] = useState('pause');
  const [paymentSuccess, setPaymentSuccess] = useState(true);

  // If user is not logged in, render LoginScreen
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLoginSuccess={() => setCurrentView('home')}
      />
    );
  }

  const unreadAlerts = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex-1 flex flex-col relative w-full h-full bg-[#FFF7ED]">
      {/* Screen Router */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {currentView === 'home' && (
          <HomeScreen
            onSelectCook={(id) => {
              setActiveCookId(id);
              setCurrentView('cook-detail');
            }}
            onNavigateToPlan={() => setCurrentView('my-plan')}
          />
        )}

        {currentView === 'cook-detail' && (
          <CookDetailScreen
            cookId={activeCookId}
            onBack={() => setCurrentView('home')}
            onSubscribe={(id) => {
              setActiveCookId(id);
              setCurrentView('plan-builder');
            }}
          />
        )}

        {currentView === 'plan-builder' && (
          <PlanBuilderScreen
            onBack={() => setCurrentView('cook-detail')}
            onProceedToCheckout={() => setCurrentView('checkout')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutScreen
            onBack={() => setCurrentView('plan-builder')}
            onCompletePayment={(isSuccess) => {
              setPaymentSuccess(isSuccess);
              setCurrentView('payment-result');
            }}
          />
        )}

        {currentView === 'payment-result' && (
          <PaymentResultScreen
            isSuccess={paymentSuccess}
            onRetry={() => setCurrentView('checkout')}
            onGoToSubscription={() => setCurrentView('my-plan')}
            onBrowseMore={() => setCurrentView('home')}
          />
        )}

        {currentView === 'my-plan' && (
          <MySubscriptionScreen
            onOpenPauseSkip={(tab) => {
              setPauseSkipInitialTab(tab);
              setPauseSkipModalOpen(true);
            }}
            onOpenCancelRefund={() => setCurrentView('cancel-refund')}
            onBrowseCooks={() => setCurrentView('home')}
          />
        )}

        {currentView === 'cancel-refund' && (
          <CancelRefundScreen
            onBack={() => setCurrentView('my-plan')}
            onCompleteCancellation={() => setCurrentView('my-plan')}
          />
        )}

        {currentView === 'alerts' && (
          <AlertsScreen />
        )}

        {currentView === 'profile' && (
          <ProfileScreen
            onLogout={() => {
              setIsLoggedIn(false);
            }}
          />
        )}
      </div>

      {/* Bottom Navigation Bar */}
      {/* Show bottom nav on main tabs: home, my-plan, alerts, profile */}
      {['home', 'my-plan', 'alerts', 'profile'].includes(currentView) && (
        <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-stone-200 flex items-center justify-around px-2 z-20 shadow-lg">
          <button
            id="nav-home-btn"
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              currentView === 'home' ? 'text-orange-600 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>

          <button
            id="nav-plan-btn"
            onClick={() => setCurrentView('my-plan')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
              currentView === 'my-plan' ? 'text-orange-600 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <CalendarCheck className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">My Plan</span>
            {subscription && subscription.status === 'Active' && (
              <span className="absolute top-1 right-6 w-2 h-2 rounded-full bg-emerald-500" />
            )}
          </button>

          <button
            id="nav-alerts-btn"
            onClick={() => setCurrentView('alerts')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
              currentView === 'alerts' ? 'text-orange-600 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Alerts</span>
            {unreadAlerts > 0 && (
              <span className="absolute top-1 right-6 w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadAlerts}
              </span>
            )}
          </button>

          <button
            id="nav-profile-btn"
            onClick={() => setCurrentView('profile')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              currentView === 'profile' ? 'text-orange-600 font-bold' : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Profile</span>
          </button>
        </nav>
      )}

      {/* Pause / Skip Modal (Bottom Sheet) */}
      <PauseSkipModal
        isOpen={pauseSkipModalOpen}
        initialTab={pauseSkipInitialTab}
        onClose={() => setPauseSkipModalOpen(false)}
      />
    </div>
  );
};
