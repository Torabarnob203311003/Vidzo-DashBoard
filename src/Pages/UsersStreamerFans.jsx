/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Search, Eye, Ban, X, ChevronLeft, ChevronRight, Check } from "lucide-react";
import UserDetailsModal from "@/Components/UserDetailsModal";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import Loader from "@/Components/shared/Loader";
import { toast } from "sonner";
import { useBlockUserMutation, useGetUsersQuery, useUnblockUserMutation } from "@/redux/features/user/userApi";
import Pagination from "@/Components/shared/Pagination";

const UsersStreamerFans = () => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetUsersQuery({page, searchTerm});

  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

  const handleBlock = async (id) => {
    console.log(id)
    try {
      const res = await blockUser(id);
      if (res?.error) {
        return toast.error(res.error.data?.message || "Block User failed");
      }
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const handleUnblock = async (id) => {
    try {
      const res = await unblockUser(id);
      if (res?.error) {
        return toast.error(res.error.data?.message || "Unblock User failed");
      }
      if (res.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || isBlocking || isUnblocking) {
    return <Loader />;
  }
  const pagination = data?.data?.pagination;
  const headers = [
    "ID",
    "Name",
    "Location",
    "Feather Level",
    "Avg Viewers",
    "Total Feather",
    "Total Coins",
    "Flagged",
    "Followers",
    "Following",
    "Friends",
    "Subscribers",
    "Total Earnings",
    "Last Stream",
    "Action",
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      {/* Header & Search */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Streamers & Fans</h2>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
          onChange={(e) => setSearchTerm(e.target.value)}
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
                  <TableCell
                    colSpan={15}
                    className="text-center py-20 text-gray-400 font-bold"
                  >
                    Loading streamers...
                  </TableCell>
                </TableRow>
              ) : (
                data?.data?.rows?.map((streamer, i) => (
                  <TableRow
                    key={streamer.id}
                    className="hover:bg-gray-50/30 transition-colors"
                  >
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {i + 1}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">
                      {streamer.name}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.location}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 text-center">
                      {streamer.featherLevel}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.avgViewers}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.totalFeather}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.totalCoins}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 text-center">
                      {streamer.flagged}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.followers}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.following}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.friends}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500">
                      {streamer.subscribers}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-black text-[#1E293B]">
                      {streamer.totalEarnings}
                    </TableCell>
                    <TableCell className="px-6 py-6 text-sm font-bold text-gray-500 whitespace-nowrap">
                      {streamer.lastStream}
                    </TableCell>
                    <TableCell className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        {streamer.status === "blocked" && (
                          <button
                            onClick={() => handleUnblock(streamer.id)}
                            className="text-green-500 hover:scale-110 transition-transform"
                          >
                            <Check size={22} />
                          </button>
                        )}
                        {streamer.status !== "blocked" && (
                          <button
                            onClick={() => handleBlock(streamer.id)}
                            className="text-red-500 hover:scale-110 transition-transform"
                          >
                            <Ban size={22} />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedUserId(streamer.id);
                            setShowDetailsModal(true);
                          }}
                          className="text-[#FFC12D] hover:scale-110 transition-transform"
                        >
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
      <Pagination
        totalPages={pagination?.pages || 1}
        page={page}
        setPage={setPage}
      />

      {/* Details Modal */}
      {showDetailsModal && selectedUserId && (
        <UserDetailsModal
          id={selectedUserId}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
    </div>
  );
};

export default UsersStreamerFans;
