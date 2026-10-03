import React from 'react';
import { useTiffin } from '../../context/TiffinContext';
import {
  CheckSquare,
  ShieldCheck,
  Check,
  X,
  Star,
  Award,
  Calendar,
  AlertCircle,
  Building,
  UserCheck
} from 'lucide-react';

export const CookApprovalsScreen = () => {
  const { cookApplications, updateCookApplicationStatus } = useTiffin();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
            <Check className="w-3.5 h-3.5" />
            Approved
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
            <X className="w-3.5 h-3.5" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
            Pending Audit
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            FSSAI & Hygiene Verifications
          </span>
          <h1 className="font-heading font-extrabold text-2xl text-stone-900 mt-2">
            Cook Applications & Approvals
          </h1>
          <p className="text-sm text-stone-500 mt-0.5">
            Review Pune home cook onboarding requests, kitchen audits, and tasting ratings
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-stone-400 block">Pending Applications:</span>
          <span className="font-heading font-black text-2xl text-amber-600">
            {cookApplications.filter((a) => a.status === 'Pending').length} Pending
          </span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-4 px-5">Application ID</th>
                <th className="py-4 px-5">Applicant & Kitchen</th>
                <th className="py-4 px-5">Pune Area</th>
                <th className="py-4 px-5">FSSAI & Hygiene Score</th>
                <th className="py-4 px-5">Sample Tasting</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {cookApplications.map((app) => (
                <tr key={app.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* ID */}
                  <td className="py-4 px-5 font-mono font-bold text-stone-600">
                    {app.id}
                    <span className="block text-[10px] text-stone-400 font-sans font-normal mt-0.5">
                      Applied {app.appliedDate}
                    </span>
                  </td>

                  {/* Kitchen & Applicant */}
                  <td className="py-4 px-5">
                    <div className="font-heading font-bold text-stone-900 text-sm">
                      {app.kitchenName}
                    </div>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      {app.applicantName} • {app.experienceYears} yrs home cooking
                    </div>
                    <div className="text-stone-400 text-[10px] mt-0.5 italic">
                      Specialty: {app.specialty}
                    </div>
                  </td>

                  {/* Area */}
                  <td className="py-4 px-5">
                    <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-stone-700 font-bold text-[11px]">
                      📍 {app.area}
                    </span>
                    <span className="block text-[10px] text-stone-400 mt-1">
                      Target Cap: {app.dailyTargetCapacity} tiffins/day
                    </span>
                  </td>

                  {/* FSSAI & Hygiene Score */}
                  <td className="py-4 px-5">
                    <div className="font-bold text-stone-800 text-[11px]">
                      {app.fssaiNumber}
                    </div>
                    <div className="text-emerald-700 font-semibold text-[11px] mt-0.5 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{app.hygieneAuditScore}</span>
                    </div>
                  </td>

                  {/* Sample Tasting */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1 bg-amber-50 text-amber-900 font-bold px-2 py-0.5 rounded-lg w-max text-xs border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{app.sampleTastingRating} / 5.0</span>
                    </div>
                    <span className="text-[10px] text-stone-400 block mt-0.5">
                      By Pune Taster Panel
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5">
                    {getStatusBadge(app.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    {app.status === 'Pending' ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => updateCookApplicationStatus(app.id, 'Approved')}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => updateCookApplicationStatus(app.id, 'Rejected')}
                          className="px-3 py-1.5 bg-stone-100 hover:bg-rose-50 text-rose-600 rounded-xl font-bold text-xs transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-stone-400 font-medium">
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
