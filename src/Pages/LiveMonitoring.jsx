import React, { useState } from 'react';
import { Search, Radio, Eye, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';

const LiveMonitoring = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const statsData = [
    { title: 'Currently Live', value: '1,247', subtitle: '+15 from last 5 minutes', icon: Radio, color: 'text-red-500', bgColor: 'bg-red-50' },
    { title: 'Total Viewers', value: '342,891', subtitle: '+2.4k from last hour', icon: Eye, color: 'text-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Peak Concurrent', value: '89,234', subtitle: 'All-time high', icon: TrendingUp, color: 'text-purple-500', bgColor: 'bg-purple-50' },
  ];

  const tableData = [
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
    { id: '1223', name: 'Graham Jackson', title: 'IRL Stream | Streaming from Las Vegas | Doing Q&A Sessions', category: 'Lifestyle', currentViewers: 10002, peakViews: 15621, flagged: 2 },
  ];

  const totalPages = 10;

  const renderPageNumbers = () => {
    const pages = [];
    const pagesToShow = [1, 2, 3, 8, 9, 10];
    
    pagesToShow.forEach((page, index) => {
      if (index === 3 && pagesToShow[index - 1] !== page - 1) {
        pages.push(<span key="dots" className="px-2 text-gray-500">...</span>);
      }
      
      pages.push(
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === page
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {page}
        </button>
      );
    });
    
    return pages;
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color, bgColor }) => (
    <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs md:text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{value}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`p-2 md:p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-5 h-5 md:w-6 md:h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Live Monitoring</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">Real-time overview of active streams</h2>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by username..."
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
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Current Viewers</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Peak Views</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Flagged</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{row.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.currentViewers.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.peakViews.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.flagged}</td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                        <Eye className="w-4 h-4 text-yellow-600" />
                      </button>
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
                    <div className="text-xs text-gray-500 mb-1">ID: {row.id}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{row.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{row.title}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{row.category}</span>
                  </div>
                  <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                    <Eye className="w-4 h-4 text-yellow-600" />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-3 text-sm pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-gray-500 block mb-1">Current</span>
                    <span className="font-semibold text-gray-900">{row.currentViewers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Peak</span>
                    <span className="font-semibold text-gray-900">{row.peakViews.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Flagged</span>
                    <span className="font-semibold text-gray-900">{row.flagged}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-4 md:px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {renderPageNumbers()}
            </div>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;