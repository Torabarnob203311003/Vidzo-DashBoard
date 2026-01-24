/* eslint-disable no-unused-vars */
import React from "react";
import { useGetBusinessUsersQuery } from "../services/apiService";
import { Search, ChevronLeft, ChevronRight, Ban, Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BusinessUsers = () => {
  const { data: businesses, isLoading } = useGetBusinessUsersQuery();

  const headers = [
    "ID",
    "Name",
    "Business name",
    "Total Earnings",
    "Total Product Sold",
    "Subscription Plan",
    "Top Sold Product",
    "Active Product",
    "Total Partner Creators",
    "Avg Review",
    "Flagged",
    "Action",
  ];

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

      <div className=" bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
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
                  <TableCell
                    colSpan={12}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    Loading...
                  </TableCell>
                </TableRow>
              ) : (
                Array(10)
                  .fill(0)
                  .map((_, i) => (
                    <TableRow
                      key={i}
                      className="hover:bg-gray-50/30 transition-colors"
                    >
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        1223
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">
                        Mille Jacob
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        Pam Cola
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">
                        $22,407
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        25
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">
                        Business Basic
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">
                        Premium Hoodie
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        20
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        12
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        4.9
                      </TableCell>
                      <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                        0
                      </TableCell>
                      <TableCell className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <button className="text-red-500">
                            <Ban size={22} />
                          </button>
                          <button className="text-[#FFC12D]">
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
        {[1, 2, 3, "...", 8, 9, 10].map((page, i) => (
          <button
            key={i}
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center transition-all ${
              page === 1
                ? "bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20"
                : "text-gray-400"
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

export default BusinessUsers;
