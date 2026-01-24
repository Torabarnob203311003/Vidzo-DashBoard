import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetApprovalBusinessQuery } from '@/services/apiService';

const ApprovalBusiness = () => {
  const { data: approvals, isLoading } = useGetApprovalBusinessQuery();

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Business Users</h2>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-96 focus:outline-none shadow-sm font-medium"
          />
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                {[
                  'ID',
                  'Business Name',
                  'User Name',
                  'Submitted',
                  'Tax ID/ Reg Number',
                  'Verification Documents',
                  'Action',
                ].map((header) => (
                  <th
                    key={header}
                    className="px-8 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    Loading...
                  </td>
                </tr>
              ) : (
                approvals?.map((app, i) => (
                  <tr
                    key={i}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-gray-500">
                      {app.id || '1223'}
                    </td>
                    <td className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {app.name}
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-500">
                      Chris Brad
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-500">
                      2024-01-15
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-500 uppercase">
                      TXN099145678
                    </td>
                    <td className="px-8 py-6">
                      <button className="px-6 py-2 bg-[#FFC12D] text-white rounded-lg text-xs font-black hover:bg-[#FFB800] transition-colors">
                        View
                      </button>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-black hover:bg-green-600 transition-colors">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-black hover:bg-red-600 transition-colors">
                          Decline
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600">
          <ChevronLeft size={18} /> Previous
        </button>

        {[1, 2, 3, '...', 8, 9, 10].map((p, i) => (
          <button
            key={i}
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center ${
              p === 1
                ? 'bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20'
                : 'text-gray-400'
            }`}
          >
            {p}
          </button>
        ))}

        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600">
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default ApprovalBusiness;
