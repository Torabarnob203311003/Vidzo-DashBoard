/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { Users, DollarSign, Radio, ChevronDown } from "lucide-react";

import Loader from "@/Components/shared/Loader";
import { useGetDashboardQuery } from "@/redux/services/API";
import { YearPicker } from "@/Components/shared/YearPicker";
import { toast } from "sonner";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import { useDispatch } from "react-redux";
import { storProfile } from "@/redux/features/auth/authSlice";

const StatsCard = ({ title, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start">
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">
        {title}
      </span>
      <span className="text-3xl font-black text-[#1E293B] my-1">{value}</span>
      <span className="text-[10px] font-bold text-green-500">
        <span className="mr-1">{trend}</span>
        <span className="text-gray-400">from last month</span>
      </span>
    </div>
    <div className="text-[#FFC12D]">
      {React.cloneElement(icon, { size: 24 })}
    </div>
  </div>
);

const DashboardOverview = () => {
  const [year, setYear] = useState(undefined);
  const dispatch = useDispatch();
  const { data: stats, isLoading } = useGetDashboardQuery({ year });
  const { data: profileData, isLoading: isProfileLoading } =
    useGetProfileQuery(undefined);
  useEffect(() => {
    if (profileData?.data) {
      dispatch(
        storProfile({
          name: profileData.data.name,
          email: profileData.data.email,
          image: profileData.data.image,
          role: profileData.data.role,
        }),
      );
    }
  }, [profileData]);
  if (isLoading || isProfileLoading) {
    return <Loader />;
  }
  console.log(profileData);
  const cards = stats?.data?.cards;
  const charts = stats?.data?.charts;

  const UserOverviewData =
    charts?.userOverview?.labels?.map((label, index) => ({
      name: label,
      value: charts?.userOverview?.series?.[0]?.data?.[index] || 0,
    })) || [];

  const EarningOverviewData =
    charts?.earningOverview?.labels?.map((label, index) => ({
      name: label,
      value: charts?.earningOverview?.series?.[0]?.data?.[index] || 0,
    })) || [];

  const DailyActivityData =
    charts?.dailyActivityPattern?.labels?.map((label, index) => ({
      time: label,
      streams: charts?.dailyActivityPattern?.series?.[0]?.data?.[index] || 0,
      users: charts?.dailyActivityPattern?.series?.[1]?.data?.[index] || 0,
    })) || [];
  console.log(charts);
  const PieData =
    charts?.geographicDistribution?.items?.map((item, index) => ({
      name: item.region,
      value: item.percentage,
      color: ["#A78BFA", "#6EE7B7", "#FCD34D", "#FB923C", "#93C5FD"][index],
    })) || [];

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Hello Austin</h2>
        <p className="text-gray-500 font-bold text-[15px] mt-1">
          Welcome back! Here's what's happening on your platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatsCard
          title="Total Users"
          value={cards?.totalUsers?.displayValue || "0"}
          trend={cards?.totalUsers?.growthLabel || ""}
          icon={<Users />}
        />
        <StatsCard
          title="Active Users"
          value={cards?.regularUsers?.displayValue || "0"}
          trend={cards?.regularUsers?.growthLabel || ""}
          icon={<Users />}
        />

        <StatsCard
          title="Platform Earnings"
          value={cards?.platformEarnings?.displayValue || "$0"}
          trend={cards?.platformEarnings?.growthLabel || ""}
          icon={<DollarSign />}
        />
        <StatsCard
          title="Live Now"
          value={cards?.liveNow?.displayValue || "0"}
          trend={cards?.liveNow?.subtitle || ""}
          icon={<Radio />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-[#1E293B]">User Overview</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UserOverviewData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC12D" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#FFC12D" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#FFC12D"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-[#1E293B]">
              Earning Overview
            </h3>
            <div className="flex items-center gap-2 px-4 py-2  text-[#FFC12D] rounded-xl text-xs font-black cursor-pointer">
              <YearPicker year={year} setYear={setYear} />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EarningOverviewData}>
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar
                  dataKey="value"
                  fill="#FFC12D"
                  radius={[8, 8, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#1E293B] mb-1">
            Daily Activity Pattern
          </h3>
          <p className="text-sm font-bold text-gray-400 mb-12">
            User activity and streams throughout the day
          </p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={DailyActivityData}>
                <CartesianGrid
                  strokeDasharray="0"
                  vertical={false}
                  stroke="#F1F5F9"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                  dy={15}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1E293B", fontSize: 11, fontWeight: "700" }}
                />
                <Tooltip />
                <Legend
                  align="right"
                  verticalAlign="top"
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: 40 }}
                />
                <Line
                  type="monotone"
                  dataKey="streams"
                  stroke="#FFC12D"
                  strokeWidth={4}
                  dot={false}
                  name="Streams"
                />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#1E293B"
                  strokeWidth={4}
                  dot={false}
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#1E293B] mb-1">
            Geographic Distribution
          </h3>
          <p className="text-sm font-bold text-gray-400 mb-12">
            Users by region
          </p>
          <div className="flex flex-col items-center">
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PieData}
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={0}
                    dataKey="value"
                  >
                    {PieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-full mt-10 space-y-4">
              {PieData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-bold text-gray-600">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-sm font-black text-[#1E293B]">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
