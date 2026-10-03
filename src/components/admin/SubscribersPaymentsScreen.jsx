import React, { useState } from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  Users,
  Search,
  Download,
  Filter,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  RotateCcw
} from 'lucide-react';

export const SubscribersPaymentsScreen = () => {
  const { adminSubscribers, exportSubscribersCSV } = useTiffin();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'Active' | 'Paused' | 'Refunded' | 'Expired'

  // Filter subscribers
  const filteredSubscribers = adminSubscribers.filter((sub) => {
    // Search match
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      sub.customerName.toLowerCase().includes(term) ||
      sub.area.toLowerCase().includes(term) ||
      sub.cookAssigned.toLowerCase().includes(term) ||
      sub.id.toLowerCase().includes(term) ||
      sub.phone.includes(term);

    // Status filter
    const matchesStatus = statusFilter === 'ALL' || sub.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            ACTIVE
          </span>
        );
      case 'Paused':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
            PAUSED
          </span>
        );
      case 'Refunded':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-300">
            REFUNDED
          </span>
        );
      case 'Expired':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-300">
            EXPIRED
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            CANCELLED
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Top Banner & Export CSV Action */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            Financial Ledger & Subscribers
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            Subscribers & Payments
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Full subscriber database with prepaid dues status and export utility
          </p>
        </div>

        <button
          id="export-csv-btn"
          onClick={exportSubscribersCSV}
          className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold text-xs shadow-md shadow-purple-600/20 transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Search and Status Filters */}
      <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, area, cook..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-purple-600 focus:bg-white"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto text-xs font-medium">
          {['ALL', 'Active', 'Paused', 'Refunded', 'Expired'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl transition-colors font-bold text-xs shrink-0 ${
                statusFilter === st
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-5">Subscriber ID</th>
                <th className="py-4 px-5">Customer & Phone</th>
                <th className="py-4 px-5">Pune Area</th>
                <th className="py-4 px-5">Kitchen Assigned</th>
                <th className="py-4 px-5">Plan & Dates</th>
                <th className="py-4 px-5">Amount & Payment</th>
                <th className="py-4 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredSubscribers.map((sub) => (
                <tr
                  key={sub.id}
                  className={`hover:bg-stone-50/70 transition-colors ${
                    sub.customerName.includes('Rohan') ? 'bg-orange-50/30' : ''
                  }`}
                >
                  {/* Subscriber ID */}
                  <td className="py-4 px-5 font-mono font-bold text-stone-600">
                    {sub.id}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-5">
                    <div className="font-heading font-bold text-stone-900 text-sm">
                      {sub.customerName}
                    </div>
                    <div className="text-stone-400 text-[11px] font-mono mt-0.5">
                      {sub.phone}
                    </div>
                  </td>

                  {/* Area */}
                  <td className="py-4 px-5">
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-700 font-bold text-[11px]">
                      📍 {sub.area}
                    </span>
                  </td>

                  {/* Cook */}
                  <td className="py-4 px-5 font-semibold text-stone-800">
                    {sub.cookAssigned}
                  </td>

                  {/* Plan & Dates */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-stone-800 text-[11px]">
                      {sub.planType}
                    </div>
                    <div className="text-stone-400 text-[10px] mt-0.5 font-mono">
                      {sub.startDate} → {sub.endDate}
                    </div>
                  </td>

                  {/* Amount & Payment Status */}
                  <td className="py-4 px-5">
                    <div className="font-heading font-extrabold text-stone-900 text-sm">
                      ₹{sub.amount}
                    </div>
                    <span className={`inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      sub.paymentStatus === 'PAID'
                        ? 'bg-emerald-100 text-emerald-800'
                        : sub.paymentStatus === 'REFUNDED'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {sub.paymentStatus}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 text-right">
                    {getStatusBadge(sub.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 && (
          <div className="p-8 text-center text-stone-400 text-xs">
            No subscribers match the current search or status filter.
          </div>
        )}
      </div>
    </div>
  );
};
