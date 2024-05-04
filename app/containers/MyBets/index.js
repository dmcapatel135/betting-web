import React, { useCallback, useEffect, useState } from 'react';

import {
  BetDetailCard,
  HeroSection,
  Pagination,
  SkeletonLoader,
} from '@components';
import ShareBetModal from '@components/ShareBetModal';
import { getReq } from '@utils/apiHandlers';
import moment from 'moment';
import DateRangePickerCustom from '@components/FormElements/DateRangePickerCustom';
// import { reactIcons } from '@utils/icons';
// import ResultJackpotCard from '@components/ResultJackpotCard/ResultJackpotCard';
// import JackpotPickMatchCard from '@components/JackpotPickMatchCard/JackpotPickMatchCard';

const TabsName = [
  { tabName: 'All', id: 1, icon: '/images/bikoicon/sports_soccer.png' },
  {
    tabName: 'Pending',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
  },
  { tabName: 'Settled', id: 3, icon: '/images/bikoicon/boxing.png' },
  { tabName: 'Cancelled', id: 5, icon: '/images/bikoicon/rugby.png' },
];

function MyBets() {
  const [step, setStep] = useState(1);
  const [myBets, setMyBets] = useState([]);
  const [showBets, setShowBets] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [dataCount, setDataCount] = useState();
  const [betType, setBetType] = useState('Normal Bet');
  const [queries, setQueries] = useState('');
  const [startDate, setStartDate] = useState(
    moment().startOf('month').toDate(),
  );
  const [endDate, setEndDate] = useState(moment().endOf('month').toDate());
  let pageCount = 10;

  const getMyBetDetails = useCallback(
    async (query) => {
      setIsLoading(true);
      setPageSize(10);
      const response = await getReq(
        `/users/me/bet-slips?skip=${page * pageCount}&take=${pageSize}&fromDate=${moment(
          startDate,
        )
          .startOf('date')
          .toISOString()}&toDate=${moment(endDate).endOf('date').toISOString()}${query ? query : ''}`,
      );
      if (response.status) {
        setIsLoading(false);
        setMyBets(response.data.data);
        setDataCount(response.data.count);
      }
    },
    [pageSize, page, pageCount, startDate, endDate],
  );

  useEffect(() => {
    if ((startDate, endDate)) getMyBetDetails(queries);
  }, [page, queries, startDate, endDate]); // eslint-disable-line

  useEffect(() => {
    setMyBets([]);
    setPage(0);
    let query;
    if (betType == 'Jackpot') {
      query = `&type=Jackpot${status ? `&status=${status}` : ''}`;
    } else {
      query = `&type=Normal${status ? `&status=${status}` : ''}`;
    }
    // if (startDate && endDate) {
    //   query =
    //     query +
    //     `&fromDate=${moment(startDate)
    //       .startOf('date')
    //       .toISOString()}&toDate=${moment(endDate).endOf('date').toISOString()}`;
    // }
    setQueries(query);
    // getMyBetDetails(query);
  }, [status, betType]); // eslint-disable-line

  // useEffect(() => {
  //   if (showBets) {
  //     const bets = myBets.filter((item) => item.id === showBets);
  //     setMyBets(bets);
  //   }
  // }, [myBets, showBets]);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

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

  const handleBetStatus = (innerItem) => {
    if (innerItem?.status == 'Settled') {
      if (innerItem?.settlement?.result == 'Won') {
        return 'Won';
      } else if (innerItem?.settlement?.result == 'Lost') {
        return 'Lost';
      } else {
        return 'N.A';
      }
    } else if (innerItem?.status) {
      return innerItem?.status;
    }
  };

  const handleClear = () => {
    setStartDate(moment().startOf('month').toDate());
    setEndDate(moment().endOf('month').toDate());
    setStatus('');
    setQueries('');
    setStep(1);
  };

  return (
    <div className="">
      <ShareBetModal />
      <div className="">
        <div className="">
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
                            {/* <ResultJackpotCard />
                            <JackpotPickMatchCard /> */}
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
                                  className="border border-green/50  shadow-md rounded-[8px] mt-2"
                                >
                                  <div className="flex justify-end mx-3">
                                    <span
                                      className={`${handleBetStatus(innerItem) == 'Pending' ? 'text-gray-400 font-[600] text-16' : handleBetStatus(innerItem) == 'Won' ? 'text-[#00FF00] text-24' : 'text-red-500 text-16'}  mt-2`}
                                    >
                                      {handleBetStatus(innerItem) == 'Won' ? (
                                        // reactIcons.success
                                        <div className="w-6 h-6 rounded-full bg-greencolor"></div>
                                      ) : handleBetStatus(innerItem) ==
                                        'Lost' ? (
                                        // reactIcons.closecircle
                                        <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                      ) : (
                                        handleBetStatus(innerItem)
                                      )}
                                    </span>
                                  </div>
                                  <div className="grid gap-2 grid-cols-6 md:grid-cols-12 p-3">
                                    <div className="col-span-4 md:col-span-6">
                                      <div className="flex justify-between items-center 2xl:gap-2 h-full">
                                        <div className="flex flex-col  h-full">
                                          <div className="flex gap-2">
                                            <p className="text-gray-900 w-[75px] hidden   md:w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              START TIME
                                            </p>
                                            <div className="flex items-center gap-1">
                                              <img
                                                src="/images/bikoicon/acute.png"
                                                className="w-6 h-5"
                                              />
                                              <p className="text-gray-900 font-[700] text-12 md:text-14 xxl:text-16 ">
                                                {moment(
                                                  innerItem?.event?.startTime,
                                                )
                                                  .format(
                                                    'dddd, DD MMM hh:mm A',
                                                  )
                                                  .toUpperCase()}
                                              </p>
                                            </div>
                                          </div>
                                          {/* <div className="flex gap-2">
                                            <p className="text-gray-900  w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              GAME
                                            </p>
                                            <p className="text-gray-900 flex-1 text-12 md:text-14 xxl:text-16 cursor-pointer break-all">
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
                                          </div> */}
                                          <div className="flex gap-2">
                                            <p className="text-gray-900 hidden   w-[75px]  md:w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              Team
                                            </p>
                                            <div>
                                              <div className="flex gap-16 items-center">
                                                <div className="flex-1">
                                                  <p className="text-gray-900 font-[700] text-12 md:text-14 xxl:text-16 ">
                                                    {/* {innerItem?.event
                                                  ?.competitors[0]?.name ||
                                                  'N.A'}{' '} */}
                                                    {
                                                      innerItem?.event?.competitors?.find(
                                                        (item) =>
                                                          item.qualifier ==
                                                          'Home',
                                                      ).name
                                                    }
                                                  </p>
                                                </div>
                                                <strong className="text-yellow font-[700] text-12 md:text-14 xxl:text-16">
                                                  {innerItem?.event?.homeScore
                                                    ? innerItem?.event
                                                        ?.homeScore
                                                    : ''}
                                                </strong>
                                              </div>
                                              {/* <p className="text-gray-900 text-12 md:text-14 xxl:text-16">
                                                Vs {''}
                                              </p> */}
                                              <div className="flex items-center gap-16">
                                                <div className="flex-1">
                                                  <p className="text-gray-900 font-[700] text-12 md:text-14 xxl:text-16 ">
                                                    {/* {innerItem?.event
                                                  ?.competitors[1]?.name ||
                                                  'N.A'} */}
                                                    {
                                                      innerItem?.event?.competitors?.find(
                                                        (item) =>
                                                          item.qualifier ==
                                                          'Away',
                                                      ).name
                                                    }
                                                  </p>
                                                </div>
                                                <strong className="text-yellow font-[700] text-12 md:text-14 xxl:text-16">
                                                  {innerItem?.event?.awayScore
                                                    ? innerItem?.event
                                                        ?.awayScore
                                                    : ''}
                                                </strong>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="flex w-[1px] min-h-[90px] h-full mr-2 md:mx-2 border-r border-r-green/50"></div>
                                      </div>
                                    </div>
                                    {/* <div className="w-1  inline-block border-t border-t-green/50"></div> */}
                                    <div className="col-span-2 md:col-span-6">
                                      <div className="flex justify-between items-center 2xl:gap-2 h-full">
                                        <div className="flex  flex-col justify-between ">
                                          <div className="flex gap-2">
                                            <p className="text-gray-900  w-[35px]  md:w-[132px] xl:w-[60px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              PICK
                                            </p>
                                            <p className="text-gray-900  text-12 md:text-14 xxl:text-16">
                                              {/* {innerItem.outcome}@
                                              {innerItem.odds} */}
                                              {innerItem.outcome}
                                            </p>
                                          </div>
                                          <div className="flex gap-2 ">
                                            <p className="text-gray-900    w-[35px]  md:w-[132px] xl:w-[60px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              MKT
                                            </p>
                                            <p className="text-gray-900 flex-1  text-12 md:text-14 xxl:text-16 ">
                                              {/* {innerItem?.event?.competitors[0]
                                                ?.name || 'N.A'} */}
                                              {innerItem.market}
                                            </p>
                                          </div>
                                          <div className="flex gap-2 ">
                                            <p className="text-gray-900  w-[35px]    md:w-[132px] xl:w-[60px] text-12 md:text-14 xxl:text-16 font-[600]">
                                              Result
                                            </p>
                                            <p className="text-gray-900  text-12 md:text-14 xxl:text-16 ">
                                              {innerItem?.status == 'Settled'
                                                ? innerItem?.settlement
                                                  ? innerItem?.settlement
                                                      ?.result
                                                  : 'N.A'
                                                : innerItem?.status
                                                  ? innerItem?.status
                                                  : 'N.A'}
                                            </p>
                                          </div>
                                        </div>
                                        {/* <hr className="w-[1px] hidden 2xl:flex min-h-[90px] h-full mr-2 md:mx-2 border-[1px]"></hr> */}
                                      </div>
                                    </div>
                                    {/* <hr className="w-full col-span-6 xl:col-span-12 2xl:hidden "></hr> */}
                                    {/* <div className="col-span-6 xl:col-span-12 2xl:col-span-4">
                                      <div className="flex flex-col justify-between 2xl:gap-2 h-full">
                                        <div className="flex gap-2">
                                          <p className="text-gray-900  w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
                                            STATUS
                                          </p>
                                          <p className="text-gray-900 text-12 md:text-14 xxl:text-16 ">
                                            {innerItem?.status == 'Settled'
                                              ? innerItem?.settlement?.result
                                              : innerItem?.status}
                                          </p>
                                        </div>
                                        <div className="flex gap-2 ">
                                          <p className="text-gray-900  w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
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
                                          <p className="text-gray-900  w-[132px] text-12 md:text-14 xxl:text-16 font-[600]">
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
                                    </div> */}
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
                className="flex  justify-between flex-wrap items-center gap-6 rounded-lg border text-primary-200 
               border-primary-200 px-2 md:px-4 py-2"
              >
                <div>
                  <button
                    onClick={() => {
                      setStep(1);
                      setBetType('Normal Bet');
                    }}
                    className={`relative before:absolute before:left-0 before:w-full before:-bottom-2 ${betType == 'Normal Bet' ? 'before:bg-primary-700' : 'before:bg-white'}   before:h-[4px] before:rounded-xl font-semibold text-center w-[120px]`}
                  >
                    Normal Bet
                  </button>
                  <button
                    onClick={() => {
                      setStep(1);
                      setBetType('Jackpot');
                    }}
                    className={`relative before:absolute before:left-0 before:w-full before:-bottom-2 ${betType == 'Jackpot' ? 'before:bg-primary-700' : 'before:bg-white'}   before:h-[4px] before:rounded-xl font-semibold text-center w-[120px]`}
                  >
                    Jackpot
                  </button>
                </div>
                <div className="flex items-center">
                  <DateRangePickerCustom
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    className="h-10 !rounded-[4px] border-[1px] !text-black text-ellipsis border-blue"
                  />
                  <button
                    onClick={handleClear}
                    type="reset"
                    className="btn border   text-black ml-2 border-primary-700 h-[33px] !rounded-md hover:bg-primary-700"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="border  mt-5 border-blue flex bg-white w-full px-3 rounded-lg cursor-pointer  md:h-12 xxl:h-16">
                {TabsName.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`${
                        step === item.id
                          ? 'bg-gradient-color-1 text-white'
                          : 'bg-white text-black'
                      } px-1 md:px-0 xl:px-3 xl:mx-3 my-1 w-fit xl:w-28  rounded-lg`}
                      onClick={() => {
                        setStep(item.id);
                        setStatus(item.tabName == 'All' ? '' : item.tabName);
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
                <div className="border-t">
                  <Pagination
                    page={page}
                    setPage={setPage}
                    dataCount={dataCount}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBets;
