import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const Pagination = ({ page, setPage, dataCount, pageSize, setPageSize }) => {
  const onPageChange = (e) => {
    setPage(e.selected * 10);
  };

  return (
    <div className="py-4 flex items-center justify-between px-3">
      <div>
        <label className="text-black text-14 mr-2 ">Page Size</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="h-7 w-12 text-black bg-white rounded-[4px]  outline-none border-[1px]"
        >
          <option value={'10'}>10</option>
          <option value={'20'}>20</option>
        </select>
      </div>
      <ReactPaginate
        nextLabel="Next"
        previousLabel="Prev"
        forcePage={page - 1}
        onPageChange={onPageChange}
        pageRangeDisplayed={8}
        pageCount={Math.ceil(dataCount / pageSize)}
        renderOnZeroPageCount={null}
        containerClassName="flex justify-center gap-2  items-center"
        pageClassName="pagination-item-style"
        activeClassName="bg-yellow border-yellow text-white"
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
  setPageSize: PropTypes.number.isRequired,
};

export default Pagination;
