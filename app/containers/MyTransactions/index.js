import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import HeroSection from '@components/HeroSection';
// import { getReq } from '@utils/apiHandlers';
// import { formatNumber } from '@utils/constants';
import React from 'react';
// , { useState } useCallback, useEffect,
// import InfiniteScroll from 'react-infinite-scroll-component';

function MyTransactions() {
  // const [myTransactions, setMyTransactions] = useState([]);
  // const [page, setPage] = useState();
  // const [hasMore, setHasMore] = useState();sss
  // const [wallet, setWallet] = useState([]);

  // const handleGetTransactions = useCallback(async () => {
  //   const response = await getReq('/users/me/transactions');

  //   if (response.data.data.length > 0) {
  //     setMyTransactions((prevState) => [...prevState, ...response.data.data]);
  //   } else {
  //     setMyTransactions([...response.data.data]);
  //     setHasMore(false);
  //   }
  // }, [setMyTransactions]);

  // useEffect(() => {
  //   handleGetTransactions();
  // }, [handleGetTransactions]);

  // const fetchMoreData = () => {
  //   setPage(page + 1);
  //   handleGetTransactions();
  // };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8 2xl:col-span-9">
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
                    {/* TSH{' '}
                    {formatNumber(
                      Object.values(userWallet)?.filter(
                        (item) => item.type == 'Main',
                      )[0]?.amount,
                    )} */}
                  </h1>
                </div>
              </div>
            </div>
            <div className="md:border my-4 md:p-3 p-0 md:border-[#A3A3A3]  md:shadow-md md:rounded-[8px]">
              <table className="w-full">
                <thead className="bg-gradient-color-2 text-10 md:text-14 h-10 md:rounded-[8px]">
                  <th className="rounded-l-[8px]">DATE & TIME</th>
                  <th>DESCRIPTION</th>
                  <th>CREDIT</th>
                  <th>DEBIT</th>
                  <th className="rounded-r-[8px]">BALANCE</th>
                </thead>
                <tbody className="text-gray-900 text-center text-10 md:text-12 font-[500]">
                  {/* <InfiniteScroll
                    dataLength={myTransactions.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={<p>No more data to load.</p>}
                  >
                    {myTransactions.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>2023-12-09 10:48</td>
                          <td>{item.narration}</td>
                          <td></td>
                          <td>50000</td>
                          <td>16250</td>
                        </tr>
                      );
                    })}
                  </InfiniteScroll> */}
                  <tr>
                    <td>2023-12-09 10:48</td>
                    <td>narration</td>
                    <td>-</td>
                    <td>50000</td>
                    <td>16250</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4 2xl:col-span-3 mt-3 ml-1 mr-3 md:block hidden">
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
