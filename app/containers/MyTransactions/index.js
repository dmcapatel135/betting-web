import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  Pagination,
  TalkToUs,
} from '@components';
import HeroSection from '@components/HeroSection';
import { formatNumber } from '@utils/constants';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import DatePickerCustom from '@components/FormElements/DatePickerCustom';

function MyTransactions() {
  const [myTransactions, setMyTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [dataCount, setDataCount] = useState();
  const [pageSize, setPageSize] = useState(10);
  // const [hasMore, setHasMore] = useState();
  const [date, setDate] = useState();
  const [type, setType] = useState('');

  const userWallet = useSelector((state) => state.user);

  const handleGetTransactions = useCallback(
    async (query) => {
      const response = await getReq(
        `/users/me/transactions?skip=${page}&take=${pageSize}${query ? query : ''}`,
      );
      // setMyTransactions(response.data.data);
      setDataCount(response.data.data.dataCount);

      if (response.status) {
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
    let newDate = moment(
      date,
      'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (India Standard Time)',
    ).format('YYYY-MM-DD');
    if (date && type) {
      query = `&date=${newDate}&type=${type}`;
    } else if (date) {
      query = `&date=${newDate}`;
    } else if (type) {
      query = `&type=${type}`;
    }
    handleGetTransactions(query);
  }, [date, type, handleGetTransactions]);

  const handleDate = (date) => {
    console.log('-----date', date);
    setDate(date);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div className="md:p-5 p-0">
          <HeroSection />
          <div className="my-3 px-3 md:px-0">
            <div className="border-[1px] border-[#A3A3A3]  shadow-md rounded-[8px]">
              <div className="flex justify-between p-3">
                <div>
                  <h1 className="text-black text-14 xl:text-16 2xl:text-20 font-bold font-sans">
                    MY TRANSACTIONS
                  </h1>
                  <p className="text-gray-900 pt-1 text-10 xl:text-12 2xl:text-14 font-[500]">
                    As at 11/12/2023 11:36
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
            <div className="md:border my-4 md:p-3 p-0 md:border-[#A3A3A3]  md:shadow-md md:rounded-[8px]">
              <div className="flex justify-end my-1">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="py-1 px-3 mx-2 outline-none rounded-md bg-blue text-white"
                >
                  <option>Credit</option>
                  <option>Debit</option>
                </select>
                <DatePickerCustom
                  handleDate={handleDate}
                  date={date}
                  className="border border-blue"
                />
              </div>
              <table className="w-full">
                <thead className="bg-gradient-color-2 text-10 md:text-14 h-10 md:rounded-[8px]">
                  <th className="rounded-l-[8px] ">DATE & TIME</th>
                  <th>DESCRIPTION</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>AMOUNT</th>
                  <th className="rounded-r-[8px]">BALANCE</th>
                </thead>
                <tbody className="text-gray-900 text-center text-10 md:text-12 font-[500]">
                  {myTransactions.map((item, index) => {
                    return (
                      <tr key={index} className="py-2">
                        <td>
                          {moment(item.timestamp).format('DD-MM-yyyy hh:mm A')}
                        </td>
                        <td>{item.narration}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>{formatNumber(item.amount)}</td>
                        <td>{formatNumber(item.availableBalance)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {myTransactions.length == 0 && (
                <div className="text-center my-3 text-black w-full">
                  <span className="text-14">No Activity Found</span>
                </div>
              )}
              {myTransactions.length > 10 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  dataCount={dataCount}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 2xl:col-span-3 mt-3 ml-1 mr-3 lg:block hidden">
        {/* <RightSideSection /> */}
        {/* <BetWallet /> */}
        <Betslip wallet="true" />
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default MyTransactions;
