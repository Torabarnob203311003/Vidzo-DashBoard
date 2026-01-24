/* eslint-disable no-unused-vars */
import React from 'react';
import { 
  AreaChart, Area, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, LineChart, Line, Legend 
} from 'recharts';
import { Users, DollarSign, Radio, ChevronDown } from 'lucide-react';
import { useGetDashboardStatsQuery } from '../services/apiService';

const StatsCard = ({ title, value, trend, icon }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 flex justify-between items-start">
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider">{title}</span>
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

const UserOverviewData = [
  { name: 'JAN', value: 5000 },
  { name: 'FEB', value: 7000 },
  { name: 'MAR', value: 5500 },
  { name: 'APR', value: 6500 },
  { name: 'MAY', value: 8500 },
  { name: 'JUN', value: 7000 },
  { name: 'JUL', value: 6000 },
  { name: 'AUG', value: 5500 },
  { name: 'SEP', value: 6000 },
  { name: 'OCT', value: 5000 },
  { name: 'NOV', value: 7500 },
  { name: 'DEC', value: 8000 },
];

const EarningOverviewData = [
  { name: 'JAN', value: 2000 },
  { name: 'FEB', value: 2500 },
  { name: 'MAR', value: 4200 },
  { name: 'APR', value: 4500 },
  { name: 'MAY', value: 2800 },
  { name: 'JUN', value: 5000 },
  { name: 'JUL', value: 3000 },
  { name: 'AUG', value: 4200 },
  { name: 'SEP', value: 4300 },
  { name: 'OCT', value: 4100 },
  { name: 'NOV', value: 2500 },
  { name: 'DEC', value: 4500 },
];

const PieData = [
  { name: 'North America', value: 35, color: '#A78BFA' },
  { name: 'Europe', value: 28, color: '#6EE7B7' },
  { name: 'Asia Pacific', value: 22, color: '#FCD34D' },
  { name: 'South America', value: 10, color: '#FB923C' },
  { name: 'Others', value: 5, color: '#93C5FD' },
];

const DashboardOverview = () => {
  const { data: stats } = useGetDashboardStatsQuery();

  return (
    <div className="p-10 bg-[#F8FAFC]">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-[#1E293B]">Hello Austin 🌞</h2>
        <p className="text-gray-500 font-bold text-[15px] mt-1">Welcome back! Here's what's happening on your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatsCard title="Total Users" value="12,547" trend="+12" icon={<Users />} />
        <StatsCard title="Regular Users" value="12,547" trend="+12" icon={<Users />} />
        <StatsCard title="Business Users" value="12,547" trend="+12" icon={<Users />} />
        <StatsCard title="Platform Earnings" value="$12,547" trend="+12%" icon={<DollarSign />} />
        <StatsCard title="Live Now" value="123" trend="Peak 240 Today" icon={<Radio />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-[#1E293B]">User Overview</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FFC12D]/10 text-[#FFC12D] rounded-xl text-xs font-black cursor-pointer">
              Regular <ChevronDown size={14} />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UserOverviewData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFC12D" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#FFC12D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#FFC12D" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-12">
            <h3 className="text-xl font-black text-[#1E293B]">Earning Overview</h3>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#FFC12D]/10 text-[#FFC12D] rounded-xl text-xs font-black cursor-pointer">
              2025 <ChevronDown size={14} />
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={EarningOverviewData}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#FFC12D" radius={[8, 8, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#1E293B] mb-1">Daily Activity Pattern</h3>
          <p className="text-sm font-bold text-gray-400 mb-12">User activity and streams throughout the day</p>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                {time: '0:00', streams: 6000, users: 3800},
                {time: '3:00', streams: 6500, users: 4200},
                {time: '6:00', streams: 6300, users: 3900},
                {time: '9:00', streams: 6800, users: 4400},
                {time: '12:00', streams: 7000, users: 4600},
                {time: '15:00', streams: 7200, users: 4300},
                {time: '18:00', streams: 7000, users: 4800},
                {time: '21:00', streams: 7500, users: 5100},
                {time: '24:00', streams: 7300, users: 4900},
                {time: '3:00', streams: 7400, users: 5500},
                {time: '6:00', streams: 7600, users: 5800},
                {time: '9:00', streams: 8000, users: 6200},
              ]}>
                <CartesianGrid strokeDasharray="0" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#1E293B', fontSize: 11, fontWeight: '700'}} />
                <Tooltip />
                <Legend align="right" verticalAlign="top" iconType="circle" wrapperStyle={{paddingBottom: 40}} />
                <Line type="monotone" dataKey="streams" stroke="#FFC12D" strokeWidth={4} dot={false} name="Streams" />
                <Line type="monotone" dataKey="users" stroke="#1E293B" strokeWidth={4} dot={false} name="Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
          <h3 className="text-xl font-black text-[#1E293B] mb-1">Geographic Distribution</h3>
          <p className="text-sm font-bold text-gray-400 mb-12">Users by region</p>
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
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-10 space-y-4">
              {PieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: item.color}} />
                    <span className="text-sm font-bold text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-[#1E293B]">{item.value}%</span>
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
