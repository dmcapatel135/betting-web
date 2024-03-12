import React, { useCallback, useEffect, useState } from 'react';

import {
  BetDetailCard,
  // BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  HeroSection,
  SkeletonLoader,
  TalkToUs,
} from '@components';
import ShareBetModal from '@components/ShareBetModal.js';
import { getReq } from '@utils/apiHandlers';
import moment from 'moment';
// import InfiniteScroll from 'react-infinite-scroll-component';

const TabsName = [
  { tabName: 'All', id: 1, icon: '/images/bikoicon/sports_soccer.png' },
  {
    tabName: 'Pending',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
  },
  { tabName: 'Settled', id: 3, icon: '/images/bikoicon/boxing.png' },
  { tabName: 'Jackpot', id: 4, icon: '/images/bikoicon/rugby.png' },
  { tabName: 'Cancelled', id: 5, icon: '/images/bikoicon/rugby.png' },
];

function MyBets() {
  const [step, setStep] = useState(1);
  const [myBets, setMyBets] = useState([]);
  const [showBets, setShowBets] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [queries, setQueries] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [pageSize, setPageSize] = useState(10);

  const getMyBetDetails = useCallback(
    async (query, newPage) => {
      setIsLoading(true);
      setPageSize(10);
      const response = await getReq(
        `/users/me/bet-slips?skip=${
          newPage ? newPage : 0
        }&take=${pageSize}${query}`,
      );
      if (response.status) {
        setIsLoading(false);
      }
      if (response.data.data.length > 0) {
        setMyBets((prev) => [...prev, ...response.data.data]);
      } else {
        setHasMore(false);
      }
    },
    [pageSize],
  );

  useEffect(() => {
    setMyBets([]);
    setPage(0);
    let query;
    if (status == 'Jackpot') query = '&type=Jackpot';
    else if (status) query = `&status=${status}`;
    else query = '';
    setQueries(query);
    getMyBetDetails(query);
  }, [status, getMyBetDetails]);

  // useEffect(() => {
  //   if (showBets) {
  //     const bets = myBets.filter((item) => item.id === showBets);
  //     setMyBets(bets);
  //   }
  // }, [myBets, showBets]);

  useEffect(() => {
    if (step == 1) {
      setStatus('');
    } else if (step == 2) setStatus('Pending');
    else if (step == 3) setStatus('Settled');
    else if (step == 4) setStatus('Jackpot');
    else if (step == 5) setStatus('Cancelled');
  }, [step]);

  // const fetchMoreData = () => {
  //   const newPage = page + 10;
  //   // setPage(newPage);
  //   getMyBetDetails(queries, newPage);
  // };

  console.log('-----page ', page, hasMore, queries, myBets);

  return (
    <div className="grid grid-cols-12 h-full">
      <ShareBetModal />
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div className="md:p-5 p-2">
          <HeroSection />
          {showBets ? (
            <div className="mt-5">
              <div className="flex justify-between px-5 items-center h-10 rounded-md bg-yellow text-black">
                <h1 className="flex-1">Bets</h1>
                <span
                  className="cursor-pointer"
                  onClick={() => setShowBets(null)}
                >
                  Back
                </span>
              </div>
              <div>
                {myBets.length > 0 &&
                  myBets?.map((item, index) => {
                    return (
                      <div key={index} className="my-2">
                        <BetDetailCard
                          showBets={showBets}
                          setShowBets={setShowBets}
                          item={item}
                          index={index}
                        />
                        <div className="mt-2 overflow-auto">
                          <table className="text-black w-full overflow-auto text-14">
                            <thead className="bg-yellow h-12 rounded-t-md">
                              <th className="rounded-tl-md">START</th>
                              <th>GAME</th>
                              <th>MKT</th>
                              <th>ODDS</th>
                              <th>PICK</th>
                              <th>FT</th>
                              <th className="rounded-tr-md">STATUS</th>
                            </thead>
                            <tbody className="text-center text-12">
                              {item?.bets.map((innerItem, innerIndex) => {
                                return (
                                  <tr key={innerIndex}>
                                    <td>
                                      {moment(innerItem.createdAt).format(
                                        'DD-MM-yy hh:mm',
                                      )}
                                    </td>
                                    <td>
                                      {innerItem.event.competitors[0].name +
                                        'v/s' +
                                        innerItem.event.competitors[1].name}
                                    </td>
                                    <td>{innerItem.market}</td>
                                    <td>{innerItem.odds}</td>
                                    <td>{innerItem.outcome}</td>
                                    <td>{innerItem.outcome}</td>
                                    <td>{innerItem.status}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div>
              <div className="border-[1px]  mt-5 border-blue px-1 md:px-0 flex bg-white w-full rounded-lg cursor-pointer  md:h-12 xxl:h-16">
                {TabsName.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`${
                        step === item.id
                          ? 'bg-gradient-color-1 text-white'
                          : 'bg-white text-black'
                      } px-1 md:px-0 xl:px-3 mx-3 my-1 w-fit md:w-28  rounded-lg`}
                      onClick={() => {
                        setStep(item.id);
                        // setStatus(item.tabName == 'All' ? '' : item.tabName);
                      }}
                    >
                      <div className="flex  h-10  md:justify-center items-center">
                        {/* <img src={item.icon} alt="profile_icon" /> */}
                        <span className="px-2 text-14 font-[700]  xxl:text-16">
                          {item.tabName}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="my-5 text-black">
                {myBets?.length > 0 &&
                  myBets.map((item, index) => {
                    return (
                      <div key={index} className="my-2">
                        {/* <InfiniteScroll
                          dataLength={myBets.length}
                          next={fetchMoreData}
                          hasMore={hasMore}
                          // loader={<SkeletonLoader />}
                          // endMessage={
                          //   <div className="text-center my-2">
                          //     <p>No more items to load.</p>
                          //   </div>
                          // }
                        > */}
                        <BetDetailCard
                          showBets={showBets}
                          setShowBets={setShowBets}
                          item={item}
                          index={index}
                          getMyBetDetails={getMyBetDetails}
                        />
                        {/* </InfiniteScroll> */}
                      </div>
                    );
                  })}
                {myBets.length == 0 && !isLoading && (
                  <div className="text-center text-black">
                    <span>
                      {step === 1 && 'There are currently no betslips.'}
                      {step === 2 && 'There are currently no pending betslips.'}
                      {step === 3 && 'There are currently no settled betslips.'}
                      {step === 4 && 'There are currently no jackpot tickets.'}
                      {step === 5 &&
                        'There are currently no cancelled betslips or tickets.'}
                    </span>
                  </div>
                )}

                {isLoading && <SkeletonLoader />}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-4 2xl:col-span-3 pt-5 lg:block hidden h-full border-[#A3A3A3] border-l-[1px] pl-3 mr-3">
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

export default MyBets;
