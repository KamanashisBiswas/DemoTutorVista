import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              currentPage === i
                ? "z-10 bg-blue-600 border-blue-600 text-white shadow-lg"
                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 hover:text-gray-700"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <span key={i} className="px-2 py-2 text-gray-400">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200 rounded-b-xl">
      {/* Mobile Pagination */}
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md"
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-50 px-3 py-1 rounded-full">
            <p className="text-sm font-medium text-blue-700">
              Showing{" "}
              <span className="font-bold">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold">
                {Math.min(currentPage * itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="font-bold">{totalItems}</span> results
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
          >
            Previous
          </button>
          <div className="flex items-center space-x-1">
            {renderPageNumbers()}
          </div>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 disabled:cursor-not-allowed text-gray-700 bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
