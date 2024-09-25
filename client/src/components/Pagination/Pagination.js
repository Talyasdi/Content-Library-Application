import React from 'react';
import './pagination.css';
import { useSearchParams } from 'react-router-dom';

const PageButton = ({ page, currPage, handlePageChange }) => (
  <button
    key={page}
    name={`page-${page}`}
    onClick={() => handlePageChange(page)}
    disabled={page === currPage}
    aria-disabled={page === currPage}
    className={`number-button ${page === currPage ? 'active' : ''}`}
    style={{ fontWeight: page === currPage ? 'bold' : 'normal',
      color: page === currPage ? '#a375d5' : 'black',
    }}
  >
    {page}
  </button>
);

const Pagination = ({ pagination }) => {
  const { currPage, totalPages } = pagination;
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle page change and update the URL
  const handlePageChange = (page) => {
    if (page !== currPage) {
      setSearchParams({ page }); // Update URL param
      pagination.handlePageChange(page); // Update pagination state
    }
  };

  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PageButton
          key={i}
          page={i}
          currPage={currPage}
          handlePageChange={handlePageChange}
        />
      );
    }
  } else {
    if (currPage > totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(
          <PageButton
            key={i}
            page={i}
            currPage={currPage}
            handlePageChange={handlePageChange}
          />
        );
      }
    } else {
      for (let i = Math.max(currPage - 2, 1); i <= Math.max(currPage + 2, 5); i++) {
        pages.push(
          <PageButton
            key={i}
            page={i}
            currPage={currPage}
            handlePageChange={handlePageChange}
          />
        );
      }
    }
  }

  return (
    <div className="pagination">
      <button
        name="first"
        className={`icon-button ${currPage === 1 ? 'disabled' : ''}`}
        disabled={currPage === 1}
        onClick={() => handlePageChange(1)}
      >
        <i className="fa-solid fa-angles-left"></i>
      </button>
      <button
        name="previous"
        className={`icon-button ${currPage === 1 ? 'disabled' : ''}`}
        disabled={currPage === 1}
        onClick={() => handlePageChange(currPage - 1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      {pages}
      <button
        name="next"
        className={`icon-button ${currPage === totalPages ? 'disabled' : ''}`}
        disabled={currPage === totalPages}
        onClick={() => handlePageChange(currPage + 1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
      <button
        name="last"
        className={`icon-button ${currPage === totalPages ? 'disabled' : ''}`}
        disabled={currPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        <i className="fa-solid fa-angles-right"></i>
      </button>
    </div>
  );
};

export default Pagination;