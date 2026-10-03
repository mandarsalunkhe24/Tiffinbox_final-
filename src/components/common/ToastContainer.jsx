import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useTiffin();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-stone-900 text-white';
        let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;

        if (toast.type === 'success') {
          bg = 'bg-[#166534] text-white border border-emerald-500/30';
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />;
        } else if (toast.type === 'error') {
          bg = 'bg-rose-900 text-white border border-rose-500/30';
          icon = <XCircle className="w-5 h-5 text-rose-300 shrink-0" />;
        } else if (toast.type === 'warning') {
          bg = 'bg-amber-900 text-white border border-amber-500/30';
          icon = <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`${bg} pointer-events-auto p-3.5 rounded-xl shadow-xl flex items-start gap-3 text-sm animate-fade-in transition-all`}
          >
            {icon}
            <div className="flex-1 font-medium leading-snug">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-0.5 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
