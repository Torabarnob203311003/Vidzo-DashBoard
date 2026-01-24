import {
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle,
  XCircle,
  Radio,
  Users,
  Building2,
  Layers,
} from "lucide-react";
import { useState } from "react";

const ReportMonitoring = () => {
  const [activeTab, setActiveTab] = useState("live");

  const stats = [
    { label: "Live Stream Reports", value: "123" },
    { label: "Streamer/Fans Reports", value: "432" },
    { label: "Business User Reports", value: "345" },
    { label: "Moments Report", value: "341" },
    { label: "Avg Resolution Time", value: "18 hrs" },
  ];

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">
          Report Monitoring
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-6 mb-10">
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

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-[#FFF8E6] p-6 rounded-2xl border border-yellow-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-yellow-500 shadow-sm">
            6
          </div>
          <p className="text-sm font-black text-gray-700">Pending Reports</p>
        </div>
        <div className="bg-[#E6FBF2] p-6 rounded-2xl border border-green-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-green-500 shadow-sm">
            2
          </div>
          <p className="text-sm font-black text-gray-700">Resolved Reports</p>
        </div>
        <div className="bg-[#E6F0FF] p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-500 shadow-sm">
            13
          </div>
          <p className="text-sm font-black text-gray-700">Total Reports</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-10 bg-white p-2 rounded-2xl border border-gray-100 w-fit shadow-sm">
        <button
          onClick={() => setActiveTab("live")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === "live" ? "bg-[#FFC12D] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Radio size={16} /> Live Stream Reports
        </button>
        <button
          onClick={() => setActiveTab("streamer")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === "streamer" ? "bg-[#FFC12D] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Users size={16} /> Streamer/Fans Reports
        </button>
        <button
          onClick={() => setActiveTab("business")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === "business" ? "bg-[#FFC12D] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Building2 size={16} /> Business Users Reports
        </button>
        <button
          onClick={() => setActiveTab("moments")}
          className={`px-6 py-3 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === "moments" ? "bg-[#FFC12D] text-white shadow-lg" : "text-gray-500 hover:bg-gray-50"}`}
        >
          <Layers size={16} /> Moments Reports
        </button>
      </div>

      <div className="mb-8 relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
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
                {activeTab === "live" &&
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
                {activeTab === "streamer" &&
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
                {activeTab === "business" &&
                  [
                    "Report ID",
                    "Business Name",
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
                {activeTab === "moments" &&
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
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-6 py-6 text-sm font-bold text-gray-500">
                      1223
                    </td>
                    {activeTab === "live" && (
                      <>
                        <td className="px-6 py-6 text-sm font-black text-[#1E293B]">
                          Friday Night FPS
                        </td>
                        <td className="px-6 py-6 text-sm font-black text-[#1E293B]">
                          JohnDoeGaming
                        </td>
                      </>
                    )}
                    {activeTab === "streamer" && (
                      <td className="px-6 py-6 text-sm font-black text-[#1E293B]">
                        Ellie Knight
                      </td>
                    )}
                    {activeTab === "business" && (
                      <td className="px-6 py-6 text-sm font-black text-[#1E293B]">
                        Urban Clothing
                      </td>
                    )}
                    {activeTab === "moments" && (
                      <td className="px-6 py-6 text-sm font-black text-[#1E293B]">
                        Behind the scenes.......
                      </td>
                    )}

                    <td className="px-6 py-6 text-sm font-bold text-gray-500">
                      {activeTab === "business" || activeTab === "moments"
                        ? "Counterfeit Item"
                        : "Inappropriate Content"}
                    </td>
                    <td className="px-6 py-6 text-sm font-bold text-gray-500">
                      Bobby Miles
                    </td>
                    <td className="px-6 py-6 text-sm font-bold text-gray-500">
                      Sep 25, 2025
                    </td>
                    <td className="px-6 py-6">
                      <span
                        className={`text-[11px] font-black uppercase ${i % 3 === 0 ? "text-[#FFC12D]" : i % 3 === 1 ? "text-green-500" : "text-red-500"}`}
                      >
                        {i % 3 === 0
                          ? "Pending"
                          : i % 3 === 1
                            ? "Resolved"
                            : "Dismissed"}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-3">
                        <button className="text-[#FFC12D]">
                          <Eye size={20} />
                        </button>
                        <button className="bg-green-500 text-white p-1 rounded-md flex items-center justify-center gap-1 px-3 text-[10px] font-black uppercase">
                          <CheckCircle size={14} /> Resolve
                        </button>
                        <button className="bg-red-500 text-white p-1 rounded-md flex items-center justify-center gap-1 px-3 text-[10px] font-black uppercase">
                          <XCircle size={14} /> Dismiss
                        </button>
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

export default ReportMonitoring;
