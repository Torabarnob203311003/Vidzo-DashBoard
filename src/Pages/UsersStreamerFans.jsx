import React, { useState } from 'react';
import { Search, Ban, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersStreamerFans = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '2 hrs Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '2 hrs Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '2 hrs Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '1 Day Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '1 Day Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '1 Day Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '10 Days Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '1 Month Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '2 Min Ago' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$0', lastStream: 'Never' },
    { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$0', lastStream: 'Never' },
  ];

  const totalPages = 10;

  const renderPageNumbers = () => {
    const pages = [];
    pages.push(
      <button
        key={1}
        onClick={() => setCurrentPage(1)}
        className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        1
      </button>
    );
    
    pages.push(
      <button
        key={2}
        onClick={() => setCurrentPage(2)}
        className={`px-3 py-1 rounded ${currentPage === 2 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        2
      </button>
    );
    
    pages.push(
      <button
        key={3}
        onClick={() => setCurrentPage(3)}
        className={`px-3 py-1 rounded ${currentPage === 3 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        3
      </button>
    );
    
    pages.push(<span key="dots" className="px-2 text-gray-500">...</span>);
    
    pages.push(
      <button
        key={8}
        onClick={() => setCurrentPage(8)}
        className={`px-3 py-1 rounded ${currentPage === 8 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        8
      </button>
    );
    
    pages.push(
      <button
        key={9}
        onClick={() => setCurrentPage(9)}
        className={`px-3 py-1 rounded ${currentPage === 9 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        9
      </button>
    );
    
    pages.push(
      <button
        key={10}
        onClick={() => setCurrentPage(10)}
        className={`px-3 py-1 rounded ${currentPage === 10 ? 'bg-red-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
      >
        10
      </button>
    );
    
    return pages;
  };

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Streamers & Fans</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto overflow-y-auto max-h-[70vh]">
          <table className="w-full">
            <thead className="sticky top-0 bg-white border-b border-gray-200 z-20">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Feather Level</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Avg Viewers</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Feather</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Coins</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Flagged</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Followers</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Following</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Friends</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subscribers</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Earnings</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Last Stream</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-900">{row.id}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    <div className="flex flex-col">
                      <span>{row.location.split(' ')[0]} {row.location.split(' ')[1]}</span>
                      <span className="text-gray-500">{row.location.split(' ')[2]}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.featherLevel}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.avgViewers}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.totalFeather}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.totalCoins}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.flagged}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.followers}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.following}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.friends}</td>
                  <td className="px-4 py-4 text-sm text-gray-900">{row.subscribers}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{row.totalEarnings}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{row.lastStream}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                        <Ban className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-1.5 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                        <DollarSign className="w-4 h-4 text-yellow-600" />
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
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">ID: {row.id}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{row.name}</h3>
                  <p className="text-sm text-gray-600">{row.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 rounded-full bg-red-100">
                    <Ban className="w-4 h-4 text-red-600" />
                  </button>
                  <button className="p-1.5 rounded-full bg-yellow-100">
                    <DollarSign className="w-4 h-4 text-yellow-600" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Feather Level:</span>
                  <span className="ml-2 font-medium text-gray-900">{row.featherLevel}</span>
                </div>
                <div>
                  <span className="text-gray-500">Avg Viewers:</span>
                  <span className="ml-2 font-medium text-gray-900">{row.avgViewers}</span>
                </div>
                <div>
                  <span className="text-gray-500">Followers:</span>
                  <span className="ml-2 font-medium text-gray-900">{row.followers}</span>
                </div>
                <div>
                  <span className="text-gray-500">Subscribers:</span>
                  <span className="ml-2 font-medium text-gray-900">{row.subscribers}</span>
                </div>
                <div>
                  <span className="text-gray-500">Earnings:</span>
                  <span className="ml-2 font-semibold text-gray-900">{row.totalEarnings}</span>
                </div>
                <div>
                  <span className="text-gray-500">Last Stream:</span>
                  <span className="ml-2 font-medium text-gray-900">{row.lastStream}</span>
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
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          
          <div className="flex items-center gap-2">
            {renderPageNumbers()}
          </div>
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersStreamerFans;