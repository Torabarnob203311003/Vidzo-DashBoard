import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const MarketplaceItemsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const tableData = [
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: '-', creatorCommission: '-', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
    { image: '/api/placeholder/60/60', productName: 'Premium Hoodie', businessName: 'Pam Cole', price: '$20.00', partneredCreator: 'Tom McMahon', creatorCommission: '5.5%', submitted: '2024-03-16' },
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
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Marketplace Item</h1>
          
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Business Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Partnered Creator</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Creator Commission</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Submitted</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{row.productName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.businessName}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.partneredCreator}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.creatorCommission}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{row.submitted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                        Approve
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
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
              <div className="flex items-start gap-3 mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{row.productName}</h3>
                  <p className="text-sm text-gray-600">{row.businessName}</p>
                  <p className="text-sm font-semibold text-gray-900 mt-1">{row.price}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Partnered Creator:</span>
                  <span className="font-medium text-gray-900">{row.partneredCreator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Creator Commission:</span>
                  <span className="font-medium text-gray-900">{row.creatorCommission}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Submitted:</span>
                  <span className="font-medium text-gray-900">{row.submitted}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                  Approve
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
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

export default MarketplaceItemsTable;