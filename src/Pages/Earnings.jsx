import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const Earnings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$12,500', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Business User', userName: 'Pam Cola', totalValue: '$50,000', commission: '5%', adminShare: '$2,500 (5%)', notes: "Admin's cut from all business sales", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
    { id: '1223', sourceType: 'Streamer', userName: 'Alex McMahon', totalValue: '$50,000', commission: '33%', adminShare: '$4,125 (33%)', notes: "Admin's cut from all streamer earnings", date: 'Sep 27, 2025' },
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

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Earnings</h1>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto bg-white border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Source Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">User Name/Business Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Total Value</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Commission Percentage (%)</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Admin Share</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.sourceType}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.totalValue}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.commission}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.adminShare}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{row.notes}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards - Mobile/Tablet */}
        <div className="lg:hidden space-y-4">
          {tableData.map((row, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">ID: {row.id}</div>
                  <h3 className="font-semibold text-gray-900">{row.userName}</h3>
                  <p className="text-sm text-gray-600">{row.sourceType}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{row.totalValue}</div>
                  <div className="text-sm text-gray-600">{row.commission}</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Admin Share:</span>
                  <span className="font-medium text-gray-900">{row.adminShare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-gray-900">{row.date}</span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-500">Notes:</span>
                  <p className="text-gray-900 mt-1">{row.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
  );
};

export default Earnings;