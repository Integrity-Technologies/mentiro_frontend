import React from "react";
import { Pagination } from "react-bootstrap";

const TablePagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index + 1}
          active={index + 1 === currentPage}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

export default TablePagination;
