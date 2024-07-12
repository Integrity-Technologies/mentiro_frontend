import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TablePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <nav className="flex items-center justify-end my-4">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className={`px-2 py-1 mr-2  text-gray-700 rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <FaChevronLeft />
      </button>

      <div className="flex items-center">
        <span className="mr-2">{` ${currentPage} of ${totalPages} `}</span>
      </div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`px-2 py-1  text-gray-700 rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        
        <FaChevronRight />
      </button>
    </nav>
  );
};

export default TablePagination;
