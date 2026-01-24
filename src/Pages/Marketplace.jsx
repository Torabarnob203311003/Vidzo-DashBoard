/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetMarketplaceItemsQuery } from '../services/apiService';
import { Search, ChevronLeft, ChevronRight, Eye, Trash2 } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const Marketplace = () => {
  const { data: items, isLoading } = useGetMarketplaceItemsQuery();

  const headers = [
    'Rank',
    'Product Name',
    'Business Name',
    'Unit Price',
    'Units Sold',
    'Total Sales',
    'Partner Creator',
    'Creator Commission (%)',
    'Item Status',
    'Action',
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Marketplace</h2>
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
          <Table className="min-w-[1200px]">
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
                  <TableCell colSpan={10} className="text-center py-20 text-gray-400 font-bold">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                Array(10).fill(0).map((_, i) => (
                  <TableRow key={i} className="hover:bg-gray-50/30 transition-colors">
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">01</TableCell>
                    <TableCell className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://picsum.photos/40/40?seed=prod${i}`}
                          className="w-10 h-10 rounded-lg object-cover"
                          alt="Product"
                        />
                        <span className="text-sm font-black text-[#1E293B]">Larson Cap</span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">Pam Cola</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">$20</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">1,240</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">$24,800</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">Jim Larson</TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">5.5</TableCell>
                    <TableCell className="px-6 py-6">
                      <span
                        className={`text-[11px] font-black uppercase ${
                          i === 1 ? 'text-red-500' : 'text-green-500'
                        }`}
                      >
                        {i === 1 ? 'Out of Stock' : 'In Stock'}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-6">
                      <div className="flex items-center gap-3">
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
    </div>
  );
};

export default Marketplace;
