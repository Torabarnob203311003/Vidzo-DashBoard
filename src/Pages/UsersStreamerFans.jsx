import React from 'react';
import { Search, Eye, Ban, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGetStreamersQuery } from '../services/apiService';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const UsersStreamerFans = () => {
  const { data: streamers, isLoading } = useGetStreamersQuery();

  const headers = [
    'ID', 'Name', 'Location', 'Feather Level', 'Avg Viewers', 'Total Feather', 
    'Total Coins', 'Flagged', 'Followers', 'Following', 'Friends', 
    'Subscribers', 'Total Earnings', 'Last Stream', 'Action'
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Streamers & Fans</h2>
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
          <Table className="min-w-[1500px]">
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {headers.map((header) => (
                  <TableHead
                    key={header}
                    className="px-6 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={15} className="text-center py-20 text-gray-400 font-bold">
                    Loading streamers...
                  </TableCell>
                </TableRow>
              ) : (
                streamers?.map((streamer) => (
                  <TableRow key={streamer.id} className="hover:bg-gray-50/30 transition-colors">
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.id}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">{streamer.name}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.location}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 text-center">{streamer.featherLevel}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.avgViewers}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.totalFeather}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.totalCoins}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 text-center">{streamer.flagged}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.followers}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.following}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.friends}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">{streamer.subscribers}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">{streamer.totalEarnings}</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">{streamer.lastStream}</TableCell>
                    <TableCell className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <button className="text-red-500 hover:scale-110 transition-transform">
                          <Ban size={22} />
                        </button>
                        <button className="text-[#FFC12D] hover:scale-110 transition-transform">
                          <Eye size={22} />
                        </button>
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
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all">
          <ChevronLeft size={18} /> Previous
        </button>
        {[1, 2, 3, '...', 8, 9, 10].map((page, i) => (
          <button 
            key={i} 
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center transition-all ${
              page === 1 ? 'bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20' : 'text-gray-400 hover:bg-white hover:border hover:border-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600 hover:bg-gray-50 transition-all">
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default UsersStreamerFans;
