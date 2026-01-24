/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetEarningsQuery } from '../services/apiService';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const Earnings = () => {
  const { data: earnings, isLoading } = useGetEarningsQuery();

  const headers = [
    'ID',
    'Source Type',
    'User Name/Business Name',
    'Total Value',
    'Commission Percentage (%)',
    'Admin Share',
    'Notes',
    'Date',
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Earnings</h2>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
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
          <Table className="min-w-[1200px]"> {/* Ensures horizontal scroll */}
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {headers.map((header) => (
                  <TableHead
                    key={header}
                    className="px-8 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-20 text-gray-400 font-bold">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                Array(10).fill(0).map((_, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/30 transition-colors">
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">1223</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {i % 2 === 0 ? 'Streamer' : 'Business User'}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {i % 2 === 0 ? 'Alex McMahon' : 'Pam Cola'}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {i % 2 === 0 ? '$12,500' : '$50,000'}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                      {i % 2 === 0 ? '33%' : '5%'}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {i % 2 === 0 ? '$4,125 (33%)' : '$2,500 (5%)'}
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500 max-w-xs">
                      Admin's cut from all streamer earnings
                    </TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                      Sep 27, 2025
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex items-center justify-end gap-3">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600">
          <ChevronLeft size={18} /> Previous
        </button>
        {[1, 2, 3, '...', 8, 9, 10].map((p, i) => (
          <button 
            key={i} 
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center ${
              p === 1 ? 'bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20' : 'text-gray-400'
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

export default Earnings;
