import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Users, DollarSign, Award, Activity } from 'lucide-react';

const Dashboard = () => {
  // User Overview Data (Area Chart)
  const userOverviewData = [
    { month: 'JAN', value: 4000 },
    { month: 'FEB', value: 6000 },
    { month: 'MAR', value: 5500 },
    { month: 'APR', value: 7000 },
    { month: 'MAY', value: 6500 },
    { month: 'JUN', value: 5000 },
    { month: 'JUL', value: 4500 },
    { month: 'AUG', value: 5500 },
    { month: 'SEP', value: 4800 },
    { month: 'OCT', value: 5200 },
    { month: 'NOV', value: 4500 },
    { month: 'DEC', value: 5000 }
  ];

  // Earning Overview Data (Bar Chart)
  const earningData = [
    { month: 'JAN', value: 2000 },
    { month: 'FEB', value: 2500 },
    { month: 'MAR', value: 3000 },
    { month: 'APR', value: 3500 },
    { month: 'MAY', value: 4500 },
    { month: 'JUN', value: 2800 },
    { month: 'JUL', value: 3200 },
    { month: 'AUG', value: 4800 },
    { month: 'SEP', value: 3500 },
    { month: 'OCT', value: 4200 },
    { month: 'NOV', value: 5200 },
    { month: 'DEC', value: 5500 }
  ];

  // Daily Activity Pattern Data
  const activityData = [
    { time: '0:00', streaming: 4000, users: 2000 },
    { time: '3:00', streaming: 4200, users: 2200 },
    { time: '6:00', streaming: 4100, users: 2100 },
    { time: '9:00', streaming: 4500, users: 2400 },
    { time: '12:00', streaming: 4700, users: 2600 },
    { time: '15:00', streaming: 4600, users: 2500 },
    { time: '18:00', streaming: 4800, users: 2700 },
    { time: '21:00', streaming: 4900, users: 2800 },
    { time: '0:00', streaming: 4700, users: 2600 }
  ];

  // Geographic Distribution Data
  const geoData = [
    { name: 'North America', value: 38, color: '#FCD34D' },
    { name: 'Europe', value: 28, color: '#A78BFA' },
    { name: 'Asia', value: 22, color: '#60A5FA' },
    { name: 'South America', value: 10, color: '#FB923C' },
    { name: 'Others', value: 2, color: '#34D399' }
  ];

  const StatCard = ({ icon: Icon, title, value, change, bgColor, iconColor }) => (
    <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-2 rounded-lg ${bgColor}`}>
              <Icon className={`w-4 h-4 md:w-5 md:h-5 ${iconColor}`} />
            </div>
            <span className="text-xs md:text-sm text-gray-500">{title}</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">{change}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-3 md:p-6 lg:p-8">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Hello Austin</h1>
            <span className="text-2xl">👋</span>
          </div>
          <p className="text-sm md:text-base text-gray-600">Welcome back! Here's what's happening on your platform.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-6 md:mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value="12,547"
            change="+12 increased users"
            bgColor="bg-blue-50"
            iconColor="text-blue-500"
          />
          <StatCard
            icon={TrendingUp}
            title="Streams & Posts"
            value="12,547"
            change="+15 increased posts"
            bgColor="bg-purple-50"
            iconColor="text-purple-500"
          />
          <StatCard
            icon={Activity}
            title="Engagement Users"
            value="12,547"
            change="+30 total users"
            bgColor="bg-yellow-50"
            iconColor="text-yellow-500"
          />
          <StatCard
            icon={DollarSign}
            title="Platform Earnings"
            value="$12,547"
            change="+15 Reachus monthly"
            bgColor="bg-green-50"
            iconColor="text-green-500"
          />
          <StatCard
            icon={Award}
            title="Live Now"
            value="123"
            change="Total +24 Chimes"
            bgColor="bg-red-50"
            iconColor="text-red-500"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* User Overview */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">User Overview</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                Month +23
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={userOverviewData}>
                <defs>
                  <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FCD34D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FCD34D" 
                  strokeWidth={2}
                  fill="url(#colorUser)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Earning Overview */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Earning Overview</h3>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                Month +33
              </span>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={earningData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="value" fill="#FCD34D" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Daily Activity Pattern */}
          <div className="lg:col-span-2 bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Daily Activity Pattern</h3>
              <p className="text-xs md:text-sm text-gray-500">User activity and streams throughout the day</p>
            </div>
            <div className="flex items-center gap-4 md:gap-6 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <span className="text-xs md:text-sm text-gray-600">Streaming</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <span className="text-xs md:text-sm text-gray-600">Users</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="streaming" stroke="#FCD34D" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="users" stroke="#1f2937" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Geographic Distribution */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm">
            <div className="mb-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Geographic Distribution</h3>
              <p className="text-xs md:text-sm text-gray-500">Users by region</p>
            </div>
            <div className="flex flex-col items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={geoData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {geoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-full mt-4 space-y-2">
                {geoData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-gray-700">{item.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;