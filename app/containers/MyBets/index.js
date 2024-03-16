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
import { useSelector } from 'react-redux';
import BetWallet from '@components/BetWallet';
import DateRangePickerCustom from '@components/FormElements/DateRangePickerCustom';
// import InfiniteScroll from 'react-infinite-scroll-component';

const TabsName = [
  { tabName: 'All', id: 1, icon: '/images/bikoicon/sports_soccer.png' },
  {
    tabName: 'Pending',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
  },
  { tabName: 'Settled', id: 3, icon: '/images/bikoicon/boxing.png' },
  // { tabName: 'Jackpot', id: 4, icon: '/images/bikoicon/rugby.png' },
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
  const selectedBet = useSelector((state) => state.bet.selectedBet);

  const getMyBetDetails = useCallback(
    async (query, newPage) => {
      setIsLoading(true);
      setPageSize(10);
      const response = await getReq(
        `/users/me/bet-slips?skip=${
          newPage ? newPage : 0
        }&take=${pageSize}${query ? query : ''}`,
      );
      if (response.status) {
        setIsLoading(false);
      }
      if (response.data.data.length > 0) {
        setMyBets(response.data.data);
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
            <>
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
                    myBets
                      .filter((item) => item.id == showBets)
                      ?.map((item, index) => {
                        return (
                          <div key={index} className="my-2">
                            <BetDetailCard
                              showBets={showBets}
                              setShowBets={setShowBets}
                              item={item}
                              index={index}
                              getMyBetDetails={getMyBetDetails}
                            />
                            {/* <div className="mt-2  overflow-auto">
                              <table className="text-black  w-full  text-14">
                                <thead className="bg-yellow h-12 rounded-t-md">
                                  <th className="w-[160px] rounded-tl-md">
                                    MATCH START TIME
                                  </th>
                                  <th className="w-[220px]">GAME</th>
                                  <th className="w-[100px]">MKT</th>
                                  <th className="w-[100px]">ODDS</th>
                                  <th className="w-[150px]">PICK</th>
                                  <th className="w-[200px]">TEAM</th>
                                  <th className="w-[100px]">STATUS</th>
                                  <th className="w-[100px]">VOID FACTOR</th>
                                  <th className="rounded-tr-md w-[100px]">
                                    VOID REASON
                                  </th>
                                </thead>
                                <tbody className="text-center text-12">
                                  {item?.bets.map((innerItem, innerIndex) => {
                                    return (
                                      <tr key={innerIndex}>
                                        <td className="w-[160px]">
                                          {moment(
                                            innerItem.event.startTime,
                                          ).format('DD-MM-yy hh:mm A')}
                                        </td>
                                        <td className="w-[220px]">
                                          {
                                            innerItem?.event?.tournament
                                              ?.category?.sport?.name
                                          }
                                          /
                                          {
                                            innerItem?.event?.tournament
                                              ?.category?.name
                                          }
                                          /{innerItem?.event?.tournament?.name}
                                        </td>
                                        <td className="w-[100px]">
                                          {innerItem.market}
                                        </td>
                                        <td className="w-[100px]">
                                          {innerItem.odds}
                                        </td>
                                        <td className="w-[150px]">
                                          {innerItem.outcome}
                                        </td>
                                        <td className="w-[200px]">
                                          <p>
                                            {innerItem?.event?.competitors[0]
                                              ?.name || 'N.A'}
                                          </p>
                                          <p>
                                            {innerItem?.event?.competitors[1]
                                              ?.name || 'N.A'}
                                          </p>
                                        </td>
                                        <td className="w-[100px]">
                                          {innerItem?.status == 'Settled'
                                            ? innerItem?.settlement?.result
                                            : innerItem?.status}
                                        </td>
                                        <td className="w-[100px]">
                                          {innerItem?.settlement?.voidFactor
                                            ? innerItem?.settlement?.voidFactor
                                            : 'N.A'}
                                        </td>
                                        <td className="w-[100px]">
                                          {innerItem?.settlement?.voidReason
                                            ? innerItem?.settlement?.voidReason
                                            : 'N.A'}
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div> */}
                            {item?.bets.map((innerItem, innerIndex) => {
                              return (
                                <div
                                  key={innerIndex}
                                  className="border-[1px] border-[#A3A3A3]  shadow-md rounded-[8px] mt-2"
                                >
                                  <div className="grid gap-5 grid-cols-12 p-3">
                                    <div className="col-span-6 2xl:col-span-4">
                                      <div className="flex justify-between items-center 2xl:gap-2 h-full">
                                        <div className="flex flex-col justify-between h-full">
                                          <div className="flex gap-2">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              MATCH START TIME
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                              {moment(
                                                innerItem.event.startTime,
                                              ).format('DD-MM-yy hh:mm A')}
                                            </p>
                                          </div>
                                          <div className="flex gap-2">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              GAME
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16 cursor-pointer">
                                              {
                                                innerItem?.event?.tournament
                                                  ?.category?.sport?.name
                                              }
                                              /
                                              {
                                                innerItem?.event?.tournament
                                                  ?.category?.name
                                              }
                                              /
                                              {
                                                innerItem?.event?.tournament
                                                  ?.name
                                              }
                                            </p>
                                          </div>
                                          <div className="flex gap-2">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              Team
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                              {innerItem.market}
                                            </p>
                                          </div>
                                        </div>
                                        <hr className=" w-[1px] min-h-[90px] h-full mr-2 md:mx-2 border-[1px]"></hr>
                                      </div>
                                    </div>
                                    <div className="col-span-6 2xl:col-span-4">
                                      <div className="flex justify-between items-center 2xl:gap-2 h-full">
                                        <div className="flex  h-full flex-col justify-between gap-2">
                                          <div className="flex gap-2">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              ODDS
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16">
                                              {innerItem.odds}
                                            </p>
                                          </div>
                                          <div className="flex gap-2 ">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              PICK
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                              {innerItem.outcome}
                                            </p>
                                          </div>
                                          <div className="flex gap-2 ">
                                            <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              MKT
                                            </p>
                                            <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                              {innerItem?.event?.competitors[0]
                                                ?.name || 'N.A'}
                                            </p>
                                          </div>
                                        </div>
                                        <hr className="w-[1px] hidden 2xl:flex min-h-[90px] h-full mr-2 md:mx-2 border-[1px]"></hr>
                                      </div>
                                    </div>
                                    <hr className="w-full col-span-12 2xl:hidden border-b-[2px]"></hr>
                                    <div className="col-span-6 2xl:col-span-4">
                                      <div className="flex flex-col justify-between gap-2 h-full">
                                        <div className="flex gap-2 ">
                                          <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                            STATUS
                                          </p>
                                          <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                            {innerItem?.status == 'Settled'
                                              ? innerItem?.settlement?.result
                                              : innerItem?.status}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 ">
                                          <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                            VOID FACTOR
                                          </p>
                                          <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                            {innerItem?.settlement?.voidFactor
                                              ? innerItem?.settlement
                                                  ?.voidFactor
                                              : 'N.A'}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 ">
                                          <p className="text-gray-900  min-w-[140px] text-12 md:text-14 xxl:text-16 font-[600]">
                                            VOID REASON
                                          </p>
                                          <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                            {innerItem?.settlement?.voidReason
                                              ? innerItem?.settlement
                                                  ?.voidReason
                                              : 'N.A'}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                </div>
              </div>{' '}
            </>
          ) : (
            <div>
              <div
                className="flex gap-2 items-center h-[50px] rounded-lg border text-primary-200 
               border-primary-200 px-4 py-2"
              >
                <button className="relative before:absolute before:left-0 before:w-full before:-bottom-2 before:bg-primary-700   before:h-[4px] before:rounded-xl font-semibold text-center w-[120px]">
                  Normal Bet
                </button>
                <button className="text-center mr-auto w-[120px] relative">
                  Jackpot
                </button>
                <DateRangePickerCustom
                  // onChange={onChange}
                  startDate={moment().startOf('month').toDate()}
                  endDate={moment().endOf('month').toDate()}
                  className="h-10 !rounded-[4px] border-[1px] !text-black text-ellipsis border-blue"
                />
              </div>
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
                        <BetDetailCard
                          showBets={showBets}
                          setShowBets={setShowBets}
                          item={item}
                          index={index}
                          getMyBetDetails={getMyBetDetails}
                        />
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
        {selectedBet.length > 0 ? <BetWallet /> : <Betslip wallet="true" />}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default MyBets;
