import React from "react";

const TutorPagination = ({ currentPage = 1, totalPages = 1, totalTutors = 0, onPageChange }) => {
  if (totalPages <= 1) return null;

  // Build page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // number of pages around current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-slate-200/80" data-purpose="pagination-controls">
      <p className="text-xs text-slate-500 order-2 sm:order-1 font-sans">
        Showing Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
        <span className="font-bold text-slate-800">{totalPages}</span>
        {totalTutors > 0 && (
          <span> (Total {totalTutors.toLocaleString()} tutors registered)</span>
        )}
      </p>

      <nav aria-label="Pagination Navigation" className="flex items-center gap-1.5 order-1 sm:order-2">
        {/* Prev button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
            currentPage === 1
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-700 cursor-pointer"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>

        {pages.map((p, index) => {
          if (p === "...") {
            return (
              <span key={`ellipsis-${index}`} className="w-7 text-center text-xs text-slate-400">
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`w-9 h-9 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                isActive
                  ? "bg-brand-700 text-white font-bold shadow-sm shadow-brand-700/30"
                  : "border border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-700"
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
          className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
            currentPage === totalPages
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-700 cursor-pointer"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default TutorPagination;
