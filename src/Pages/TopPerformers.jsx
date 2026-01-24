import React from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const TopPerformers = () => {
  const [activeTab, setActiveTab] = React.useState('streamers');

  const streamerHeaders = [
    'Rank', 'Streamer Name', 'Stream Title', 'Category', 
    'Peak Live Viewers', 'Gift Earned', 'Subscriber gained', 'Date'
  ];

  const marketplaceHeaders = [
    'Rank', 'Product Name', 'Business Name', 'Unit Price', 
    'Units Sold', 'Total Sales', 'Partner Creator', 
    'Creator Commission (%)', 'Item Status'
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Top Performers</h2>
      </div>

      {/* Tab Buttons */}
      <div className="flex items-center gap-4 mb-10 bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm">
        <button 
          onClick={() => setActiveTab('streamers')}
          className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
            activeTab === 'streamers'
              ? 'bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20'
              : 'text-gray-500 hover:text-[#FFC12D]'
          }`}
        >
          Streamers
        </button>
        <button 
          onClick={() => setActiveTab('marketplace')}
          className={`px-8 py-3 rounded-xl text-sm font-black transition-all ${
            activeTab === 'marketplace'
              ? 'bg-[#FFC12D] text-white shadow-lg shadow-yellow-400/20'
              : 'text-gray-500 hover:text-[#FFC12D]'
          }`}
        >
          Marketplace Sellers
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
        <div className="overflow-x-auto no-scrollbar">
          <Table className="min-w-[1200px]">
            <TableHeader className="bg-white border-b border-gray-50">
              <TableRow>
                {(activeTab === 'streamers' ? streamerHeaders : marketplaceHeaders).map(header => (
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
              {Array(10).fill(0).map((_, i) => (
                <TableRow key={i} className="hover:bg-gray-50/30 transition-colors">
                  <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">01</TableCell>

                  {activeTab === 'streamers' ? (
                    <>
                      <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">Mille Jacob</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">Let's do something productive today</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">Lifestyle</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">25,400</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">$5,689</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">26</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">27 Feb 2025</TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <img src="https://picsum.photos/40/40?seed=prod" className="w-10 h-10 rounded-lg object-cover" alt="" />
                          <span className="text-sm font-black text-[#1E293B]">Larson Cap</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">Pam Cola</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">$20</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">1,240</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">$24,800</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">Jim Larson</TableCell>
                      <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">5.5</TableCell>
                      <TableCell className="px-8 py-6">
                        <span className={`text-[11px] font-black uppercase ${i === 1 ? 'text-red-500' : 'text-green-500'}`}>
                          {i === 1 ? 'Out of Stock' : 'In Stock'}
                        </span>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
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
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center ${p === 1 ? 'bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20' : 'text-gray-400'}`}
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

export default TopPerformers;
