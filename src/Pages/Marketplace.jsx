import React, { useState } from 'react';
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const MarketplaceSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const marketplaceData = [
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'Out of Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
    { rank: '01', productImage: '/api/placeholder/60/60', productName: 'Larson Cap', businessName: 'Pam Cola', unitPrice: '$20', unitsSold: '1,240', totalSales: '$24,800', partnerCreator: 'Jim Larson', creatorCommission: '5.5', itemStatus: 'In Stock' },
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Marketplace</h1>
          
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

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Business Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Units Sold</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Total Sales</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Partner Creator</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Creator Commission (%)</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Item Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {marketplaceData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.rank}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                        </div>
                        <span className="text-sm text-gray-900">{row.productName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.businessName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.unitPrice}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.unitsSold}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.totalSales}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.partnerCreator}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.creatorCommission}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        row.itemStatus === 'In Stock'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {row.itemStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                          <Eye className="w-4 h-4 text-yellow-600" />
                        </button>
                        <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                          <Trash2 className="w-4 h-4 text-red-600" />
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
            {marketplaceData.map((row, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-16 h-16 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Rank: {row.rank}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{row.productName}</h3>
                    <p className="text-sm text-gray-600">{row.businessName}</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      row.itemStatus === 'In Stock'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {row.itemStatus}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 rounded-full bg-yellow-100 hover:bg-yellow-200 transition-colors">
                      <Eye className="w-4 h-4 text-yellow-600" />
                    </button>
                    <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-gray-500 block mb-1">Unit Price:</span>
                    <span className="font-semibold text-gray-900">{row.unitPrice}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Units Sold:</span>
                    <span className="font-semibold text-gray-900">{row.unitsSold}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Total Sales:</span>
                    <span className="font-semibold text-gray-900">{row.totalSales}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Commission:</span>
                    <span className="font-semibold text-gray-900">{row.creatorCommission}%</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-500 block mb-1">Partner:</span>
                    <span className="font-semibold text-gray-900">{row.partnerCreator}</span>
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

export default MarketplaceSection;