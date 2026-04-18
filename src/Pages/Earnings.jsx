/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/Components/shared/Pagination";
import { useForm } from "react-hook-form";
import { useGetEarningsQuery } from "@/redux/features/earnings/earningsApi";
import Loader from "@/Components/shared/Loader";

const Earnings = () => {
  const [page, setPage] = useState(1);

  const { data: earnings, isLoading } = useGetEarningsQuery({ page });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const headers = [
    "ID",
    "Source Type",
    "User Name/Business Name",
    "Total Value",
    "Commission Percentage (%)",
    "Admin Share",
    "Notes",
    "Date",
  ];

  const onSubmit = (data) => {
    console.log("Search:", data);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Earnings</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            {...register("search")}
            type="text"
            placeholder="Search..."
            className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-96 focus:outline-none shadow-sm font-medium"
          />
        </form>
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
                    className="px-8 py-8 text-[12px] font-black text-[#1E293B] uppercase tracking-wide whitespace-nowrap"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {earnings?.data?.rows?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    No Earnings Found
                  </TableCell>
                </TableRow>
              ) : (
                earnings?.data?.rows?.map((item, i) => (
                  <TableRow
                    key={item?.id || i}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                      {item?.id}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {item?.sourceType}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {item?.userName || item?.businessName}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {item?.totalValue}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                      {item?.commissionPercentage}%
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                      {item?.adminShare}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500 max-w-xs">
                      {item?.notes}
                    </TableCell>

                    <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                      {item?.date}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={earnings?.data?.pagination?.totalPages || 1}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Earnings;
