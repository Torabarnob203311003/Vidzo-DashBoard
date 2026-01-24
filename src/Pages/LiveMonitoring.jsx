import React from "react";
import { Search, Eye, User, TrendingUp, Play } from "lucide-react";

import { useGetLiveStreamsQuery } from "../services/apiService";

import { Link } from "react-router-dom";

const MonitoringCard = ({ title, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-2">
    <div className="flex justify-between items-center">
      <span className="text-xs font-bold text-gray-500">{title}</span>
      <div className="text-gray-400">{icon}</div>
    </div>
    <span className="text-2xl font-bold text-gray-900">{value}</span>
    {trend && (
      <span className="text-[10px] font-medium text-gray-400">{trend}</span>
    )}
  </div>
);

const LiveMonitoring = () => {
  const { data: streams, isLoading } = useGetLiveStreamsQuery();

  return (
    <div className="p-10">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-8">
          Live Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MonitoringCard
            title="Currently Live"
            value="1,247"
            trend="Across all categories"
            icon={<Play size={16} className="text-red-500" />}
          />
          <MonitoringCard
            title="Total Viewers"
            value="342,891"
            trend="+12% from yesterday"
            icon={<User size={16} />}
          />
          <MonitoringCard
            title="Peak Concurrent"
            value="89,234"
            trend="At 8:00 PM today"
            icon={<TrendingUp size={16} />}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-[#1E293B]">
          Real-time overview of active streams
        </h3>
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by user name..."
            className="pl-12 pr-6 py-3 border border-gray-100 rounded-xl w-80 focus:outline-none focus:ring-2 focus:ring-yellow-400/20"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-50">
                {[
                  "ID",
                  "Name",
                  "Title",
                  "Category",
                  "Current Viewers",
                  "Peak Views",
                  "Flagged",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-6 text-[11px] font-bold text-gray-900 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="text-center py-20 text-gray-400">
                    Loading active streams...
                  </td>
                </tr>
              ) : (
                streams?.map((stream) => (
                  <tr
                    key={stream.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {stream.id}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {stream.name}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-500 max-w-xs truncate">
                      {stream.title}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {stream.category}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800">
                      {stream.currentViewers.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-gray-500">
                      {stream.peakViews.toLocaleString()}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800 text-center">
                      {stream.flagged}
                    </td>
                    <td className="px-6 py-5">
                      <Link
                        to={`/dashboard/live-stream/${stream.id}`}
                        className="p-1.5 text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors"
                      >
                        <Eye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
