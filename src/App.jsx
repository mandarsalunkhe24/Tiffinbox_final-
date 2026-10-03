import React from 'react';
import { TiffinProvider, useTiffin } from './context/TiffinContext';
import { DemoSwitcher } from './components/common/DemoSwitcher';
import { ToastContainer } from './components/common/ToastContainer';
import { BusinessRulesModal } from './components/common/BusinessRulesModal';
import { MobileFrame } from './components/common/MobileFrame';
import { SubscriberShell } from './components/subscriber/SubscriberShell';
import { CookLayout } from './components/cook/CookLayout';
import { AdminLayout } from './components/admin/AdminLayout';

function MainContent() {
  const { role } = useTiffin();

  if (role === 'cook') {
    return <CookLayout />;
  }

  if (role === 'admin') {
    return <AdminLayout />;
  }

  // Default: Subscriber app inside mobile frame
  return (
    <MobileFrame>
      <SubscriberShell />
    </MobileFrame>
  );
}

function App() {
  return (
    <TiffinProvider>
      <div className="min-h-screen flex flex-col bg-[#FFF7ED] text-stone-900 font-sans selection:bg-orange-200 selection:text-orange-950">
        {/* Top Demo Bar for Reviewers & Project Evaluation */}
        <DemoSwitcher />

        {/* Global Toast Feedback */}
        <ToastContainer />

        {/* Comprehensive Business Rules Modal (ℹ️) */}
        <BusinessRulesModal />

        {/* Active Role View Router */}
        <MainContent />
      </div>
    </TiffinProvider>
  );
}

export default App;
