import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 20,
  totalRequests = 1840,
  requestsPerPage = 9,
  onPageChange,
}) => {
  const startItem = totalRequests === 0 ? 0 : (currentPage - 1) * requestsPerPage + 1;
  const endItem = Math.min(currentPage * requestsPerPage, totalRequests);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 mt-2" data-purpose="tuition-pagination">
      <div className="text-xs sm:text-sm text-slate-500 font-medium">
        Showing <strong className="text-slate-900 font-bold">{startItem} – {endItem || 9}</strong> of{" "}
        <strong className="text-slate-900 font-bold">{totalRequests ? totalRequests.toLocaleString() : "1,840"}</strong> tuition requests
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
            currentPage === 1
              ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
              : "bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Previous</span>
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className="px-1.5 text-slate-400 font-medium">
                ...
              </span>
            );
          }

          const isActive = currentPage === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-700 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
            currentPage === totalPages
              ? "bg-slate-50 text-slate-400 cursor-not-allowed border border-slate-100"
              : "bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200"
          }`}
        >
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
