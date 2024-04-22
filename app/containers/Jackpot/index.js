// import { fetchBetDetailsAction } from '@actions';
import { fetchJackpotDetailsAction } from '@actions';
import {
  JackpotCard,
  // JackpotDailyCard,
  JackpotDetailCard,
  Loader,
  // SkeletonLoader,
} from '@components';
import JackpotResultCard from '@components/JackpotResultCard';
import { CircularProgress } from '@mui/material';
import { getReq, isLoggedIn, postReq } from '@utils/apiHandlers';
import { formatNumber } from '@utils/constants';
import React, { useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jackpotRules } from './constants';
const TabsName = [
  {
    id: 1,
    name: 'All Jackpot',
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
  {
    id: 2,
    name: 'Results',
    icon: '/images/bikoicon/sports_and_outdoors.png',
    active_icon: '/images/bikoicon/basketballwhite.png',
  },
  {
    id: 3,
    name: 'Rules',
    icon: '/images/bikoicon/boxing.png',
    active_icon: '/images/bikoicon/boxingwhite.png',
  },
];
const Draw = [{ name: 'Home' }, { name: 'Draw' }, { name: 'Away' }];

function Jackpot() {
  const [step, setStep] = useState(TabsName[0].id);
  const [openCard, setOpenCard] = useState(null);
  const [openResult, setOpenResult] = useState(false);
  const [jackpots, setJackpots] = useState([]);
  const [jackpotFixtures, setJackpotFixtures] = useState([]);
  const selectedJackpot = useSelector((state) => state.jackpot.selectedJackpot);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [stakeValue, setStakeValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [ticket, setTicket] = useState(0);
  const [finishedJackpot, setFinishedJackpot] = useState([]);
  const [jackpotLoading, setJackpotLoading] = useState(false);
  const [jackpotData, setJackpotData] = useState([]);
  const [placeJackpotLoading, setPlaceJackpotLoading] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleGetJackpotFixtures = useCallback(
    async (jackpotEventId) => {
      setIsLoading(true);
      setPageSize(10);
      const response = await getReq(
        `/jackpot-events/${jackpotEventId}/fixtures?skip=${page}&take=${pageSize}`,
      );
      setIsLoading(false);
      setJackpotFixtures([...response.data]);
    },
    [pageSize, page],
  );

  useEffect(() => {
    if (openCard) {
      const interval = setInterval(() => {
        handleGetJackpotFixtures(openCard);
      }, 5000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [handleGetJackpotFixtures, openCard]);

  const handleGetJackpots = async () => {
    setJackpotLoading(true);
    const response = await getReq('/jackpot-events/active');
    setJackpotLoading(false);
    setHasMore(true);
    setJackpots(response.data.data);
  };

  useEffect(() => {
    handleGetJackpots();
  }, []);

  const fetchMoreData = () => {
    setPage(page + 1);
    handleGetJackpots();
  };

  const getFinishedJackpot = async () => {
    const response = await getReq('/jackpot-events/finished');
    setFinishedJackpot(response.data.data);
  };

  useEffect(() => {
    getFinishedJackpot();
  }, []);

  // const autoPick = () => {
  //   jackpotFixtures.forEach((fixtures) => {
  //     console.log('-----jackpot ---item ', fixtures);
  //     const randomIndex = Math.floor(
  //       Math.random() * fixtures.market.outcomes.length,
  //     );
  //     const randomOutcome = fixtures.market.outcomes[randomIndex];

  //     addToBetSlip(
  //       fixtures.mappedEventId,
  //       randomOutcome,
  //       fixtures.market,
  //       fixtures.mappedEvent.competitors[0].shortName +
  //         '-' +
  //         fixtures.mappedEvent.competitors[1].shortName,
  //     );
  //   });
  // };

  // const addToBetSlip = (eventId, bet, betDetails, eventNames) => {
  //   setBets((prev) => {
  //     const index = prev.findIndex((item) => item.eventId == parseInt(eventId));
  //     if (index !== -1) {
  //       // If eventId already exists, update bet and betDetails
  //       const updatedBets = [...prev];
  //       updatedBets[index] = {
  //         ...updatedBets[index],
  //         // sportId: sId,
  //         bet: bet,
  //         betDetails: betDetails,
  //         eventNames: eventNames,
  //       };
  //       return updatedBets;
  //     } else {
  //       return [
  //         ...prev,
  //         {
  //           eventId: eventId,
  //           // sportId: sId,
  //           bet: bet,
  //           betDetails: betDetails,
  //           eventNames: eventNames,
  //         },
  //       ];
  //     }
  //   });
  // };

  // useEffect(() => {
  //   setBets(selectedBet);
  // }, [selectedBet]);

  // useEffect(() => {
  //   if (bets.length > 0) {
  //     dispatch(fetchBetDetailsAction(bets));
  //   }
  // }, [bets, dispatch]);

  // useEffect(() => {
  //   if (openCard != null) {
  //     dispatch(fetchJackpotDetailsAction([]));
  //   }
  // }, [openCard, dispatch]);

  const handleClearAllBet = () => {
    dispatch(fetchJackpotDetailsAction([]));
  };

  function checkData(jackpot, selectJackpot) {
    return jackpot.every((obj1) =>
      selectJackpot.some((obj2) => obj1.mappedEventId == obj2.eventId),
    );
  }

  useEffect(() => {
    setJackpotData([]);
    if (checkData(jackpotFixtures, selectedJackpot)) {
      const counts = {};
      // Count the occurrences of each eventId
      selectedJackpot.forEach((item) => {
        const eventId = item.eventId;
        counts[eventId] = (counts[eventId] || 0) + 1;
      });

      // Store the counts in a new array
      const result = Object.entries(counts).map(([eventId, count]) => ({
        eventId,
        count,
      }));

      const tickets = result.reduce((accumulator, currentValue) => {
        return accumulator * currentValue.count;
      }, 1);

      setTicket(tickets);
      selectedJackpot.forEach((item) => {
        setJackpotData((prev) => [
          ...prev,
          {
            eventId: item.eventId,
            outcomeId: item.bet.id,
            odds: item.bet.odds,
          },
        ]);
      });
    } else {
      setTicket(0);
    }
  }, [selectedJackpot, jackpotFixtures]);

  const handleBuyTicket = async (jackpotEventId) => {
    let channel;
    if (window.matchMedia('(max-width: 575px)').matches) {
      channel = 'Mobile';
    } else {
      channel = 'Website';
    }
    if (isLoggedIn()) {
      setPlaceJackpotLoading(true);
      const data = {
        jackpotEventId: jackpotEventId,
        acceptOddsChange: true,
        bets: jackpotData,
        channel: channel,
      };

      const response = await postReq('/users/me/bet-slips/jackpot', data);
      setPlaceJackpotLoading(false);
      if (response.status) {
        dispatch(fetchJackpotDetailsAction([]));
        setOpenCard(null);
        toast.success('Congrats ! Jackpot bet place successfully');
      } else if (response.error) {
        toast.error(response.error.message);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="mb-5">
      <div className="">
        <div className="border-[1px] border-bluewhale px-5 md:px-0 flex  bg-white w-full rounded-lg cursor-pointer  md:h-14 xxl:h-16">
          {TabsName?.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  step === item.id
                    ? 'bg-gradient-color-1 text-white'
                    : 'bg-white text-black'
                } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-full flex-1 flext justify-center rounded-md md:rounded-lg`}
                onClick={() => {
                  setStep(item.id);
                }}
              >
                <div className="flex h-8 md:h-12 justify-center items-center">
                  {/* <img
                      src={step === item.id ? item.active_icon : item.icon}
                      alt="profile_icon"
                      className="w-6 h-6"
                    /> */}
                  <span className="px-2 text-12 font-medium md:text-14 2xl:text-16">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {step === 1 && (
        <div className="">
          <InfiniteScroll
            dataLength={jackpots.length}
            next={fetchMoreData}
            hasMore={hasMore}
            // loader={<SkeletonLoader />}
            endMessage={<p className="text-black">No more items to load.</p>}
          >
            {jackpots.length == 0 && !isLoading && (
              <div>
                <span>There is no jackpots available</span>
              </div>
            )}
            {jackpots.length > 0 &&
              jackpots.map((item, index) => {
                return (
                  <div key={index} className="my-3">
                    <JackpotCard
                      item={item}
                      index={index}
                      handleGetJackpotFixtures={handleGetJackpotFixtures}
                      setOpenCard={setOpenCard}
                      setStakeValue={setStakeValue}
                      // setJackpotEvent={setJackpotEvent}
                    />
                    <div>
                      {openCard == item.id && (
                        <>
                          {jackpotFixtures.length > 0 && (
                            <div className="flex text-black justify-center lg:justify-end lg:mr-4 xl:mr-8 mt-5 ">
                              <div className="gap-3 xl:gap-5 flex justify-center lg:justify-end lg:min-w-[256px]">
                                {Draw.map((item, index) => (
                                  <p
                                    key={index}
                                    className="text-14 text-center w-[48px] font-[600]"
                                  >
                                    {item.name}
                                  </p>
                                ))}
                              </div>
                            </div>
                          )}
                          {jackpotFixtures.map((fixtures) => {
                            // setJackpotEvent(fixtures);
                            return (
                              <>
                                <div className="mb-3">
                                  <JackpotDetailCard
                                    jackpotId={item.id}
                                    fixtures={fixtures}
                                  />
                                </div>
                              </>
                            );
                          })}
                          {isLoading && <Loader />}
                          {jackpotFixtures.length == 0 && !isLoading && (
                            <div className="flex justify-center my-5">
                              <span className="text-black font-12">
                                There are no active Weekly jackpots at the
                                moment.
                              </span>
                            </div>
                          )}
                          {jackpotFixtures.length > 0 && (
                            <div>
                              <div className="flex flex-col gap-2 text-black">
                                <div className="flex justify-between">
                                  <p className="font-semibold">Price :</p>
                                  <p className="font-semibold">
                                    TSH {stakeValue}
                                  </p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="font-semibold">
                                    Total Tickets :
                                  </p>
                                  <p className="font-semibold">{ticket}</p>
                                </div>
                                <div className="flex justify-between">
                                  <p className="font-semibold text-lg">
                                    Total Price :
                                  </p>
                                  <p className="font-bold">
                                    TSH {formatNumber(ticket * stakeValue)}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <button
                                  disabled={!ticket || placeJackpotLoading}
                                  className={`w-full py-2 my-2 h-[42px] font-semibold rounded-lg ${
                                    ticket && !placeJackpotLoading
                                      ? 'bg-yellow text-white'
                                      : 'bg-lightestgray text-black'
                                  }`}
                                  onClick={() => handleBuyTicket(item.id)}
                                >
                                  {placeJackpotLoading && (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  )}
                                  BUY TICKET
                                </button>
                              </div>
                              <div className="flex justify-end">
                                <p
                                  onClick={handleClearAllBet}
                                  className="text-black underline cursor-pointer hover:text-yellow"
                                >
                                  Clear All
                                </p>
                              </div>
                            </div>
                          )}
                          {/* <div className="flex h-16 rounded-sm bg-lightestgray px-5 justify-between items-center">
                              <div className="flex">
                                <button
                                  onClick={handleClearAllBet}
                                  className="w-24  h-8 text-12 font-[500] rounded-[4px]  bg-blue "
                                >
                                  REMOVE ALL
                                </button>
                                <button
                                  onClick={autoPick}
                                  className="w-20 mx-2  h-8 text-12 font-[500] text-black rounded-[4px] border-[1px] border-blue "
                                >
                                  AUTO PICK
                                </button>
                              </div>
                              <div className="flex text-black">
                                <h1 className="text-16 font-[600] ">Stake</h1>
                                <span className="mx-1">{stakeValue}</span>
                              </div>
                              <div>
                                <button className="w-16 mx-2  h-8 text-12 font-[500] rounded-[4px]  bg-yellow ">
                                  BET NOW
                                </button>
                              </div>
                            </div> */}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
          </InfiniteScroll>
          {jackpotLoading && (
            <div>
              <Loader />
            </div>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="my-5">
          {/* <div className="border-[1px] border-blue rounded-md bg-gray-800 text-center justify-center py-3">
              <h1 className="text-black text-20 font-[600]">
                WEEKLY JACKPOT 21 JAN 2024
              </h1>
              <p className="text-12 text-black font-[500] py-2">17 GAMES</p>
              <h1 className="text-blue text-20 font-[600]">TSH 1,000</h1>
            </div> */}
          {finishedJackpot.map((item, index) => {
            return (
              <div key={item.id}>
                <JackpotResultCard
                  index={index}
                  item={item}
                  setOpenResult={setOpenResult}
                  openResult={openResult}
                />
                {openResult == index && (
                  <>
                    <div className="flex text-black justify-between text-12 py-2 px-3">
                      <div className=" ">Match</div>
                      <div className=" ">Result</div>
                    </div>
                    <div className="flex justify-between py-2 bg-white border-[1px] rounded-md border-lightgray border-md px-3 mb-2">
                      <div className=" flex-1 text-black">
                        <div className="text-12 md:text-14 font-[500] text-black">
                          <span>Manchester United </span>
                          <span>Chelsa FC</span>
                        </div>
                        <div className="text-10 md:text-12 flex flex-col xl2:flex-row md:gap-1 leading-snug">
                          <span className="">11:15 pm Wed 06/12</span>
                          <span className="">
                            Football/England/Premier League
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end items-center">
                        <p className="text-black text-10 md:text-12 font-[600]">
                          Frosinone Calcio- (3:1)
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
          {finishedJackpot.length == 0 && (
            <div className="text-center mt-5">
              <p className="text-black text-14">
                There is no jackpot results is available
              </p>
            </div>
          )}
        </div>
      )}
      {step === 3 && (
        <div className="my-5">
          {/* <div className="border-[1px] border-blue rounded-md  bg-gray-800 px-5 py-3"> */}
          <div>
            {jackpotRules.map((item, index) => {
              return (
                <div key={index} className="text-black my-2 font-roboto">
                  <h1 className="my-1 text-18 font-[700]">{item.rule}</h1>
                  <p className="my-2 text-14">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
        // </div>
      )}
    </div>
  );
}

export default Jackpot;
