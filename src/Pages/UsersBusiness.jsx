import React, { useState } from 'react';
import { Search, Ban, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';

const UsersBusiness = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
   { id: '1223', name: 'Milie Jacob', location: 'New York USA', featherLevel: 2, avgViewers: 2457, totalFeather: 1200, totalCoins: 12, flagged: 0, followers: 122, following: 56, friends: 56, subscribers: 56, totalEarnings: '$200.87', lastStream: '2 hrs Ago' },
  { id: '1224', name: 'Alex Brown', location: 'Los Angeles USA', featherLevel: 3, avgViewers: 3400, totalFeather: 2100, totalCoins: 20, flagged: 0, followers: 300, following: 150, friends: 120, subscribers: 80, totalEarnings: '$450.50', lastStream: '1 hr Ago' },
  { id: '1225', name: 'Sophia Lee', location: 'Chicago USA', featherLevel: 1, avgViewers: 1500, totalFeather: 800, totalCoins: 8, flagged: 1, followers: 90, following: 40, friends: 30, subscribers: 25, totalEarnings: '$120.00', lastStream: '3 hrs Ago' },
  { id: '1226', name: 'David Kim', location: 'San Francisco USA', featherLevel: 4, avgViewers: 5200, totalFeather: 3000, totalCoins: 35, flagged: 0, followers: 500, following: 200, friends: 180, subscribers: 150, totalEarnings: '$780.30', lastStream: '30 min Ago' },
  { id: '1227', name: 'Emma Watson', location: 'Miami USA', featherLevel: 2, avgViewers: 2100, totalFeather: 1000, totalCoins: 15, flagged: 0, followers: 210, following: 80, friends: 60, subscribers: 45, totalEarnings: '$310.20', lastStream: 'Yesterday' },
  { id: '1228', name: 'Liam Johnson', location: 'Houston USA', featherLevel: 3, avgViewers: 4000, totalFeather: 2200, totalCoins: 25, flagged: 0, followers: 410, following: 230, friends: 190, subscribers: 120, totalEarnings: '$620.00', lastStream: '2 Days Ago' },
  { id: '1229', name: 'Olivia Martinez', location: 'Seattle USA', featherLevel: 1, avgViewers: 900, totalFeather: 400, totalCoins: 5, flagged: 1, followers: 75, following: 30, friends: 20, subscribers: 15, totalEarnings: '$50.75', lastStream: '5 Days Ago' },
  { id: '1230', name: 'Noah Davis', location: 'Boston USA', featherLevel: 5, avgViewers: 6200, totalFeather: 3500, totalCoins: 40, flagged: 0, followers: 600, following: 300, friends: 250, subscribers: 200, totalEarnings: '$950.90', lastStream: '10 min Ago' },
  { id: '1231', name: 'Ava Wilson', location: 'Dallas USA', featherLevel: 2, avgViewers: 1700, totalFeather: 900, totalCoins: 10, flagged: 0, followers: 140, following: 70, friends: 50, subscribers: 40, totalEarnings: '$180.50', lastStream: '1 Week Ago' },
  { id: '1232', name: 'Ethan Moore', location: 'Atlanta USA', featherLevel: 3, avgViewers: 3200, totalFeather: 2000, totalCoins: 22, flagged: 0, followers: 350, following: 150, friends: 120, subscribers: 90, totalEarnings: '$410.00', lastStream: 'Yesterday' },
  { id: '1233', name: 'Isabella Taylor', location: 'Denver USA', featherLevel: 1, avgViewers: 1300, totalFeather: 600, totalCoins: 7, flagged: 0, followers: 100, following: 50, friends: 40, subscribers: 30, totalEarnings: '$90.00', lastStream: '2 Weeks Ago' },
  { id: '1234', name: 'James Anderson', location: 'Phoenix USA', featherLevel: 4, avgViewers: 4800, totalFeather: 2800, totalCoins: 32, flagged: 0, followers: 450, following: 200, friends: 180, subscribers: 140, totalEarnings: '$700.50', lastStream: 'Yesterday' },
  { id: '1235', name: 'Mia Thomas', location: 'Orlando USA', featherLevel: 2, avgViewers: 1900, totalFeather: 950, totalCoins: 12, flagged: 0, followers: 180, following: 80, friends: 70, subscribers: 55, totalEarnings: '$210.75', lastStream: '3 Days Ago' },
  { id: '1236', name: 'Lucas White', location: 'Portland USA', featherLevel: 3, avgViewers: 3500, totalFeather: 2300, totalCoins: 28, flagged: 0, followers: 380, following: 200, friends: 160, subscribers: 120, totalEarnings: '$510.00', lastStream: '1 hr Ago' },
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Users Business</h1>
          
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

export default UsersBusiness;