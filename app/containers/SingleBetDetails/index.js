import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import {
  //   BetDetailsContext,
  BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  Loading,
  TalkToUs,
} from '@components';
import { reactIcons } from '@utils/icons';
import ReactSimplyCarousel from 'react-simply-carousel';
import { getReq } from '@utils/apiHandlers';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';

const TabsName = [
  { id: 1, title: 'Head to head' },
  { id: 2, title: 'Standing' },
  { id: 3, title: 'Linups' },
];

function SigleBetDetails() {
  const { eventId, eventNames, sportId } = useParams();
  const [step, setStep] = useState(1);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [allMarketData, setAllMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [marketDataOdds, setMarketDataOdds] = useState();
  const [mergedData, setMergedData] = useState([]);
  const [eventName, setEventName] = useState();
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [bets, setBets] = useState([]);

  const dispatch = useDispatch();

  const getAllMarketData = useCallback(async () => {
    setIsLoading(true);
    const response = await getReq(`/events/${eventId}/markets`);
    setIsLoading(false);
    setAllMarketData(response.data);
  }, [eventId]);

  const getEventName = useCallback(async () => {
    const response = await getReq(`/events/${eventId}`);
    setEventName(
      response?.data?.season?.name || response?.data?.tournament?.name,
    );
  }, [eventId]);

  useEffect(() => {
    getAllMarketData();
    getEventName();
  }, [getAllMarketData, eventId, getEventName]);

  useEffect(() => {
    const eventSource = new EventSource(`${API_URL}/events/${eventId}/odds`, {
      withCredentials: true,
    });

    const handleEventSourceMessage = (event) => {
      updateState(JSON.parse(event?.data));
    };

    eventSource.addEventListener('message', handleEventSourceMessage);

    return () => {
      eventSource.removeEventListener('message', handleEventSourceMessage);
      eventSource.close();
    };
  }, [eventId]);

  useEffect(() => {
    if (allMarketData.length > 0 && marketDataOdds) {
      const allMarkets = _.keyBy(allMarketData, 'id');
      const markets = [];
      for (const oddsMarket of marketDataOdds.odds.markets) {
        const market = allMarkets[oddsMarket.id];
        if (market) {
          const allOutcomes = _.keyBy(market.outcomes, 'id');
          markets.push({
            ...market,
            outcomes: _.compact(
              oddsMarket.outcomes.map((outcome) => {
                if (allOutcomes[outcome.id]) {
                  return {
                    ...allOutcomes[outcome.id],
                    odds: outcome.odds,
                    active: outcome.active,
                    selected: false,
                  };
                }
              }),
            ),
          });
        }
      }
      setMergedData(markets);
    }
  }, [allMarketData, marketDataOdds]);

  const updateState = (newObject) => {
    setMarketDataOdds((prevState) => {
      return { ...prevState, ...newObject };
    });
  };

  //   setMergedData(updatedData);
  //   // dispatch(fetchBetDetailsAction(updatedBets)); // Dispatch the action
  // };

  // const handleClearAllBet = () => {
  //   dispatch(fetchBetDetailsAction([]));

  //   const updatedData = mergedData.map((item) => ({
  //     ...item,
  //     outcomes: item.outcomes.map((outcome) => ({
  //       ...outcome,
  //       selected: false,
  //     })),
  //   }));

  //   setMergedData(updatedData);
  // };

  // useEffect(() => {
  //   if (selectedBet.length > 0) {
  //     dispatch(fetchBetDetailsAction(selectedBet)); // Dispatch the action
  //   }
  // }, [selectedBet, dispatch]);

  const addToBetSlip = (eventId, bet, betDetails) => {
    console.log('------------eventId ');
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId == parseInt(eventId));
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
          sportId: sportId,
          bet: bet,
          betDetails: betDetails,
          eventNames: eventNames,
        };
        return updatedBets;
      } else {
        return [
          ...prev,
          {
            eventId: eventId,
            sportId: sportId,
            bet: bet,
            betDetails: betDetails,
            eventNames: eventNames,
          },
        ];
      }
    });
  };

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  useEffect(() => {
    console.log('------bets', bets);
    if (bets.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
    }
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeId) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == parseInt(eventId) &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeId,
    );

    if (bet) return true;
    else return false;
  };

  return (
    // <BetDetailsContext.Provider value={{ selectedBet }}>
    <div className="grid grid-cols-12">
      <div className="col-span-12 md:col-span-8">
        <div className="md:p-5 p-2">
          <div className="h-fit text-black w-full bg-[#b9e6ea]">
            <div className="flex justify-center">
              <span className="text-12 text-gray-900">19 Jan 19:30</span>
            </div>
            <div className="flex px-3 justify-between items-center mb-1">
              <div className="flex">
                <img
                  src="/images/bikoicon/cape.png"
                  className="w-10 h-8 mr-1"
                />
                <span className="text-14 text-black">Cape Verde</span>
              </div>
              <div className="flex">
                <span className="text-14 text-black">Mozambique</span>
                <img
                  src="/images/bikoicon/mozambique.png"
                  className="w-10 h-8 ml-1"
                />
              </div>
            </div>
            <div className="flex border-t-[1px] border-b-[1px] border-lightgray">
              {TabsName.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      step === item.id
                        ? 'border-b-[2px] border-[#0c3c5a] text-gray-900'
                        : ''
                    } px-1 md:px-0 xl:px-3 mx-3  w-fit md:w-56`}
                    onClick={() => setStep(item.id)}
                  >
                    <div className="flex  h-8  md:justify-center items-center">
                      <span className="px-2 text-12 font-[400]  xxl:text-12">
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex">
              <div className="flex-1 bg-[#5c8301]">
                <ReactSimplyCarousel
                  activeSlideIndex={activeSlideIndex}
                  onRequestChange={setActiveSlideIndex}
                  itemsToShow={1}
                  itemsToScroll={1}
                  autoplay={true}
                  containerProps={{
                    style: {
                      width: '100%',
                      justifyContent: 'space-between',
                      userSelect: 'none',
                      // marginLeft: '17px',
                    },
                  }}
                  // forwardBtnProps={{
                  //   //here you can also pass className, or any other button element attributes
                  //   style: {
                  //     alignSelf: 'center',
                  //     background: 'black',
                  //     border: 'none',
                  //     borderRadius: '50%',
                  //     color: 'white',
                  //     cursor: 'pointer',
                  //     fontSize: '20px',
                  //     height: 30,
                  //     lineHeight: 1,
                  //     textAlign: 'center',
                  //     width: 30,
                  //     marginLeft: 30,
                  //   },
                  //   children: <span>{'>'}</span>,
                  // }}
                  // backwardBtnProps={{
                  //   //here you can also pass className, or any other button element attributes
                  //   style: {
                  //     alignSelf: 'center',
                  //     background: 'black',
                  //     border: 'none',
                  //     borderRadius: '50%',
                  //     color: 'white',
                  //     cursor: 'pointer',
                  //     fontSize: '20px',
                  //     height: 30,
                  //     lineHeight: 1,
                  //     textAlign: 'center',
                  //     width: 30,
                  //     marginRight: 30,
                  //   },
                  //   children: <span>{'<'}</span>,
                  // }}
                  speed={400}
                  easing="linear"
                >
                  <div className="mx-10 w-[300px] h-48  bg-[#b9e6ea] px-2">
                    <div className="">
                      <div className="text-center">
                        <p className="text-gray-900 text-12">WIN PROBABILITY</p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-4 border-[#00003c]">
                          <h1 className="text-16 text-[#00003c]">44 %</h1>
                          <span className="text-12 text-[#00003c]">CPV</span>
                        </div>
                        <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                          <h1 className="text-16 text-lightgray">32 %</h1>
                          <span className="text-12 text-lightgray">DRAW</span>
                        </div>
                        <div className="w-[24%] border-b-4 border-red-600">
                          <h1 className="text-16 text-red-600">24 %</h1>
                          <span className="text-12 text-red-600">MOZ</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-center">
                        <p className="text-gray-900 text-12">
                          PREVIOUS MEETINGS
                        </p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-2 border-[#00003c]">
                          <h1>2</h1>
                        </div>
                        <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                          <h1>1</h1>
                        </div>
                        <div className="w-[24%] border-b-2 border-red-600">
                          <h1>1</h1>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            src="/images/bikoicon/cape.png"
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-gray-900 text-12">WINS</span>
                        </div>
                        <div>
                          <span className="text-gray-900 text-12">DRAW</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 text-12">WINS</span>
                          <img
                            src="/images/bikoicon/mozambique.png"
                            className="w-4 h-4 ml-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ReactSimplyCarousel>
                {/* <div className="mx-10 h-48  bg-[#b9e6ea] px-2">
                  <div className="">
                    <div className="text-center">
                      <p className="text-gray-900 text-12">WIN PROBABILITY</p>
                    </div>
                    <div className="flex">
                      <div className="w-[44%] border-b-4 border-[#00003c]">
                        <h1 className="text-16 text-[#00003c]">44 %</h1>
                        <span className="text-12 text-[#00003c]">CPV</span>
                      </div>
                      <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                        <h1 className="text-16 text-lightgray">32 %</h1>
                        <span className="text-12 text-lightgray">DRAW</span>
                      </div>
                      <div className="w-[24%] border-b-4 border-red-600">
                        <h1 className="text-16 text-red-600">24 %</h1>
                        <span className="text-12 text-red-600">MOZ</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="text-center">
                      <p className="text-gray-900 text-12">PREVIOUS MEETINGS</p>
                    </div>
                    <div className="flex">
                      <div className="w-[44%] border-b-2 border-[#00003c]">
                        <h1>2</h1>
                      </div>
                      <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                        <h1>1</h1>
                      </div>
                      <div className="w-[24%] border-b-2 border-red-600">
                        <h1>1</h1>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <img
                          src="/images/bikoicon/cape.png"
                          className="w-4 h-4 mr-1"
                        />
                        <span className="text-gray-900 text-12">WINS</span>
                      </div>
                      <div>
                        <span className="text-gray-900 text-12">DRAW</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-900 text-12">WINS</span>
                        <img
                          src="/images/bikoicon/mozambique.png"
                          className="w-4 h-4 ml-1"
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {step === 1 && (
                <div className="flex-1">
                  <div className="px-3">
                    <div className="flex items-center justify-end border-b-[1px] border-lightgray">
                      <span className="text-14 cursor-pointer text-lightgray">
                        {reactIcons.arrowleft}
                      </span>
                      <span className="text-12">1/3</span>
                      <span className="text-14 text-lightgray cursor-pointer">
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  </div>
                  <div className="m-5">
                    <div className="">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">WIN PROBABILITY</p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-4 border-[#00003c]">
                          <h1>44 %</h1>
                          <span className="text-12">CPV</span>
                        </div>
                        <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                          <h1>32 %</h1>
                          <span className="text-12">DRAW</span>
                        </div>
                        <div className="w-[24%] border-b-4 border-red-600">
                          <h1>24 %</h1>
                          <span className="text-12">MOZ</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">
                          PREVIOUS MEETINGS
                        </p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-2 border-[#00003c]">
                          <h1>2</h1>
                        </div>
                        <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                          <h1>1</h1>
                        </div>
                        <div className="w-[24%] border-b-2 border-red-600">
                          <h1>1</h1>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            src="/images/bikoicon/cape.png"
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-gray-900 text-12">WINS</span>
                        </div>
                        <div>
                          <span className="text-gray-900 text-12">DRAW</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 text-12">WINS</span>
                          <img
                            src="/images/bikoicon/mozambique.png"
                            className="w-4 h-4 ml-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className="bg-yellow py-1 rounded-md mt-5 px-3">
              <h1 className="text-white text-14 font-[600]">
                {eventName} - ALL MARKETS
              </h1>
            </div>
          </div>
          <div>
            {isLoading && (
              <div>
                <Loading />
              </div>
            )}
            {mergedData?.length > 0 &&
              mergedData?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="my-3">
                      <div className="text-black">
                        <h1 className="text-14 font-[500] py-2">{item.name}</h1>
                      </div>
                      <div className="grid grid-cols-12">
                        {item.outcomes.map((innerItem, innerIndex) => {
                          return (
                            <div
                              key={innerIndex}
                              className={`flex mb-2 ${
                                item.outcomes.length % 2 === 0
                                  ? 'col-span-6'
                                  : 'col-span-4'
                              }`}
                            >
                              <div className="flex-1 mr-2">
                                <button
                                  disabled={innerItem.active ? false : true}
                                  onClick={() =>
                                    addToBetSlip(eventId, innerItem, item)
                                  }
                                  className={`${
                                    selectBet(
                                      eventId,
                                      item.id,
                                      innerItem.id,
                                      eventNames,
                                    )
                                      ? 'bg-green text-white'
                                      : ''
                                  } bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                                >
                                  <span className="text-center font-[700] flex-1">
                                    {innerItem.name}
                                  </span>
                                  <span className="text-[700]">
                                    {innerItem.active ? (
                                      innerItem.odds
                                    ) : (
                                      <span>{reactIcons.lock}</span>
                                    )}
                                  </span>
                                </button>
                              </div>
                              {/* <div className="flex-1 mr-2">
                              <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                                <span className="text-center font-[700] flex-1">
                                  Draw
                                </span>
                                <span className="font-[700]">2.09</span>
                              </button>
                            </div>
                            <div className="flex-1 mr-2">
                              <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                                <span className="text-center font-[700] flex-1">
                                  Mozambique
                                </span>
                                <span className="font-[700]">2.09</span>
                              </button>
                            </div> */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <div className="my-3">
                      <div className="text-black">
                        <h1 className="text-14 font-[500] py-2">
                          DOUBLE CHANCE
                        </h1>
                      </div>
                      <div className="flex">
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Cape Varde
                            </span>
                            <span className="font-[700]">6.53</span>
                          </button>
                        </div>
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Draw
                            </span>
                            <span className="font-[700]">2.09</span>
                          </button>
                        </div>
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Mozambique
                            </span>
                            <span className="font-[700]">2.09</span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="my-3">
                      <div className="text-black">
                        <h1 className="text-14 font-[500] py-2">DRAW NO BET</h1>
                      </div>
                      <div className="flex">
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] font-roboto flex-1">
                              Cape Varde
                            </span>
                            <span className="font-[700]">6.53</span>
                          </button>
                        </div>
                
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-roboto flex-1 font-[700]">
                              Mozambique
                            </span>
                            <span className="font-[700] font-roboto">2.09</span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                );
              })}
            {allMarketData?.length === 0 && (
              <div className="text-center mt-5 text-black">
                <span>No markets found</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4 pt-3 md:block hidden border-l-[1px] px-3 border-gray-700">
        {/* <RightSideSection /> */}
        {bets?.length > 0 ? (
          <BetWallet
            selectedBet={selectedBet}
            // handleRemoveBet={handleRemoveBet}
            // setSelectedBet={setSelectedBet}
            // handleClearAllBet={handleClearAllBet}
          />
        ) : (
          <Betslip
            selectedBet={selectedBet}
            // handleRemoveBet={handleRemoveBet}
            // handleClearAllBet={handleClearAllBet}
          />
        )}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
    // </BetDetailsContext.Provider>
  );
}

export default SigleBetDetails;
