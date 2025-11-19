import React, { useState } from 'react';
import { Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const ChallengesSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const challengesData = [
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: '50 Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: '50 Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: '50 Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: '50 Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
    { id: '01', title: 'Gift Giver', reward: 'EJ Feather', challengeLevel: 'Rare', participants: '1,200', completion: '66%', status: 'Active' },
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Challenges</h1>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            
            {/* Add New Challenge Button */}
            <button className="w-full sm:w-auto px-4 py-2 bg-yellow-400 text-gray-900 text-sm font-medium rounded-lg hover:bg-yellow-500 transition-colors whitespace-nowrap">
              Add New Challenge
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Reward</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Challenge Level</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Participants</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Completion %</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {challengesData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.reward}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.challengeLevel}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.participants}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.completion}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{row.status}</td>
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
            {challengesData.map((row, index) => (
              <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">ID: {row.id}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{row.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{row.reward}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">{row.status}</span>
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
                    <span className="text-gray-500 block mb-1">Challenge Level:</span>
                    <span className="font-semibold text-gray-900">{row.challengeLevel}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Participants:</span>
                    <span className="font-semibold text-gray-900">{row.participants}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Completion:</span>
                    <span className="font-semibold text-gray-900">{row.completion}</span>
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

export default ChallengesSection;