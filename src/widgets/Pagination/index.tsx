'use client'
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisiblePages = 5;
  
  let visiblePages = pages;
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);
    visiblePages = pages.slice(start - 1, end);
  }

  return (
    <div className="flex justify-center items-center gap-2 my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="ascii-nav-link px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'[<]'}
      </button>
      
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="ascii-nav-link px-2 py-1"
          >
            {'[1]'}
          </button>
          {visiblePages[0] > 2 && <span className="ascii-text">...</span>}
        </>
      )}
      
      {visiblePages.map((page) => (
        page === currentPage ? (
          <span
            key={page}
            className="text-white font-bold px-2 py-1"
          >
            {page}
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className="ascii-nav-link px-2 py-1"
          >
            {`[${page}]`}
          </button>
        )
      ))}
      
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <span className="ascii-text">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="ascii-nav-link px-2 py-1"
          >
            {`[${totalPages}]`}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ascii-nav-link px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {'[>]'}
      </button>
    </div>
  );
}; 