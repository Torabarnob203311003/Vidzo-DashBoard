import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Radio,
  Layers,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import Loader from "@/Components/shared/Loader";
import {
  useGetReportQuery,
  useUpdateReportMutation,
} from "@/redux/features/repoet/reportApi";
import { toast } from "sonner";

const ReportMonitoring = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("stream");
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // GET REPORTS
  const { data: reportsData, isLoading } = useGetReportQuery({
    params: { searchTerm },
    tab: activeTab,
  });

  // UPDATE REPORT STATUS
  const [updateReport, { isLoading: isUpdating }] = useUpdateReportMutation();

  const dashboard = reportsData?.data?.dashboard;
  const reports = reportsData?.data?.reports || [];

  if (isLoading) {
    return <Loader />;
  }

  const stats = [
    {
      label: "Live Stream Reports",
      value: dashboard?.cards?.liveStreamReports || 0,
    },
    {
      label: "Profile Reports",
      value: dashboard?.cards?.streamerFansReports || 0,
    },
    {
      label: "Post Report",
      value: dashboard?.cards?.momentsReport || 0,
    },
    {
      label: "Avg Resolution Time",
      value: dashboard?.cards?.avgResolutionTimeLabel || "0",
    },
  ];

  // VIEW MODAL
  const openViewModal = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  // UPDATE STATUS
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await updateReport({ id, data: { status } });

      if (res?.error) {
        return toast.error(
          res.error.data?.message || "Failed to update report",
        );
      }

      if (res?.data?.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">
          Report Monitoring
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">
              {s.label}
            </p>
            <p className="text-3xl font-black text-[#1E293B]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-[#FFF8E6] p-6 rounded-2xl border border-yellow-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-yellow-500 shadow-sm">
            {dashboard?.statusSummary?.pendingReports || 0}
          </div>
          <p className="text-sm font-black text-gray-700">Pending Reports</p>
        </div>

        <div className="bg-[#E6FBF2] p-6 rounded-2xl border border-green-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-green-500 shadow-sm">
            {dashboard?.statusSummary?.resolvedReports || 0}
          </div>
          <p className="text-sm font-black text-gray-700">Resolved Reports</p>
        </div>

        <div className="bg-[#E6F0FF] p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
            {dashboard?.statusSummary?.totalReports || 0}
          </div>
          <p className="text-sm font-black text-gray-700">Total Reports</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-10 bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm">
        <button
          onClick={() => setActiveTab("stream")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "stream"
              ? "bg-[#FFC12D] text-white shadow-lg"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <Radio size={16} /> Live Stream Reports
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "profile"
              ? "bg-[#FFC12D] text-white shadow-lg"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <User size={16} /> Profile Reports
        </button>

        <button
          onClick={() => setActiveTab("post")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === "post"
              ? "bg-[#FFC12D] text-white shadow-lg"
              : "text-gray-500 hover:bg-gray-50"
          }`}
        >
          <Layers size={16} /> Post Reports
        </button>
      </div>

      {/* Search */}
      <div className="mb-8 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          placeholder="Search..."
          className="pl-12 pr-6 py-3.5 bg-white border border-gray-100 rounded-2xl w-full max-w-sm focus:outline-none shadow-sm font-medium"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                {activeTab === "stream" &&
                  [
                    "Report ID",
                    "Stream Title",
                    "Streamer Name",
                    "Report Reason",
                    "Reported By",
                    "Date",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-7 text-[12px] font-black text-[#1E293B] uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}

                {activeTab === "profile" &&
                  [
                    "Report ID",
                    "User Name",
                    "Report Reason",
                    "Reported By",
                    "Date",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-7 text-[12px] font-black text-[#1E293B] uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}

                {activeTab === "post" &&
                  [
                    "Report ID",
                    "Post",
                    "Report Reason",
                    "Reported By",
                    "Date",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-7 text-[12px] font-black text-[#1E293B] uppercase whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50/30">
                  <td className="px-6 py-6 text-sm font-bold text-gray-500">
                    {report.reportCode}
                  </td>

                  {activeTab === "stream" && (
                    <>
                      <td className="px-6 py-6 text-sm font-black">
                        {report.streamTitle}
                      </td>
                      <td className="px-6 py-6 text-sm font-black">
                        {report.streamerName}
                      </td>
                    </>
                  )}

                  {activeTab === "profile" && (
                    <td className="px-6 py-6 text-sm font-black">
                      {report.profileName}
                    </td>
                  )}

                  {activeTab === "post" && (
                    <td className="px-6 py-6 text-sm font-black">
                      {report.target?.title || "Post"}
                    </td>
                  )}

                  <td className="px-6 py-6 text-sm font-bold">
                    {report.reportReason}
                  </td>

                  <td className="px-6 py-6 text-sm font-bold">
                    {report.reportedBy?.name}
                  </td>

                  <td className="px-6 py-6 text-sm font-bold">
                    {new Date(report.date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-6">
                    <span
                      className={`text-[11px] font-black uppercase ${
                        report.status === "pending"
                          ? "text-[#FFC12D]"
                          : report.status === "resolved"
                            ? "text-green-500"
                            : "text-red-500"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>

                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openViewModal(report)}
                        className="text-[#FFC12D]"
                      >
                        <Eye size={20} />
                      </button>

                      {report.status === "pending" && (
                        <>
                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(report.id, "resolved")
                            }
                            className="bg-green-500 text-white p-1 rounded-md flex items-center gap-1 px-3 text-[10px] font-black uppercase"
                          >
                            <CheckCircle size={14} /> Resolve
                          </button>

                          <button
                            disabled={isUpdating}
                            onClick={() =>
                              handleStatusUpdate(report.id, "dismissed")
                            }
                            className="bg-red-500 text-white p-1 rounded-md flex items-center gap-1 px-3 text-[10px] font-black uppercase"
                          >
                            <XCircle size={14} /> Dismiss
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {reports.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-400">
                    No Reports Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* VIEW MODAL */}
      {showViewModal && selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40">
          <div className="bg-white w-full max-w-lg rounded-[32px] p-8 relative">
            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-6 right-6"
            >
              <X size={28} />
            </button>

            <h3 className="text-2xl font-black mb-6">Report Details</h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-black">Report Code</p>
                <p className="text-gray-500">{selectedReport.reportCode}</p>
              </div>

              <div>
                <p className="font-black">Reason</p>
                <p className="text-gray-500">{selectedReport.reportReason}</p>
              </div>

              <div>
                <p className="font-black">Details</p>
                <p className="text-gray-500">
                  {selectedReport.details || "N/A"}
                </p>
              </div>

              <div>
                <p className="font-black">Reported By</p>
                <p className="text-gray-500">
                  {selectedReport.reportedBy?.name}
                </p>
              </div>

              <div>
                <p className="font-black">Status</p>
                <p className="text-gray-500">{selectedReport.status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportMonitoring;
