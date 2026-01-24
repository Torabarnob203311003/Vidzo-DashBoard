/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetFeedbackQuery } from '../services/apiService';
import { Search, Star, Eye } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const Feedback = () => {
  const { data: feedback, isLoading } = useGetFeedbackQuery();

  const headers = ['ID', 'Name', 'Feedback', 'Rating', 'Action'];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Feedback</h2>
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

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full no-scrollbar">
          <Table className="min-w-[800px]">
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {headers.map((h) => (
                  <TableHead
                    key={h}
                    className="px-10 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20 text-gray-400 font-bold">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                Array(10).fill(0).map((_, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/30 transition-colors">
                    <TableCell className="px-10 py-6 text-sm font-bold text-gray-500">01</TableCell>
                    <TableCell className="px-10 py-6 text-sm font-black text-[#1E293B]">Lisa Johnson</TableCell>
                    <TableCell className="px-10 py-6 text-sm font-bold text-gray-500 max-w-sm truncate">
                      This App....
                    </TableCell>
                    <TableCell className="px-10 py-6">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} size={16} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="px-10 py-6 text-[#FFC12D]">
                      <button><Eye size={20} /></button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
