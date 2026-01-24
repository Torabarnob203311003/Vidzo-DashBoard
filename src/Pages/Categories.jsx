/* eslint-disable no-unused-vars */
import React from 'react';
import { useGetCategoriesQuery } from '../services/apiService';
import { Search, ChevronLeft, ChevronRight, Plus, Edit2, Trash2 } from 'lucide-react';

const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Categories</h2>
        <button className="flex items-center gap-2 px-8 py-3.5 bg-[#FFC12D] text-white rounded-xl font-black shadow-xl shadow-yellow-400/20 hover:bg-[#FFB800] transition-all">
          <Plus size={22} /> Add New Category
        </button>
      </div>

      <div className="mb-8 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search..." 
          className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-full max-w-sm focus:outline-none shadow-sm font-medium"
        />
      </div>

      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                {['ID', 'Category Image', 'Category Title', 'Action'].map(h => (
                  <th key={h} className="px-10 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {categories?.map((cat, i) => (
                <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-10 py-6 text-sm font-bold text-gray-500">0001</td>
                  <td className="px-10 py-6">
                    <img src={`https://picsum.photos/120/80?seed=cat${i}`} className="w-28 h-16 rounded-xl object-cover" alt="" />
                  </td>
                  <td className="px-10 py-6 text-sm font-black text-[#1E293B]">{cat.name}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <button className="text-gray-800"><Edit2 size={20} /></button>
                      <button className="text-red-500"><Trash2 size={20} /></button>
                    </div>
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

export default Categories;
