import React from 'react';
import './pagination.css'

const PageButton = ({ page, currPage, handlePageChange }) => (
  <button
    key={page}
    name={`page-${page}`}
    onClick={() => handlePageChange(page)}
    disabled={page === currPage}
    aria-disabled={page === currPage}
    className={`pagination-button ${page === currPage ? "active" : ""}`}
    style={{ fontWeight: page === currPage ? 'bold' : 'normal' }}
  >
    {page}
  </button>
);

const Pagination = ({ pagination }) => {
  const { currPage, totalPages, handlePageChange } = pagination;
  const pages = [];
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(<PageButton key={i} page={i} currPage={currPage} handlePageChange={handlePageChange} />);
    }
  } else {
    if (currPage > totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(<PageButton key={i} page={i} currPage={currPage} handlePageChange={handlePageChange} />);
      }
    } else {
      for (let i = Math.max(currPage - 2, 1); i <= Math.max(currPage + 2, 5); i++) {
        pages.push(<PageButton key={i} page={i} currPage={currPage} handlePageChange={handlePageChange} />);
      }
    }
  }

  return (
    <div>
      <button 
        name="first"
        className={`pagination-button ${currPage === 1 ? "disabled" : ""}`}
        disabled={currPage === 1}
        onClick={() => handlePageChange(1)}
      >
        &laquo;
      </button>
      <button
        name="previous"
        className={`pagination-button ${currPage === 1 ? "disabled" : ""}`}
        disabled={currPage === 1}
        onClick={() => handlePageChange(currPage - 1)}
      >
        &lt;
      </button>
      {pages}
      <button
        name="next"
        className={`pagination-button ${currPage === totalPages ? "disabled" : ""}`}
        disabled={currPage === totalPages}
        onClick={() => handlePageChange(currPage + 1)}
      >
        &gt;
      </button>
      <button
        name="last"
        className={`pagination-button ${currPage === totalPages ? "disabled" : ""}`}
        disabled={currPage === totalPages}
        onClick={() => handlePageChange(totalPages)}
      >
        &raquo;
      </button>
    </div>
  );
}

export default Pagination;