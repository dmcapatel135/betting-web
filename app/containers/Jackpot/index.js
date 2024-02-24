// import { fetchBetDetailsAction } from '@actions';
import {
  Betslip,
  CompanyContact,
  CustomerCareContact,
  JackpotCard,
  // JackpotDailyCard,
  JackpotDetailCard,
  Loader,
  // SkeletonLoader,
  TalkToUs,
} from '@components';
import BetWallet from '@components/BetWallet';
import JackpotResultCard from '@components/JackpotResultCard';
import { getReq } from '@utils/apiHandlers';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
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

function Jackpot() {
  const [step, setStep] = useState(TabsName[0].id);
  const [openCard, setOpenCard] = useState(null);
  const [openResult, setOpenResult] = useState(false);
  const [jackpots, setJackpots] = useState([]);
  const [jackpotFixtures, setJackpotFixtures] = useState([]);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [stakeValue, setStakeValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [jackpotEvent, setJackpotEvent] = useState();
  // const [bets, setBets] = useState([]);

  // const dispatch = useDispatch();

  const handleGetJackpotFixtures = async (jackpotEventId) => {
    setIsLoading(true);
    setPageSize(10);
    const response = await getReq(
      `/jackpot-events/${jackpotEventId}/fixtures?skip=${page}&take=${pageSize}`,
    );
    console.log('-------jack fixtures ', jackpotEvent);
    setIsLoading(false);
    setJackpotFixtures(response.data);
  };

  const handleGetJackpots = async () => {
    const response = await getReq('/jackpot-events/active');
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

  // const handleClearAllBet = () => {
  //   dispatch(fetchBetDetailsAction([]));
  //   // setTotalSport([]);
  //   // setTotalOdd(1);
  // };

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-12 md:col-span-8 pt-5 mb-5">
        <div className="px-5">
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
                    <span className="px-2 text-12 md:text-14  xxl:text-16">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {step === 1 && (
          <div className="px-5">
            <InfiniteScroll
              dataLength={jackpots.length}
              next={fetchMoreData}
              hasMore={hasMore}
              // loader={<SkeletonLoader />}
              endMessage={<p className="text-black">No more items to load.</p>}
            >
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
                        setJackpotEvent={setJackpotEvent}
                      />
                      <div>
                        {openCard == index && (
                          <>
                            <div className="flex text-black justify-end mr-10 mt-5">
                              <p className="mr-4 text-14 font-[600]">Home</p>
                              <p className="ml-8 mr-12 text-14 font-[600]">
                                Draw
                              </p>
                              <p className="text-14  font-[600]">Away</p>
                            </div>
                            {jackpotFixtures.map((fixtures) => {
                              // setJackpotEvent(fixtures);
                              return (
                                <>
                                  <div className="mb-3">
                                    <JackpotDetailCard fixtures={fixtures} />
                                  </div>
                                </>
                              );
                            })}
                            {isLoading && <Loader />}
                            {jackpotFixtures.length == 0 && !isLoading && (
                              <div className="flex justify-center">
                                <span className="text-black font-12">
                                  There are no active Weekly jackpots at the
                                  moment.
                                </span>
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
          </div>
        )}
        {step === 2 && (
          <div className="px-5 my-5">
            {/* <div className="border-[1px] border-blue rounded-md bg-gray-800 text-center justify-center py-3">
              <h1 className="text-black text-20 font-[600]">
                WEEKLY JACKPOT 21 JAN 2024
              </h1>
              <p className="text-12 text-black font-[500] py-2">17 GAMES</p>
              <h1 className="text-blue text-20 font-[600]">TSH 1,000</h1>
            </div> */}
            <JackpotResultCard
              setOpenResult={setOpenResult}
              openResult={openResult}
            />
            {openResult && (
              <div className="my-2">
                <div className="bg-white border-[1px] rounded-md border-lightgray border-md px-3">
                  <div className="flex justify-between py-2">
                    <div className=" flex-1 text-black">
                      <p className="text-10 md:text-12 mb-5">
                        11:15 pm Wed 06/12
                      </p>
                      <span className="text-10 mt-20 text-gray-900">
                        Football/England/Premier League
                      </span>
                    </div>
                    <div className="flex-1 text-12 md:text-14 font-[500] text-center text-black">
                      <p>Manchester United </p>
                      <p>Chelsa FC</p>
                    </div>
                    <div className="flex-1  mr-5 flex justify-end items-center">
                      <p className="text-black text-10 md:text-12 font-[600]">
                        Frosinone Calcio- (3:1)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {step === 3 && (
          <div className="px-5 my-5">
            <div className="border-[1px] border-blue rounded-md h-16 md:h-28 bg-gray-800 text-center justify-center py-3">
              <h1 className="text-black text-12 md:text-20 font-[600]">
                You&apos;ll be notified of any changes in the rules
              </h1>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 md:block hidden pt-5 border-l-[1px] px-3 border-[#A3A3A3]">
        {selectedBet.length > 0 ? (
          <BetWallet stakeValue={stakeValue} />
        ) : (
          <Betslip />
        )}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default Jackpot;
