import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Pagination = ({ page, setPage, dataCount, pageSize }) => {
  const onPageChange = (event) => {
    setPage(event.selected + 1);
  };

  return (
    <div className="py-4">
      <ReactPaginate
        nextLabel="Next"
        previousLabel="Prev"
        forcePage={page - 1}
        onPageChange={onPageChange}
        pageRangeDisplayed={8}
        pageCount={Math.ceil(dataCount / pageSize)}
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center gap-2 items-center"
        pageClassName="pagination-item-style"
        activeClassName="bg-primary-700 text-white"
        previousClassName="pagination-item-style"
        nextClassName="pagination-item-style"
        disabledClassName="disabled-item"
      />
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  dataCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Pagination;
