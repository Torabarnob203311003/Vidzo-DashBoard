import { Search } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Pagination from "@/Components/shared/Pagination";
import { useState } from "react";
import Loader from "@/Components/shared/Loader";
import { useGetTopPerformersQuery } from "@/redux/features/topPerformers/topPerformersApi";


const TopPerformers = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // API CALL
  const { data: performersData, isLoading } = useGetTopPerformersQuery({
    page,
   searchTerm
  });

  const rows = performersData?.data?.rows || [];
  const pagination = performersData?.data?.pagination;

  const headers = [
    "Rank",
    "Streamer Name",
    "Stream Title",
    "Category",
    "Peak Live Viewers",
    "Gift Earned",
    "Subscriber gained",
    "Date",
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">
          Top Performers
        </h2>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
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
              {rows.map((item) => (
                <TableRow
                  key={item.streamId}
                  className="hover:bg-gray-50/30 transition-colors"
                >
                  <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                    {item.rank}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                    {item.streamerName}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">
                    {item.streamTitle}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                    {item.category}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                    {item.peakLiveViewers}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-black text-[#1E293B]">
                    ${item.giftEarned}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                    {item.subscriberGained}
                  </TableCell>

                  <TableCell className="px-8 py-6 text-sm font-bold text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-gray-400 font-bold"
                  >
                    No Data Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalPages={pagination?.totalPages || 1}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default TopPerformers;
