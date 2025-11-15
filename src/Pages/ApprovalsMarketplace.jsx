import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const ApprovalsMarketplace = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
    { id: '1223', businessName: 'Milie Jacob', userName: 'Chris Brad', submitted: '2024-01-15', taxPayReg: 'T44997564324', verification: 'Verify' },
  ];

  const totalPages = 12;

  const renderPageNumbers = () => {
    const pages = [];
    const pagesToShow = [1, 2, 3, 4, 5, 12];
    
    pagesToShow.forEach((page, index) => {
      if (index === 5 && pagesToShow[index - 1] !== page - 1) {
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Business Users</h1>
          
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
        <div className="hidden lg:block overflow-x-auto bg-white border border-gray-200 rounded-lg">
          <table className="w-full">
            <thead className="bg-white border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">User Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Tax Pay Reg Number</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Verification Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.businessName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.userName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.submitted}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.taxPayReg}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-gray-900">
                      {row.verification}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Approve
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
                        <XCircle className="w-3.5 h-3.5 mr-1" />
                        Decline
                      </button>
                    </div>
                  </td>
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
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{row.businessName}</h3>
                    <p className="text-sm text-gray-600">{row.userName}</p>
                  </div>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400 text-gray-900">
                  {row.verification}
                </span>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted:</span>
                  <span className="font-medium text-gray-900">{row.submitted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax Pay Reg:</span>
                  <span className="font-medium text-gray-900">{row.taxPayReg}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Approve
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
                  <XCircle className="w-3.5 h-3.5 mr-1" />
                  Decline
                </button>
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

export default ApprovalsMarketplace;