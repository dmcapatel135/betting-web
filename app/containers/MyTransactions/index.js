import { Pagination } from '@components';
import HeroSection from '@components/HeroSection';
import { formatNumber } from '@utils/constants';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DateRangePickerCustom from '@components/FormElements/DateRangePickerCustom';
// import DatePickerCustom from '@components/FormElements/DatePickerCustom';

function MyTransactions() {
  const [myTransactions, setMyTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [pageSize, setPageSize] = useState(10);
  // const [hasMore, setHasMore] = useState();
  // const [date, setDate] = useState();
  const [type, setType] = useState('');
  const [startDate, setStartDate] = useState(
    moment().startOf('month').toDate(),
  );
  const [endDate, setEndDate] = useState(moment().endOf('month').toDate());

  const userWallet = useSelector((state) => state.user);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGetTransactions = useCallback(
    async (query) => {
      const response = await getReq(
        `/users/me/transactions?skip=${page}&take=${pageSize}${query ? query : ''}`,
      );

      if (response.status) {
        setDataCount(response.data.count);
        setMyTransactions(response.data.data);
      }
    },
    [setMyTransactions, page, pageSize],
  );

  useEffect(() => {
    handleGetTransactions();
  }, [handleGetTransactions, page, pageSize]);

  useEffect(() => {
    let query;
    if (startDate && endDate && type) {
      query = `&fromDate=${moment(startDate)
        .startOf('date')
        .toISOString()}&toDate=${moment(endDate)
        .endOf('date')
        .toISOString()}&type=${type}`;
    } else if (startDate && endDate) {
      query = `&fromDate=${moment(startDate)
        .startOf('date')
        .toISOString()}&toDate=${moment(endDate).endOf('date').toISOString()}`;
    } else if (type) {
      query = `&type=${type}`;
    }
    handleGetTransactions(query);
  }, [startDate, endDate, type, handleGetTransactions]);

  return (
    <>
      <HeroSection />
      <div className="border my-3 border-[#A3A3A3] shadow-md rounded-[8px]">
        <div className="flex justify-between p-3">
          <div>
            <h1 className="text-black text-14 xl:text-16 2xl:text-20 font-bold font-sans">
              MY TRANSACTIONS
            </h1>
            <p className="text-gray-900 pt-1 text-10 xl:text-12 2xl:text-14 font-[500]">
              As at {moment(new Date()).format('DD-MM-yyyy  hh:mm A')}
            </p>
          </div>
          <div>
            <p className="text-gray-900 text-10 xl:text-12 text-right 2xl:text-14 font-[500]">
              Account balance
            </p>
            <h1 className="text-black text-14 xl:text-16 text-right xxl:text-20 font-[800] font-roboto">
              TSH{' '}
              {formatNumber(
                Object.values(userWallet)?.filter(
                  (item) => item.type == 'Main',
                )[0]?.amount,
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-end my-1 gap-4 mt-5">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className=" px-3 h-[42px] outline-none rounded-[4px] bg-white border border-blue text-black"
        >
          <option>Credit</option>
          <option>Debit</option>
        </select>
        <DateRangePickerCustom
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          className="h-[42px] !rounded-[4px] border-[1px] !text-black text-ellipsis border-blue"
        />
        <button
          type="reset"
          className="btn border text-black border-primary-700 hover:bg-primary-700"
        >
          Clear
        </button>
      </div>
      <div className="md:border my-4 md:p-3 p-0 md:border-[#A3A3A3]  md:shadow-md md:rounded-[8px]">
        <div className="overflow-x-auto border-b ">
          <table className="w-full ">
            <thead className="bg-gradient-color-2 text-10 md:text-14 h-10 md:rounded-[8px]">
              <th className="rounded-l-[8px] w-[120px]">DATE & TIME</th>
              <th className="w-[300px]">DESCRIPTION</th>
              <th className="w-[100px]">TYPE</th>
              {/* <th>STATUS</th> */}
              <th className="w-[120px]">AMOUNT</th>
              <th className="rounded-r-[8px] w-[120px]">BALANCE</th>
            </thead>
            <tbody className="text-gray-900 text-center text-10 md:text-12 font-[500]">
              {myTransactions.map((item, index) => {
                const transactionDate = moment(item.timestamp);
                const formattedDate = transactionDate.format('DD-MM-yyyy');
                const formattedTime = transactionDate.format('hh:mm A');
                return (
                  <>
                    <tr
                      key={index}
                      className="py-2 border-b border-b-green/20 last:border-b-0"
                    >
                      <td className="w-[120px]">
                        <div className="flex flex-col text-center">
                          <span>{formattedDate}</span> {/* Date */}
                          <span>{formattedTime}</span> {/* Time */}
                        </div>
                      </td>
                      <td className="w-[300px]">{item.narration}</td>
                      <td className="w-[100px]">{item.type}</td>
                      {/* <td>{item.status}</td> */}
                      <td className="w-[120px]">{formatNumber(item.amount)}</td>
                      <td className="w-[120px]">
                        {formatNumber(item.availableBalance)}
                      </td>
                    </tr>
                    <tr>
                      {myTransactions.length == 0 && (
                        <div className="text-center my-3 text-black w-full">
                          <span className="text-14">No Activity Found</span>
                        </div>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* {myTransactions.length > 10 && ( */}
        <div className="border-t">
          <Pagination
            page={page}
            setPage={setPage}
            dataCount={dataCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
        {/* )} */}
      </div>
    </>
  );
}

export default MyTransactions;
