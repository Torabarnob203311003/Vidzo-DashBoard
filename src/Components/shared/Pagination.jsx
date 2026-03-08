import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalPages, maxVisiblePages = 5, page, setPage }) => {
  // Generate page numbers with ellipsis logic
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1); // Always show first page

      let startPage = Math.max(2, page - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

      if (endPage === totalPages - 1) {
        startPage = Math.max(2, endPage - maxVisiblePages + 1);
      }

      if (startPage > 2) pages.push("...");

      for (let i = startPage; i <= endPage; i++) pages.push(i);

      if (endPage < totalPages - 1) pages.push("...");

      pages.push(totalPages); // Always show last page
    }

    return pages;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => page > 1 && handlePageChange(page - 1);
  const handleNext = () => page < totalPages && handlePageChange(page + 1);

  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-10 flex flex-wrap items-center justify-end gap-3">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={page === 1}
        className={`flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600 transition duration-200 ${
          page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        <ChevronLeft size={18} /> Previous
      </button>

      {/* Page Buttons */}
      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span
            key={i}
            className="w-11 h-11 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => handlePageChange(Number(p))}
            className={`w-11 h-11 rounded-xl text-sm font-black flex items-center justify-center transition duration-200 ${
              p === page
                ? "bg-[#FFC12D] text-white shadow-xl shadow-yellow-400/20"
                : "text-gray-400 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`flex items-center gap-2 px-6 py-3 border border-gray-100 bg-white rounded-xl text-sm font-black text-gray-600 transition duration-200 ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Next <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;
