import React, { useState } from 'react';
import { Search, Eye, CheckCircle, Clock, AlertTriangle, Users, FileText, Briefcase, Calendar, XCircle } from 'lucide-react';

const ReportMonitoring = () => {
  const [activeTab, setActiveTab] = useState('liveStream');
  const [searchTerm, setSearchTerm] = useState('');

  // Stats Cards Data
  const statsCards = [
    { title: 'Live Stream Reports', value: '123', icon: FileText },
    { title: 'Streamer/Fans Reports', value: '432', icon: Users },
    { title: 'Business User Reports', value: '345', icon: Briefcase },
    { title: 'Moments Report', value: '341', icon: Calendar },
    { title: 'Avg Resolution Time', value: '18 hrs', icon: Clock },
  ];

  // Alert Cards Data
  const alertCards = [
    { count: 6, label: 'Pending Reports', color: 'yellow', bgColor: 'bg-yellow-50', icon: AlertTriangle, iconColor: 'text-yellow-600' },
    { count: 2, label: 'Resolved Reports', color: 'green', bgColor: 'bg-green-50', icon: CheckCircle, iconColor: 'text-green-600' },
    { count: 13, label: 'Total Reports', color: 'purple', bgColor: 'bg-purple-50', icon: FileText, iconColor: 'text-purple-600' },
  ];

  // Table Data
  const tableData = [
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Pending' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Resolved' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Pending' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Resolved' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Dismissed' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Resolved' },
    { reportId: '1223', streamTitle: 'Friday Night FPS', streamerName: 'JohnDoeGaming', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Resolved' },
  ];

  // Streamer/Fans Reports Data
  const streamerFansData = [
    { reportId: '1223', userName: 'Etna Knight', reportReason: 'Inappropriate Content', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Pending' },
    { reportId: '1224', userName: 'Etna Knight', reportReason: 'Harassment', reportedBy: 'Sam Lee', date: 'Sep 24, 2025', status: 'Resolved' },
    { reportId: '1225', userName: 'Etna Knight', reportReason: 'Spam', reportedBy: 'Lara Croft', date: 'Sep 23, 2025', status: 'Pending' },
  ];

  // Business Users Reports Data
  const businessUsersData = [
    { reportId: '2233', businessName: 'Urban Clothing', reportReason: 'Counterfeit Item', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Pending' },
    { reportId: '2234', businessName: 'Urban Clothing', reportReason: 'Fraud', reportedBy: 'Sam Lee', date: 'Sep 24, 2025', status: 'Pending' },
  ];

  // Moments Reports Data
  const momentsData = [
    { reportId: '3233', post: 'Related Moments ...', reportReason: 'Offensive Image', reportedBy: 'Bobby Miles', date: 'Sep 25, 2025', status: 'Pending' },
    { reportId: '3234', post: 'Cool clip', reportReason: 'Copyright', reportedBy: 'Sam Lee', date: 'Sep 20, 2025', status: 'Resolved' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-600';
      case 'Resolved':
        return 'text-green-600';
      case 'Dismissed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Report Monitoring</h1>

        {/* Stats Cards Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {statsCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Alert Cards Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {alertCards.map((card, index) => (
            <div key={index} className={`${card.bgColor} rounded-lg p-4 border border-gray-200`}>
              <div className="flex items-center gap-3">
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                  <p className="text-sm text-gray-700">{card.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('liveStream')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'liveStream'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            Live Stream Reports
          </button>
          <button
            onClick={() => setActiveTab('streamerFans')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'streamerFans'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Streamer/Fans Reports
          </button>
          <button
            onClick={() => setActiveTab('businessUsers')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'businessUsers'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Business Users Reports
          </button>
          <button
            onClick={() => setActiveTab('moments')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'moments'
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Moments Reports
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Live Stream Reports</h2>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
          </div>

          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Stream Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Streamer Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report Reason</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Reported By</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.reportId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.streamTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.streamerName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.reportReason}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.reportedBy}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{row.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                          <Eye className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                          <CheckCircle className="w-3.5 h-3.5 mr-1" />
                          Mark Resolved
                        </button>
                        <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                          <XCircle className="w-3.5 h-3.5 mr-1" />
                          Mark Dismissed
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile/Tablet */}
          <div className="lg:hidden divide-y divide-gray-200">
            {tableData.map((row, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">ID: {row.reportId}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{row.streamTitle}</h3>
                    <p className="text-sm text-gray-600 mb-1">{row.streamerName}</p>
                    <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-3 border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reason:</span>
                    <span className="font-medium text-gray-900">{row.reportReason}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reported By:</span>
                    <span className="font-medium text-gray-900">{row.reportedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date:</span>
                    <span className="font-medium text-gray-900">{row.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                    <Eye className="w-4 h-4 text-yellow-600" />
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Mark Resolved
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Streamer/Fans Reports Table */}
          {activeTab === 'streamerFans' && (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">User Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Reported By</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {streamerFansData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.userName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportReason}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportedBy}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                              Resolve
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {streamerFansData.map((row, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">ID: {row.reportId}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">{row.userName}</h3>
                        <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm mb-3 border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reason:</span>
                        <span className="font-medium text-gray-900">{row.reportReason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reported By:</span>
                        <span className="font-medium text-gray-900">{row.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900">{row.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                        Resolve
                      </button>
                      <button className="px-3 py-2 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Business Users Reports Table */}
          {activeTab === 'businessUsers' && (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Business Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Reported By</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {businessUsersData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.businessName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportReason}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportedBy}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                              Resolve
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden divide-y divide-gray-200">
                {businessUsersData.map((row, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">ID: {row.reportId}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">{row.businessName}</h3>
                        <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm mb-3 border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reason:</span>
                        <span className="font-medium text-gray-900">{row.reportReason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reported By:</span>
                        <span className="font-medium text-gray-900">{row.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900">{row.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                        Resolve
                      </button>
                      <button className="px-3 py-2 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Moments Reports Table */}
          {activeTab === 'moments' && (
            <>
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Post</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Report Reason</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Reported By</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {momentsData.map((row, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportId}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.post}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportReason}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{row.reportedBy}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{row.date}</td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                              Resolve
                            </button>
                            <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:hidden divide-y divide-gray-200">
                {momentsData.map((row, index) => (
                  <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="text-xs text-gray-500 mb-1">ID: {row.reportId}</div>
                        <h3 className="font-semibold text-gray-900 mb-1">{row.post}</h3>
                        <span className={`text-sm font-medium ${getStatusColor(row.status)}`}>
                          {row.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm mb-3 border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reason:</span>
                        <span className="font-medium text-gray-900">{row.reportReason}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reported By:</span>
                        <span className="font-medium text-gray-900">{row.reportedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium text-gray-900">{row.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-green-500 text-white hover:bg-green-600 transition-colors">
                        Resolve
                      </button>
                      <button className="px-3 py-2 rounded text-xs font-medium border border-red-300 text-red-600 hover:bg-red-50 transition-colors">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportMonitoring;