import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Search,
  Filter,
  CheckCheck
} from 'lucide-react';

export const DailyOrderListScreen = () => {
  const {
    currentActiveCook,
    cookOrders,
    markOrderDelivered,
    cookLanguage,
    addToast
  } = useTiffin();

  // Translations
  const labels = {
    en: {
      heading: 'Daily Delivery Manifest',
      subheading: 'Office desk delivery list sorted by Pune IT corridor routes',
      exclusionNote: 'paused and',
      exclusionNote2: 'skipped subscribers are excluded from today’s cooking tally.',
      printBtn: 'Print Kitchen Sheet',
      searchPlaceholder: 'Search subscriber, building, or area...',
      markAllBtn: 'Mark All Dispatched',
      colToken: 'Token #',
      colSubscriber: 'Subscriber & Contact',
      colAddress: 'Office Desk & Tech Park',
      colMeal: 'Meal Type & Notes',
      colStatus: 'Status / Action',
      markDelivered: 'Mark Delivered',
      deliveredBadge: 'Delivered ✓'
    },
    hi: {
      heading: 'दैनिक डिलीवरी सूची',
      subheading: 'पुणे आईटी पार्क के अनुसार टिफिन वितरण सूची',
      exclusionNote: 'पॉज किए गए और',
      exclusionNote2: 'स्किप किए गए ग्राहकों को आज की सूची से बाहर रखा गया है।',
      printBtn: 'रसोई पर्ची प्रिंट करें',
      searchPlaceholder: 'ग्राहक, भवन या क्षेत्र खोजें...',
      markAllBtn: 'सभी डिस्पैच चिह्नित करें',
      colToken: 'टोकन #',
      colSubscriber: 'ग्राहक एवं फोन',
      colAddress: 'कार्यालय पता एवं आईटी पार्क',
      colMeal: 'भोजन प्रकार व टिप्पणी',
      colStatus: 'स्थिति / क्रिया',
      markDelivered: 'डिलीवर हुआ',
      deliveredBadge: 'पहुंचा दिया ✓'
    },
    mr: {
      heading: 'दैनिक डबे वितरण यादी',
      subheading: 'पुणे आयटी पार्क डेस्क वितरण आणि पत्ता यादी',
      exclusionNote: 'पॉज केलेले आणि',
      exclusionNote2: 'वगळलेले डबे आजच्या स्वयंपाकातून आपोआप वगळण्यात आले आहेत.',
      printBtn: 'डिलिव्हरी शीट प्रिंट करा',
      searchPlaceholder: 'वर्गणीदार किंवा पत्ता शोधा...',
      markAllBtn: 'सर्व डबे रवाना करा',
      colToken: 'टोकन #',
      colSubscriber: 'वर्गणीदार व संपर्क',
      colAddress: 'ऑफिस डेस्क व पत्ता',
      colMeal: 'डब्याचा प्रकार व सूचना',
      colStatus: 'स्थिती / कृती',
      markDelivered: 'डबा पोहोचवला',
      deliveredBadge: 'पोहोचवला ✓'
    }
  };

  const l = labels[cookLanguage] || labels.en;

  const [searchTerm, setSearchTerm] = useState('');

  // Count paused and skipped subscribers
  const pausedCount = cookOrders.filter((o) => o.isPaused).length;
  const skippedCount = cookOrders.filter((o) => o.isSkipped).length;

  // Filter to only active (NON-PAUSED and NON-SKIPPED) for the delivery list
  const activeOrders = cookOrders
    .filter((o) => !o.isPaused && !o.isSkipped)
    .filter((o) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        o.subscriberName.toLowerCase().includes(term) ||
        o.address.toLowerCase().includes(term) ||
        o.area.toLowerCase().includes(term) ||
        o.phone.includes(term)
      );
    });

  const handlePrint = () => {
    window.print();
  };

  const handleMarkAllDelivered = () => {
    activeOrders.forEach((o) => markOrderDelivered(o.id));
    addToast('All active tiffins marked as Delivered!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in print:p-0">
      {/* Header & Print Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs print:border-none print:shadow-none">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {currentActiveCook.name} • Manifest
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            {l.heading}
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            {l.subheading}
          </p>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleMarkAllDelivered}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <CheckCheck className="w-4 h-4 text-emerald-700" />
            <span>{l.markAllBtn}</span>
          </button>

          <button
            id="print-list-btn"
            onClick={handlePrint}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>{l.printBtn}</span>
          </button>
        </div>
      </div>

      {/* AUTOMATIC EXCLUSION NOTE (MANDATORY REQUIREMENT) */}
      <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-2xl text-amber-950 flex items-center justify-between text-xs shadow-2xs">
        <div className="flex items-center gap-2.5">
          <Clock className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="font-medium">
            ℹ️ <strong className="font-bold">{pausedCount} {l.exclusionNote} {skippedCount} {l.exclusionNote2}</strong> Only confirmed active deliveries appear on this manifest.
          </span>
        </div>
        <span className="px-2.5 py-1 bg-amber-200/60 text-amber-900 font-bold rounded-lg text-[11px] shrink-0 font-mono">
          {activeOrders.length} to dispatch
        </span>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-stone-200 shadow-2xs print:hidden">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={l.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs text-stone-900 bg-stone-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white"
          />
        </div>
        <div className="text-xs text-stone-500 font-medium px-2">
          Showing {activeOrders.length} orders
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden print:border-none print:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">{l.colToken}</th>
                <th className="py-3.5 px-4">{l.colSubscriber}</th>
                <th className="py-3.5 px-4">{l.colAddress}</th>
                <th className="py-3.5 px-4">{l.colMeal}</th>
                <th className="py-3.5 px-4 text-right">{l.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {activeOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  className={`hover:bg-stone-50/80 transition-colors ${
                    order.subscriberName.includes('Rohan')
                      ? 'bg-orange-50/40'
                      : ''
                  }`}
                >
                  {/* Token Number */}
                  <td className="py-4 px-4 font-mono font-bold text-stone-800">
                    <span className="p-1.5 bg-stone-100 rounded-lg text-stone-700">
                      #{idx + 101}
                    </span>
                  </td>

                  {/* Subscriber Name & Phone */}
                  <td className="py-4 px-4">
                    <div className="font-heading font-bold text-stone-900 text-sm">
                      {order.subscriberName}
                    </div>
                    <div className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5 font-mono">
                      <Phone className="w-3 h-3 text-stone-400" />
                      <span>{order.phone}</span>
                    </div>
                  </td>

                  {/* Address */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="text-stone-800 font-semibold flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                      <span>{order.address}</span>
                    </div>
                    <div className="text-stone-400 text-[11px] mt-0.5 ml-4">
                      Area: {order.area}
                    </div>
                  </td>

                  {/* Meal Type & Special Notes */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                      {order.mealType}
                    </span>
                    {order.specialNote && (
                      <p className="text-[11px] text-stone-500 mt-1 italic">
                        Note: "{order.specialNote}"
                      </p>
                    )}
                  </td>

                  {/* Status / Action */}
                  <td className="py-4 px-4 text-right">
                    {order.status === 'Delivered' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold text-xs bg-emerald-100 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>{l.deliveredBadge}</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => markOrderDelivered(order.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors"
                      >
                        {l.markDelivered}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {activeOrders.length === 0 && (
          <div className="p-8 text-center text-stone-400 text-xs">
            No active subscribers match this search.
          </div>
        )}
      </div>
    </div>
  );
};
