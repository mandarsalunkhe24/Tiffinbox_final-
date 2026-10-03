import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_COOKS,
  INITIAL_USER,
  INITIAL_SUBSCRIPTION,
  INITIAL_COOK_ORDERS,
  INITIAL_COOK_APPLICATIONS,
  INITIAL_ADMIN_SUBSCRIBERS,
  INITIAL_NOTIFICATIONS,
  PUNE_AREAS
} from '../data/mockData';

const TiffinContext = createContext(null);

export const TiffinProvider = ({ children }) => {
  // Current Active Role: 'subscriber' | 'cook' | 'admin'
  const [role, setRole] = useState(() => localStorage.getItem('tiffin_role') || 'subscriber');
  
  // Mobile Frame View Toggle (mobile frame vs full width view for subscriber)
  const [mobileFrameEnabled, setMobileFrameEnabled] = useState(true);

  // Subscriber Auth / Login State
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default true for seamless college demo
  const [currentUser, setCurrentUser] = useState(INITIAL_USER);
  const [selectedArea, setSelectedArea] = useState('hinjewadi');

  // Cooks
  const [cooks, setCooks] = useState(INITIAL_COOKS);
  const [selectedCookId, setSelectedCookId] = useState('cook-1');

  // Subscription State Machine:
  // 'Draft' | 'PendingPayment' | 'Active' | 'Paused' | 'Expired' | 'Cancelled' | 'Refunded'
  const [subscription, setSubscription] = useState(INITIAL_SUBSCRIPTION);

  // New Subscription Draft (when subscriber builds a new plan)
  const [planDraft, setPlanDraft] = useState({
    cookId: 'cook-1',
    planType: 'monthly', // 'weekly' (5) | 'monthly' (20) | 'custom'
    mealDays: 20,
    dailyRate: 110,
    startDate: '2026-10-15',
    mealType: 'Pure Veg',
    deliverySlot: 'Lunch (12:30 PM - 1:30 PM)',
    area: 'Hinjewadi',
    address: 'Tower 4, Quadron Business Park, Hinjewadi Phase 2, Pune'
  });

  // Simulated Payment State
  const [simulateFailure, setSimulateFailure] = useState(false);
  const [paymentAttempts, setPaymentAttempts] = useState(0);
  const [lastPaymentResult, setLastPaymentResult] = useState(null); // 'success' | 'failure' | null

  // Cut-off simulation (9:00 PM rule)
  // By default, let's allow testing the normal pre-cut-off, but provide an instant toggle for "Simulate Past 9:00 PM"
  const [simulatePastCutoff, setSimulatePastCutoff] = useState(false);

  // Cook's orders list (synchronized with subscriber actions)
  const [cookOrders, setCookOrders] = useState(INITIAL_COOK_ORDERS);
  
  // Cook's active kitchen ID
  const [activeCookId, setActiveCookId] = useState('cook-1');

  // Cook's language toggle: 'en' | 'hi' | 'mr'
  const [cookLanguage, setCookLanguage] = useState('en');

  // Admin Data
  const [cookApplications, setCookApplications] = useState(INITIAL_COOK_APPLICATIONS);
  const [adminSubscribers, setAdminSubscribers] = useState(INITIAL_ADMIN_SUBSCRIBERS);
  
  // Notifications / Alerts
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Business rules tooltip modal
  const [rulesModalOpen, setRulesModalOpen] = useState(false);
  const [activeRuleTab, setActiveRuleTab] = useState('pause'); // 'pause' | 'skip' | 'refund'

  // Persist role change
  useEffect(() => {
    localStorage.setItem('tiffin_role', role);
  }, [role]);

  // Helper: Trigger a Toast
  const addToast = (message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Helper: Check if cut-off has passed for tomorrow
  // Rule: Requests must be made before 9:00 PM the day before
  const isCutoffPassed = () => {
    if (simulatePastCutoff) return true;
    const now = new Date();
    // 9:00 PM is 21:00
    return now.getHours() >= 21;
  };

  // Live countdown to next 9:00 PM cut-off
  const [cutoffCountdown, setCutoffCountdown] = useState('06:41:12');
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(21, 0, 0, 0);

      // If already past 9 PM today, count down to tomorrow's 9 PM
      if (now > cutoff) {
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diff = cutoff - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCutoffCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 1. ACTION: Process Subscription Payment
  const processPayment = (paymentMethod = 'UPI') => {
    const newAttempt = paymentAttempts + 1;
    setPaymentAttempts(newAttempt);

    if (simulateFailure) {
      if (newAttempt >= 3) {
        // After 3 failures -> Cancelled
        setSubscription((prev) => ({
          ...prev,
          status: 'Cancelled'
        }));
        setLastPaymentResult('cancelled_after_failures');
        addToast('Payment failed 3 times. Plan draft has been cancelled.', 'error');
      } else {
        setLastPaymentResult('failure');
        addToast(`Payment failed. Attempt ${newAttempt} of 3.`, 'error');
      }
      return false;
    }

    // Success
    const totalAmount = planDraft.mealDays * planDraft.dailyRate;
    const selectedCook = cooks.find((c) => c.id === planDraft.cookId) || cooks[0];

    const newSub = {
      ...subscription,
      id: `SUB-${Date.now().toString().slice(-6)}`,
      cookId: selectedCook.id,
      cookName: selectedCook.name,
      planType: planDraft.planType,
      totalMealDays: planDraft.mealDays,
      mealsUsed: 0,
      dailyRate: planDraft.dailyRate,
      startDate: planDraft.startDate,
      endDate: calculateEndDate(planDraft.startDate, planDraft.mealDays),
      status: 'Active',
      mealType: planDraft.mealType,
      deliverySlot: planDraft.deliverySlot,
      pauseDaysUsed: 0,
      maxPauseDays: 14,
      skipsUsed: 0,
      maxSkips: planDraft.planType === 'weekly' ? 1 : 4,
      payment: {
        transactionId: `TXN-PUN-${Math.floor(100000 + Math.random() * 900000)}`,
        method: paymentMethod,
        amount: totalAmount,
        paidAt: new Date().toISOString(),
        status: 'PAID'
      }
    };

    setSubscription(newSub);
    setLastPaymentResult('success');
    setPaymentAttempts(0);

    // Sync Cook order manifest
    setCookOrders((prev) => {
      const filtered = prev.filter((o) => o.id !== 'ORD-MY-SUB');
      return [
        {
          id: 'ORD-MY-SUB',
          subscriberName: `${currentUser.name} (You)`,
          phone: currentUser.phone,
          area: currentUser.area,
          address: currentUser.address,
          mealType: `${planDraft.mealType} Thali`,
          specialNote: 'New Subscriber - First week onboarding',
          status: 'Preparing',
          isPaused: false,
          isSkipped: false
        },
        ...filtered
      ];
    });

    // Sync Admin subscribers list
    setAdminSubscribers((prev) => [
      {
        id: newSub.id,
        customerName: currentUser.name,
        phone: currentUser.phone,
        area: currentUser.area,
        cookAssigned: selectedCook.name,
        planType: `${planDraft.planType.toUpperCase()} (${planDraft.mealDays} Meals)`,
        amount: totalAmount,
        startDate: planDraft.startDate,
        endDate: newSub.endDate,
        status: 'Active',
        paymentStatus: 'PAID'
      },
      ...prev
    ]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'payment',
        title: 'Payment Successful! 🎉',
        message: `₹${totalAmount} received for ${selectedCook.name}. Your active tiffin plan begins on ${planDraft.startDate}.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast('Payment successful! Subscription is now ACTIVE.', 'success');
    return true;
  };

  // Helper: calculate end date ignoring weekends approximately
  function calculateEndDate(startDateStr, daysCount) {
    const d = new Date(startDateStr);
    let count = 0;
    while (count < daysCount) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
    }
    return d.toISOString().split('T')[0];
  }

  // 2. ACTION: Pause Plan
  const pausePlan = (daysRequested, pauseStartDate) => {
    // Validation: 1 to 14 days
    if (daysRequested < 1 || daysRequested > 14) {
      addToast('Pause duration must be between 1 and 14 days.', 'error');
      return { success: false, error: 'Duration must be between 1 and 14 days' };
    }

    if (subscription.pauseDaysUsed + daysRequested > 14) {
      const remainingAllowed = 14 - subscription.pauseDaysUsed;
      addToast(`Exceeds limit! You can only use ${remainingAllowed} more pause day(s).`, 'error');
      return { success: false, error: `Maximum 14 pause days allowed across plan. You have ${remainingAllowed} days left.` };
    }

    // Cut-off check
    if (isCutoffPassed()) {
      addToast('Cut-off passed (9:00 PM) – earliest date is day after tomorrow.', 'error');
      return { success: false, error: 'Cut-off passed – earliest date is day after tomorrow' };
    }

    // Update subscription
    const updatedPauseDaysUsed = subscription.pauseDaysUsed + daysRequested;
    
    // Extend end date by pause days
    const currentEnd = new Date(subscription.endDate);
    currentEnd.setDate(currentEnd.getDate() + daysRequested);
    const newEndDate = currentEnd.toISOString().split('T')[0];

    // Update calendar items to 'paused'
    const updatedCalendar = subscription.calendarDays.map((cd, idx) => {
      // Mark next upcoming 1-2 days as paused
      if (idx >= 14 && idx < 14 + daysRequested && cd.status === 'upcoming') {
        return { ...cd, status: 'paused' };
      }
      return cd;
    });

    setSubscription((prev) => ({
      ...prev,
      status: 'Paused',
      pauseDaysUsed: updatedPauseDaysUsed,
      endDate: newEndDate,
      pauseHistory: [
        {
          from: pauseStartDate,
          days: daysRequested,
          requestedAt: new Date().toISOString()
        },
        ...prev.pauseHistory
      ],
      calendarDays: updatedCalendar
    }));

    // CRITICAL: Synchronize Cook Manifest!
    // Paused subscribers are EXCLUDED from the cook's daily order list!
    setCookOrders((prev) =>
      prev.map((order) =>
        order.subscriberName.includes('Rohan')
          ? { ...order, isPaused: true, status: 'Paused' }
          : order
      )
    );

    // Sync Admin subscribers list
    setAdminSubscribers((prev) =>
      prev.map((sub) =>
        sub.customerName.includes('Rohan') ? { ...sub, status: 'Paused', endDate: newEndDate } : sub
      )
    );

    // Add alert notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'pause',
        title: 'Plan Paused Successfully',
        message: `Paused for ${daysRequested} day(s). End date extended by ${daysRequested} day(s) to ${newEndDate}.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast(`Plan paused! End date extended by ${daysRequested} days.`, 'success');
    return { success: true, message: `End date extended by ${daysRequested} days` };
  };

  // 2b. ACTION: Resume Paused Plan
  const resumePlan = () => {
    setSubscription((prev) => ({
      ...prev,
      status: 'Active'
    }));

    setCookOrders((prev) =>
      prev.map((order) =>
        order.subscriberName.includes('Rohan')
          ? { ...order, isPaused: false, status: 'Ready for Pickup' }
          : order
      )
    );

    setAdminSubscribers((prev) =>
      prev.map((sub) =>
        sub.customerName.includes('Rohan') ? { ...sub, status: 'Active' } : sub
      )
    );

    addToast('Plan resumed! Your daily tiffin service will continue.', 'success');
  };

  // 3. ACTION: Skip a Single Meal
  const skipMeal = (dateToSkip) => {
    const maxSkips = subscription.planType === 'weekly' ? 1 : 4;
    if (subscription.skipsUsed >= maxSkips) {
      addToast(`Maximum ${maxSkips} skips allowed for your plan.`, 'error');
      return { success: false, error: `Maximum ${maxSkips} skips allowed for your plan.` };
    }

    const cutoffPassed = isCutoffPassed();
    const givesCredit = !cutoffPassed;

    const updatedSkipsUsed = subscription.skipsUsed + 1;

    // Update calendar
    const updatedCalendar = subscription.calendarDays.map((cd) => {
      if (cd.date === dateToSkip || cd.dayNumber === 15) {
        return { ...cd, status: 'skipped' };
      }
      return cd;
    });

    setSubscription((prev) => ({
      ...prev,
      skipsUsed: updatedSkipsUsed,
      skipHistory: [
        {
          date: dateToSkip,
          requestedAt: new Date().toISOString(),
          credited: givesCredit
        },
        ...prev.skipHistory
      ],
      calendarDays: updatedCalendar
    }));

    // CRITICAL: Synchronize Cook Manifest!
    // Skipped subscribers are EXCLUDED from the cook's daily order list!
    setCookOrders((prev) =>
      prev.map((order) =>
        order.subscriberName.includes('Rohan')
          ? { ...order, isSkipped: true, status: 'Skipped' }
          : order
      )
    );

    const warnMsg = cutoffPassed
      ? 'Skip confirmed. Warning: Cut-off passed – No credit will be given.'
      : 'Meal skipped! 1 meal credit added to rollover.';

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'skip',
        title: 'Meal Skipped',
        message: cutoffPassed
          ? `Meal for ${dateToSkip} skipped after cut-off. As per policy, no credit was given.`
          : `Meal for ${dateToSkip} skipped. 1 credit rolled over.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast(warnMsg, cutoffPassed ? 'warning' : 'success');
    return { success: true, message: warnMsg };
  };

  // 4. ACTION: Cancel & Refund Calculation
  // Refund rules:
  // - No meal delivered yet -> 100% refund
  // - Meals delivered and >= 3 unused meal days -> refund = unused days * rate * 90% (10% admin fee)
  // - Fewer than 3 unused days -> 0 refund with explanation
  const calculateRefund = (mealsDeliveredOverride) => {
    const delivered = mealsDeliveredOverride !== undefined ? mealsDeliveredOverride : subscription.mealsUsed;
    const totalDays = subscription.totalMealDays;
    const rate = subscription.dailyRate;
    const unusedDays = Math.max(0, totalDays - delivered);
    const totalPaid = totalDays * rate;

    let refundAmount = 0;
    let adminFee = 0;
    let eligible = false;
    let ruleApplied = '';
    let explanation = '';

    if (delivered === 0) {
      refundAmount = totalPaid;
      adminFee = 0;
      eligible = true;
      ruleApplied = '100% Full Refund (Zero meals delivered)';
      explanation = 'Since your plan has not yet delivered any meal, you are eligible for an immediate 100% refund.';
    } else if (unusedDays >= 3) {
      const grossUnusedValue = unusedDays * rate;
      adminFee = Math.round(grossUnusedValue * 0.10);
      refundAmount = grossUnusedValue - adminFee;
      eligible = true;
      ruleApplied = '90% Refund on Unused Days (10% Admin & Kitchen fee deducted)';
      explanation = `You have ${unusedDays} unused meal days. As per standard refund policy, a 10% administrative & raw material fee is deducted.`;
    } else {
      refundAmount = 0;
      adminFee = unusedDays * rate;
      eligible = false;
      ruleApplied = '₹0 Refund (Fewer than 3 unused days)';
      explanation = `You have only ${unusedDays} unused meal day(s) remaining. Per Pune tiffin kitchen policy, cancellations require at least 3 unused days to process a cash refund.`;
    }

    return {
      totalDays,
      delivered,
      unusedDays,
      dailyRate: rate,
      totalPaid,
      consumedValue: delivered * rate,
      grossUnusedValue: unusedDays * rate,
      adminFee,
      refundAmount,
      eligible,
      ruleApplied,
      explanation
    };
  };

  const confirmCancelAndRefund = () => {
    const refundDetails = calculateRefund();

    setSubscription((prev) => ({
      ...prev,
      status: 'Refunded',
      refundDetails: {
        ...refundDetails,
        refundedAt: new Date().toISOString(),
        payoutMethod: 'Source Account (UPI / Bank)'
      }
    }));

    // Update Cook orders: Remove subscriber from cooking manifest
    setCookOrders((prev) =>
      prev.filter((o) => !o.subscriberName.includes('Rohan'))
    );

    // Update Admin records
    setAdminSubscribers((prev) =>
      prev.map((sub) =>
        sub.customerName.includes('Rohan')
          ? { ...sub, status: 'Refunded', paymentStatus: 'REFUNDED' }
          : sub
      )
    );

    // Add Alert
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        type: 'refund',
        title: 'Plan Cancelled & Refund Initiated',
        message: `₹${refundDetails.refundAmount} refund approved. Expected in 5-7 working days to source account.`,
        time: 'Just now',
        read: false
      },
      ...prev
    ]);

    addToast(`Subscription cancelled. Refund of ₹${refundDetails.refundAmount} initiated!`, 'success');
  };

  // 5. COOK ACTIONS
  // Mark Order Delivered
  const markOrderDelivered = (orderId) => {
    setCookOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: 'Delivered' };
        }
        return order;
      })
    );

    // If marking Rohan's order delivered, update subscriber mealsUsed!
    const targetOrder = cookOrders.find((o) => o.id === orderId);
    if (targetOrder && targetOrder.subscriberName.includes('Rohan')) {
      setSubscription((prev) => ({
        ...prev,
        mealsUsed: Math.min(prev.totalMealDays, prev.mealsUsed + 1)
      }));
    }

    addToast('Tiffin marked as Delivered! Subscriber notified.', 'success');
  };

  // Cook: Publish Tomorrow's Menu
  const publishCookMenu = (cookId, menuData) => {
    setCooks((prev) =>
      prev.map((cook) => {
        if (cook.id === cookId) {
          return {
            ...cook,
            menu: {
              ...cook.menu,
              tomorrow: menuData
            }
          };
        }
        return cook;
      })
    );
    addToast("Tomorrow's menu published to subscribers!", 'success');
  };

  // Cook: Update Daily Capacity
  const updateCookCapacity = (cookId, newCapacity) => {
    setCooks((prev) =>
      prev.map((cook) => (cook.id === cookId ? { ...cook, dailyCapacity: newCapacity } : cook))
    );
    addToast(`Daily kitchen capacity updated to ${newCapacity} tiffins!`, 'success');
  };

  // 6. ADMIN ACTIONS
  // Approve or Reject Cook Application
  const updateCookApplicationStatus = (appId, newStatus) => {
    setCookApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
    addToast(`Application ${appId} marked as ${newStatus}!`, newStatus === 'Approved' ? 'success' : 'info');
  };

  // Admin: Export Subscribers CSV
  const exportSubscribersCSV = () => {
    const headers = ['Subscriber ID', 'Customer Name', 'Phone', 'Pune Area', 'Cook Assigned', 'Plan Type', 'Amount (INR)', 'Start Date', 'End Date', 'Status', 'Payment Status'];
    const rows = adminSubscribers.map((s) => [
      s.id,
      `"${s.customerName}"`,
      s.phone,
      s.area,
      `"${s.cookAssigned}"`,
      `"${s.planType}"`,
      s.amount,
      s.startDate,
      s.endDate,
      s.status,
      s.paymentStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tiffinbox_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('Exported subscribers CSV successfully!', 'success');
  };

  // Reset Demo State
  const resetDemoState = () => {
    setSubscription(INITIAL_SUBSCRIPTION);
    setCookOrders(INITIAL_COOK_ORDERS);
    setAdminSubscribers(INITIAL_ADMIN_SUBSCRIBERS);
    setCookApplications(INITIAL_COOK_APPLICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setPaymentAttempts(0);
    setSimulateFailure(false);
    setSimulatePastCutoff(false);
    addToast('Demo state reset to initial values.', 'info');
  };

  // Active Cook Helper
  const currentActiveCook = cooks.find((c) => c.id === activeCookId) || cooks[0];

  return (
    <TiffinContext.Provider
      value={{
        // Role & Frame
        role,
        setRole,
        mobileFrameEnabled,
        setMobileFrameEnabled,

        // User & Auth
        isLoggedIn,
        setIsLoggedIn,
        currentUser,
        setCurrentUser,
        selectedArea,
        setSelectedArea,
        puneAreas: PUNE_AREAS,

        // Cooks
        cooks,
        selectedCookId,
        setSelectedCookId,
        activeCookId,
        setActiveCookId,
        currentActiveCook,
        publishCookMenu,
        updateCookCapacity,
        cookLanguage,
        setCookLanguage,

        // Subscriptions
        subscription,
        setSubscription,
        planDraft,
        setPlanDraft,
        pausePlan,
        resumePlan,
        skipMeal,
        calculateRefund,
        confirmCancelAndRefund,

        // Payments
        simulateFailure,
        setSimulateFailure,
        paymentAttempts,
        lastPaymentResult,
        setLastPaymentResult,
        processPayment,

        // Cutoff Simulation
        cutoffCountdown,
        simulatePastCutoff,
        setSimulatePastCutoff,
        isCutoffPassed,

        // Cook Manifest
        cookOrders,
        markOrderDelivered,

        // Admin
        cookApplications,
        updateCookApplicationStatus,
        adminSubscribers,
        exportSubscribersCSV,

        // Notifications & Toasts
        notifications,
        setNotifications,
        toasts,
        addToast,
        removeToast,

        // Business Rules Modal
        rulesModalOpen,
        setRulesModalOpen,
        activeRuleTab,
        setActiveRuleTab,

        // Reset
        resetDemoState
      }}
    >
      {children}
    </TiffinContext.Provider>
  );
};

export const useTiffin = () => {
  const context = useContext(TiffinContext);
  if (!context) {
    throw new Error('useTiffin must be used within a TiffinProvider');
  }
  return context;
};
