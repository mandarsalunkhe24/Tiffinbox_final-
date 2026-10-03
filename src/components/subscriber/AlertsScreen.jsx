import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Bell,
  CheckCircle2,
  Clock,
  PauseCircle,
  Receipt,
  SkipForward,
  Utensils,
  CheckCheck
} from 'lucide-react';

export const AlertsScreen = () => {
  const { notifications, setNotifications, addToast } = useTiffin();

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    addToast('All alerts marked as read', 'info');
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'payment':
        return <Receipt className="w-4 h-4 text-emerald-600" />;
      case 'pause':
        return <PauseCircle className="w-4 h-4 text-amber-600" />;
      case 'skip':
        return <SkipForward className="w-4 h-4 text-blue-600" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-orange-600" />;
      case 'cook':
        return <Utensils className="w-4 h-4 text-orange-600" />;
      default:
        return <Bell className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 border-b border-stone-200 sticky top-0 z-20 flex items-center justify-between">
        <div>
          <h1 className="font-heading font-extrabold text-base text-stone-900">
            Alerts & Notifications
          </h1>
          <p className="text-[11px] text-stone-500">
            {notifications.filter((n) => !n.read).length} unread updates
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs text-orange-600 hover:text-orange-700 font-bold flex items-center gap-1 p-1"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="p-4 space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
              notif.read
                ? 'bg-white border-stone-200/80 shadow-2xs opacity-85'
                : 'bg-orange-50/50 border-orange-200 shadow-xs'
            }`}
          >
            <div className="p-2 bg-stone-100 rounded-xl shrink-0 mt-0.5">
              {getAlertIcon(notif.type)}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs text-stone-900">
                  {notif.title}
                </h4>
                <span className="text-[10px] text-stone-400 font-mono">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-stone-600 leading-snug">
                {notif.message}
              </p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="p-8 text-center text-stone-400 text-xs">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
};
