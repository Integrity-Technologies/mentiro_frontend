import React from "react";

const TablePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav className="flex items-center justify-center my-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 mr-2 bg-gray-200 text-gray-700 rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Prev
      </button>
      <div className="flex">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded ${
              index + 1 === currentPage ? "bg-blue-400 text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 ml-2 bg-gray-200 text-gray-700 rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        Next
      </button>
    </nav>
  );
};

export default TablePagination;