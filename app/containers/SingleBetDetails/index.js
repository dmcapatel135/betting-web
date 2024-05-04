import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from '@components';
import { reactIcons } from '@utils/icons';

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';
import axios from 'axios';
import WidgetChart from '@components/WidgetChart';
import moment from 'moment';
import { toast } from 'react-toastify';
// import WidgetStatisticsChart from '@components/WidgetStatisticsChart';

function SigleBetDetails() {
  const { eventId, sId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [mergedData, setMergedData] = useState([]);
  const [eventName, setEventName] = useState();
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [bets, setBets] = useState([]);
  const [eventData, setEvenData] = useState();
  const [loadNum, setLoadNum] = useState(0);
  const [loadEvent, setLoadEvent] = useState(0);
  const [open, setOpen] = useState(false);
  const location = useLocation(location?.state);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const addToBetSlip = (eventId, bet, betDetails, specifiers) => {
    if (
      selectedBet.length < 30 ||
      (selectedBet.length == 30 &&
        selectedBet.find((item) => item.eventId == eventId))
    ) {
      setBets((prev) => {
        const index = prev.findIndex(
          (item) => item.eventId == parseInt(eventId),
        );
        if (index !== -1) {
          // If eventId already exists, update bet and betDetails
          const updatedBets = [...prev];
          updatedBets[index] = {
            ...updatedBets[index],
            sportId: sId,
            bet: bet,
            betDetails: betDetails,
            eventNames: eventName,
            specifiers: specifiers,
          };
          return updatedBets;
        } else {
          return [
            ...prev,
            {
              eventId: eventId,
              sportId: sId,
              bet: bet,
              betDetails: betDetails,
              eventNames: eventName,
              specifiers: specifiers,
            },
          ];
        }
      });
    } else {
      toast.error('You have reached a maximum number of games');
    }
  };

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  useEffect(() => {
    if (bets.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
    }
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeventId, specifiers) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == parseInt(eventId) &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeventId &&
        bet.specifiers == specifiers,
    );

    if (bet) return true;
    else return false;
  };

  const handleRemoveBet = (eventId) => {
    const updatedBets = selectedBet.filter((item) => item.eventId != eventId);
    dispatch(fetchBetDetailsAction(updatedBets));
  };

  const cancelMarketTokenSource = useRef(null);
  const marketApiInstance = axios.create({
    baseURL: API_URL,
  });

  const getAllMarketData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await marketApiInstance.get(
        `/events/${eventId}/markets`,
        {
          cancelToken: cancelMarketTokenSource.current.token, // Access the cancel token from the useRef
        },
      );
      // if (response.status) {
      setMergedData(response.data);
      if (!loadNum) setLoadNum(1);
      setIsLoading(false);
      // }
      // setAllMarketData(response.data);
    } catch (error) {
      // Handle any errors from the API call
      // console.error(error);
    }
  }, [eventId, loadNum, marketApiInstance]);

  useEffect(() => {
    getAllMarketData();
    cancelMarketTokenSource.current = axios.CancelToken.source();

    let interval;
    const makeNewAPICall = () => {
      cancelMarketTokenSource.current.cancel('New API call initiated'); // Cancel the ongoing API request before making a new one
      cancelMarketTokenSource.current = axios.CancelToken.source(); // Update the cancel token source
      getAllMarketData();
    };
    if (loadNum) interval = setInterval(makeNewAPICall, 1500);

    return () => {
      clearInterval(interval);
      cancelMarketTokenSource.current.cancel('Component unmounted'); // Cancel the ongoing API request when the component is unmounted
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadNum == 1]);

  const apiInstance = axios.create({
    baseURL: API_URL,
    // Other custom configurations
  });

  const cancelTokenSource = useRef(null); // Initialize the cancel token source using useRef

  const getEventName = useCallback(async () => {
    try {
      const response = await apiInstance.get(`/events/${eventId}`, {
        cancelToken: cancelTokenSource.current.token, // Access the cancel token from the useRef
      });
      if (!loadEvent) {
        setLoadEvent(1);
      }
      setEventName(
        `${response?.data?.competitors[0]?.name} - ${response?.data?.competitors[1]?.name}`,
      );
      setEvenData(response.data);
    } catch (error) {
      console.log('');
    }
  }, [
    eventId,
    cancelTokenSource,
    setEventName,
    setEvenData,
    apiInstance,
    loadEvent,
  ]);

  useEffect(() => {
    getEventName();
    cancelTokenSource.current = axios.CancelToken.source();

    let interval;
    const makeNewAPICall = () => {
      cancelTokenSource.current.cancel('New API call initiated'); // Cancel the ongoing API request before making a new one
      cancelTokenSource.current = axios.CancelToken.source(); // Update the cancel token source
      getEventName();
    };
    if (loadEvent) interval = setInterval(makeNewAPICall, 2000);

    return () => {
      clearInterval(interval);
      cancelTokenSource.current.cancel('Component unmounted'); // Cancel the ongoing API request when the component is unmounted
      localStorage.removeItem('first');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadEvent == 1]);

  useEffect(() => {
    getEventName();
    getAllMarketData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="border border-lightgray rounded-md px-2">
        <div className="flex">
          <div>
            {/* <Link to="/dashboard"> */}
            <button
              onClick={() =>
                navigate(
                  `${location?.state?.url ? location?.state?.url : '/'}`,
                  {
                    state: {
                      data: location?.state?.data ? location?.state?.data : 0,
                    },
                  },
                )
              }
              className="text-black flex gap-0 items-center cursor-pointer"
            >
              <span className="text-14 md:text-16 font-[600]">
                {reactIcons.arrowleft}
              </span>
              <span className="text-12 md:text-14">Back</span>
            </button>
            {/* </Link> */}
          </div>
          <div className="flex-1 flex justify-center">
            <div className="border border-lightgray px-3">
              {eventData?.status == 'Live' ? (
                <div className="flex  justify-between">
                  <h1 className="text-black text-14 font-[600]">
                    {eventData?.matchStatusText} |{' '}
                    {eventData?.matchTime ? eventData?.matchTime : '_:_'}
                  </h1>
                  {/* <div className="md:hidden flex gap-2 items-center">
              <span className="text-12 font-[400]">Statistics</span>
              <span className="text-white text-20">{reactIcons.bargraph}</span>
            </div> */}
                </div>
              ) : (
                <h1 className="text-black text-12 md:text-14 font-[600]">
                  {moment(eventData?.startTime).format('hh:mm a ddd DD/MM')}
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className="my-2 flex justify-between">
          <div className="text-black text-14 md:text-16 font-[600]">
            <p>
              {
                eventData?.competitors?.find((item) => item.qualifier == 'Home')
                  .name
              }
            </p>
            <p>
              {
                eventData?.competitors?.find((item) => item.qualifier == 'Away')
                  .name
              }
            </p>
          </div>
          <div className="text-black text-14 md:text-16">
            <p>
              {typeof eventData?.homeScore === 'number'
                ? eventData?.homeScore
                : ''}
            </p>
            <p>
              {typeof eventData?.awayScore === 'number'
                ? eventData?.awayScore
                : ''}
            </p>
          </div>
        </div>
        {eventData && (
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            <div className="text-black">
              <span className="text-black text-12  md:text-14">
                {eventData?.tournament?.category?.sport?.name}/
                {eventData?.tournament?.category?.name}/
                {eventData?.tournament?.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-14 text-black font-[400]">Statistics</span>
              <span className="text-black text-20">
                {open ? reactIcons.close : reactIcons.bargraph}
              </span>
            </div>
          </div>
        )}
      </div>
      {open && (
        <div className=" text-black w-full h-full border border-[#a5dee3] my-2 rounded-sm bg-[#a5dee3]">
          {/* {eventData?.status == 'Live' ? ( */}
          <WidgetChart eventId={eventId} />
          {/* // ) : ( // <WidgetStatisticsChart eventId={eventId} />
          // )} */}
          <div className="text-black bg-white border border-lightgray py-1 px-3">
            <span className="text-12">
              Statistics are for reference only, BikoSports cannot guarantee
              their accuracy.
            </span>
          </div>
        </div>
      )}
      <div>
        {/* {eventData?.status === 'Live' && (
          <div className="my-2 flex justify-between">
            <div className="text-black">
              <p>
                {
                  eventData?.competitors?.find(
                    (item) => item.qualifier == 'Home',
                  ).name
                }
              </p>
              <p>
                {
                  eventData?.competitors?.find(
                    (item) => item.qualifier == 'Away',
                  ).name
                }
              </p>
            </div>
            <div className="text-black">
              <p>
                {typeof eventData?.homeScore === 'number'
                  ? eventData?.homeScore
                  : 'N/A'}
              </p>
              <p>
                {typeof eventData?.awayScore === 'number'
                  ? eventData?.awayScore
                  : 'N/A'}
              </p>
            </div>
          </div>
        )} */}
        <div className="bg-yellow py-1 flex justify-between rounded-md mt-5 px-3">
          <h1 className="text-white text-14 font-[600]">ALL MARKETS</h1>
          {/* <h1 className="text-white text-14 font-[600]">
            Start Time -{' '}
            {moment(eventData?.startTime).format('DD-MM-YYYY hh:mm A')}
          </h1> */}
          {/* <div className="flex  justify-between">
            <h1 className="text-white text-14 font-[600]">
              {eventData?.matchStatusText} |{' '}
              {eventData?.matchTime ? eventData?.matchTime : '_:_'}
            </h1> */}
          {/* <div className="md:hidden flex gap-2 items-center">
              <span className="text-12 font-[400]">Statistics</span>
              <span className="text-white text-20">{reactIcons.bargraph}</span>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      <div>
        {isLoading && loadNum < 1 && (
          <div>
            {/* <p className="text-black">Loading.....</p> */}
            <Loading />
          </div>
        )}
        {mergedData?.length > 0 &&
          mergedData?.map((item, index) => {
            return (
              <div key={index}>
                <div className="md:my-3 my-1">
                  <div className="text-black">
                    {item.outcomes.length > 0 && (
                      <h1 className="text-12 md:text-14 font-[500] py-2">
                        {item.name}
                      </h1>
                    )}
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
                              disabled={
                                innerItem.market.status == 1 && innerItem.odds
                                  ? false
                                  : true
                              }
                              onClick={() => {
                                if (
                                  selectBet(
                                    eventId,
                                    item.id,
                                    innerItem.id,
                                    innerItem.market.specifiers
                                      ? innerItem?.market.specifiers.join('|')
                                      : null,
                                  )
                                ) {
                                  handleRemoveBet(eventId, sId);
                                } else {
                                  addToBetSlip(
                                    eventId,
                                    innerItem,
                                    item,
                                    innerItem.market.specifiers
                                      ? innerItem?.market?.specifiers?.join('|')
                                      : null,
                                  );
                                }
                              }}
                              className={`${
                                selectBet(
                                  eventId,
                                  item.id,
                                  innerItem.id,
                                  innerItem.market.specifiers
                                    ? innerItem?.market?.specifiers.join('|')
                                    : null,
                                )
                                  ? 'bg-green text-white'
                                  : ''
                              } bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-10 md:text-12 rounded-md w-full h-full py-1 md:py-2 px-1 md:px-3`}
                            >
                              <span className="text-left md:text-center font-[700] leading-3 flex-1">
                                {innerItem.name}
                              </span>
                              <span className="font-[700]">
                                {innerItem.active == 1 &&
                                innerItem?.market?.status == 1 ? (
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
        {mergedData?.length == 0 && !isLoading && (
          <div className="text-center mt-5 text-black">
            <span>Theare is no active markets </span>
          </div>
        )}
      </div>
    </>
  );
}

export default SigleBetDetails;
