import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
    return (
        <div>
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}>Next</button>
        </div>
    );
};

export default Pagination;
