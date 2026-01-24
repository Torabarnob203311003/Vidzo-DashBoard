/* eslint-disable no-unused-vars */
import React from 'react';
import { Plus, Eye, Trash2, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useGetChallengesQuery } from '../services/apiService';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const Challenges = () => {
  const { data: challenges, isLoading } = useGetChallengesQuery();

  const headers = [
    'ID',
    'Title',
    'Reward',
    'Challenge Level',
    'Participants',
    'Completion %',
    'Status',
    'Action',
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Challenges</h2>
        <button className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all">
          <Plus size={22} /> Add New Challenges
        </button>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-full max-w-sm focus:outline-none shadow-sm font-medium"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto w-full no-scrollbar">
          <Table className="min-w-[1000px]"> {/* Ensure table scroll */}
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {headers.map((h) => (
                  <TableHead
                    key={h}
                    className="px-8 py-7 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
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
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">01</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">Gift Giver</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">50 Feather</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">Rare</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">1,200</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">68%</TableCell>
                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">Active</TableCell>
                    <TableCell className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <button className="text-[#FFC12D]"><Eye size={20} /></button>
                        <button className="text-red-500"><Trash2 size={20} /></button>
                      </div>
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

export default Challenges;
