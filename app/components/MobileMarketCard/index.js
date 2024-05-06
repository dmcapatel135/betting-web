import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  marketDummyData,
  marketOutcomes,
  marketOutcomesTwoOdds,
} from './constant';
import { marketsName } from '@components/SportsMenu/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';
import { reactIcons } from '@utils/icons';

function MobileMarketCard({
  item,
  sportId,
  index,
  handleTodayDate,
  tab,
  handleShowDateSection,
  isFromNewDate,
  setTab,
  market,
  selectMarket,
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [bets, setBets] = useState([]);
  // const [data, setData] = useState({});

  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();

  const handleMarket = (market) => {
    let array = [];
    let order = ['1x2', 'Total', 'Both teams to score'];
    let orderTennis = ['Winner', '1st set - winner', '2nd set - winner'];

    let sportMarket = marketDummyData?.find(
      (item) => item.sportId == sportId,
    )?.previewMarket;

    for (let item of sportMarket) {
      let index = market.find((_item) => _item.name == item.name);
      if (index) {
        array.push(index);
      } else {
        array.push(item);
      }
    }
    return array.sort(
      (a, b) =>
        (sportId == 5 ? orderTennis : order).indexOf(a.name) -
        (sportId == 5 ? orderTennis : order).indexOf(b.name),
    );
  };

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  const addToBetSlip = (
    eventId,
    bet,
    betDetails,
    competitors,
    sportId,
    specifiers,
  ) => {
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId == eventId);
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
          sportId: sportId,
          bet: bet,
          betDetails: betDetails,
          competitors: competitors,
          specifiers: specifiers ? specifiers.join('|') : null,
        };
        return updatedBets;
      } else {
        // If eventId doesn't exist, push a new object
        return [
          ...prev,
          {
            sportId: sportId,
            eventId: eventId,
            bet: bet,
            betDetails: betDetails,
            eventNames: competitors[0]?.name + '-' + competitors[1]?.name,
            specifiers: specifiers ? specifiers.join('|') : null,
          },
        ];
      }
    });
  };

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  useEffect(() => {
    if (bets.length > 0) dispatch(fetchBetDetailsAction(bets));
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeId, specifiers) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == eventId &&
        bet.betDetails.id == marketId &&
        bet.bet.id == outcomeId &&
        bet.specifiers == specifiers,
    );

    if (bet) return true;
    else return false;
  };

  // Update the state with the data from item.previewMarkets
  const updateData = useCallback(() => {
    const object = {};
    item.previewMarkets.forEach((item) => {
      object[item.name] = item;
    });
    // setData(object);
  }, [item]);
  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleRemoveBet = (eventId) => {
    const updatedBets = selectedBet.filter((item) => item.eventId != eventId);
    dispatch(fetchBetDetailsAction(updatedBets));
  };

  const handleSelectEvent = (eventId) => {
    let selectedEvent = selectedBet.find((item) => item.eventId == eventId);
    if (selectedEvent) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="lg:block hidden">
        {index == 0 && (
          <div className="flex borde">
            <div className="flex-shrink">
              <div className="text-black lg:w-44 xl:w-52  2xl:w-80">
                <div className="flex-grow-0 w-40   mt-9 md:mt-12 xxl:flex-1 pl-0">
                  {handleTodayDate(window.location.pathname) && (
                    <div
                      className={`h-fit py-2 md:h-8 2xl:h-[42px] lg:mx-0 flex justify-center items-center w-36 md:w-48 xxl:w-full text-center text-10 md:text-12  ${
                        !(tab == 3) ? 'bg-gradient-color-1' : 'bg-white'
                      } text-white px-1 rounded-[4px]  font-[600]`}
                    >
                      <p className="leading-3">
                        {moment(new Date())
                          .format('dddd, DD MMM ')
                          .toUpperCase()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-black flex justify-end px-3">
                {marketsName
                  .filter(
                    (item) =>
                      item.sportId == (sportId || searchParams.get('sId')),
                  )[0]
                  ?.marketName.map((items, index) => {
                    return (
                      <div key={index} className="flex-shrink">
                        <div
                          className={`text-black ${items.option.length > 2 ? 'lg:w-[140px] xl:w-36 2xl:w-44' : 'lg:w-[100px] xl:w-[110px] 2xl:w-[140px]'}  text-center`}
                        >
                          <div className="h-12">
                            <h1 className="font-[700] lg:text-12 xl:text-[13px] 2xl:text-14">
                              {items.displayName}
                            </h1>
                          </div>
                          <div className="flex justify-center my-2 w-full lg:gap-1 xl:gap-2">
                            {items.option.map((opt, _index) => {
                              return (
                                <div
                                  key={_index}
                                  className="lg:w-[44px] xl:w-[46px] 2xl:w-[52px] border border-lightgray py-1 text-center rounded-[4px] text-gray-900 font-[600]"
                                >
                                  <button className="lg:text-12 xl:text-12 2xl:text-14">
                                    {opt}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="flex-shrink opacity-0">
              <div className="text-black lg:w-12 xl:w-16 2xl:w-20">
                open market
              </div>
            </div>
          </div>
        )}
        {item.startTime &&
          handleShowDateSection(window.location.pathname) &&
          isFromNewDate && (
            <div className="flex my-2 items-center px-2 py-0 md:py-1  bg-yellow rounded-md">
              <h1 className="text-12 md:text-14 font-[700]">
                {moment(item.startTime).format('dddd, DD MMM ').toUpperCase()}
              </h1>
            </div>
          )}
        <div
          className={`flex items-center border ${handleSelectEvent(item.eventId) ? 'bg-[#ececff]' : 'border-gray-700'}  rounded-md`}
        >
          <div className="flex-shrink">
            <div className="text-black lg:w-44 xl:w-52 2xl:w-80">
              <div className="px-2">
                <div className="flex items-center">
                  <img src="/images/bikoicon/acute.png" />
                  <p className="text-10 ml-1 md:text-10">
                    {moment(item?.startTime).format('hh:mm A')}{' '}
                    <span className="font-[600]">
                      {moment(item?.startTime).format('ddd DD/MM')}
                    </span>
                  </p>
                  {item.status == 'Live' && (
                    <img
                      src="/images/bikoicon/live-now-active.png"
                      alt="icon"
                      className="md:block hidden  ml-1 w-7"
                    />
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
                      {item?.competitors?.find(
                        (item) => item.qualifier == 'Home',
                      )?.name || 'N.A'}{' '}
                      {/* v/s{' '} */}
                    </h2>
                    <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
                      {item?.competitors?.find(
                        (item) => item.qualifier == 'Away',
                      )?.name || 'N.A'}{' '}
                    </h2>
                  </div>
                  <div>
                    {item.status == 'Live' && (
                      <div className="text-yellow text-14 font-[600]  flex-grow   text-center px-3">
                        <h1>{item.homeScore}</h1>
                        <h1>{item.awayScore}</h1>
                      </div>
                    )}
                    {item.popular && !(item.status == 'Live') && (
                      <div className="text-blue text-14 font-[600]  flex-grow  flex  justify-center px-3">
                        {item.popular && (
                          <img
                            src="/images/bikoicon/vector.png"
                            alt="icon"
                            className="md:block hidden  ml-1 w-4 h-6"
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className="text-[9px]  leading-none md:text-10"
                  style={{ lineHeight: '13px' }}
                >
                  {item?.sport?.name}/{item?.category?.name}/
                  {item?.tournament?.name}
                </span>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-black flex justify-end px-3">
              {handleMarket(item.previewMarkets)?.map((market, index) => {
                return (
                  <div key={index} className="flex-shrink">
                    <div
                      className={`text-black ${market.outcomes.length > 2 ? 'lg:w-[140px]  xl:w-36   2xl:w-44' : 'lg:w-[100px] xl:w-[110px] 2xl:w-[140px]'}  text-center`}
                    >
                      <div className="flex justify-center my-2 w-full gap-1 xl:gap-2">
                        {(market?.outcomes.length > 0
                          ? market.outcomes
                          : market.name == '1x2'
                            ? marketOutcomes
                            : marketOutcomesTwoOdds
                        )?.map((outcome) => {
                          return (
                            <button
                              key={outcome.id}
                              disabled={
                                market.status == 1 && outcome.odds
                                  ? false
                                  : true
                              }
                              className={`text-black  border text-10 xl:text-12 2xl:text-14 font-[700]  ${
                                selectBet(
                                  item.eventId,
                                  market.id,
                                  outcome.id,
                                  market.specifiers
                                    ? market.specifiers.join('|')
                                    : null,
                                )
                                  ? 'bg-green  text-white'
                                  : 'bg-[#EAEAEA] text-black'
                              } border-gray-700 h-9 lg:w-[44px] xl:w-[46px] 2xl:w-[52px] font-[700] flex justify-center items-center rounded-[4px]`}
                              onClick={() => {
                                if (
                                  selectBet(
                                    item.eventId,
                                    market.id,
                                    outcome.id,
                                    market.specifiers
                                      ? market.specifiers.join('|')
                                      : null,
                                  )
                                ) {
                                  handleRemoveBet(item.eventId, item.sport.id);
                                } else {
                                  addToBetSlip(
                                    item.eventId,
                                    outcome,
                                    market,
                                    item.competitors,
                                    item.sport.id,
                                    market.specifiers,
                                  );
                                }
                              }}
                            >
                              {/* {market.status == 1 ? (
                                outcome.odds 
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )} */}
                              {market.status == 1 ? (
                                outcome.odds ? (
                                  outcome.odds
                                ) : (
                                  '-'
                                )
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex-shrink">
            <div className="text-black lg:w-12 xl:w-16 2xl:w-20">
              <div
                onClick={() => {
                  setTab(null);
                  navigate(
                    `${item.onlyLive ? `/dashboard/single-bets/${item.eventId}?onlyLive=true` : `/dashboard/single-bets/${item.eventId}`}`,
                    {
                      state: {
                        data: window.scrollY,
                        url: window.location.pathname,
                      },
                    },
                  );
                }}
                className="border mr-2 lg:w-[46px] xl:w-[48px]  2xl:w-[52px]  2xl:text-14 py-1 h-9 font-[700] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer"
              >
                <img
                  src="/images/bikoicon/moving.png"
                  alt="icon"
                  className="mx-1"
                />
                <span className="text-10 xl:text-12 2xl:text-14 pr-2">
                  {item.openMarkets}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`border flex items-center lg:hidden rounded-[8px] ${handleSelectEvent(item.eventId) ? 'bg-[#ececff] ' : 'border-[#A3A3A3]'} text-black`}
      >
        <div className="flex-grow-0 2xl:flex-1 pl-2 py-2]">
          <div className="items-center w-36 sm:w-80 md:w-52 2xl:w-full 2xl:text-center text-[8px] md:text-10 ">
            <div className="flex items-center">
              <img src="/images/bikoicon/acute.png" />
              <p className="text-10 ml-1 md:text-10">
                {moment(item?.startTime).format('hh:mm A')}{' '}
                <span className="font-[600]">
                  {moment(item?.startTime).format('ddd DD/MM')}
                </span>
              </p>
              {item.status == 'Live' && (
                <img
                  src="/images/bikoicon/live-now-active.png"
                  alt="icon"
                  className="md:hidden block w-5 ml-1"
                />
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
                  {item?.competitors?.find((item) => item.qualifier == 'Home')
                    ?.name || 'N.A'}
                  {/* v/s{' '} */}
                </h2>
                <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
                  {item?.competitors?.find((item) => item.qualifier == 'Away')
                    ?.name || 'N.A'}
                </h2>
              </div>
              <div>
                {item.status == 'Live' && (
                  <div className="text-yellow  leading-3 text-12  w-2 text-start px-1">
                    <h1>{item.homeScore}</h1>
                    <h1>{item.awayScore}</h1>
                  </div>
                )}
                {item.popular && !(item.status == 'Live') && (
                  <img
                    src="/images/bikoicon/vector.png"
                    alt="icon"
                    className="md:hidden block  ml-1"
                  />
                )}
              </div>
            </div>
            <p
              className="text-[9px] leading-5 md:text-10 py-1"
              style={{ lineHeight: '13px' }}
            >
              {item?.sport?.name}/{item?.category?.name}/
              {item?.tournament?.name}
            </p>
          </div>
        </div>
        <div className="flex-1 ">
          <div className="flex gap-2 justify-center sm:justify-end">
            {market?.outcomes?.map((mkt) => {
              return (
                <button
                  disabled={market.status == 1 && mkt.odds ? false : true}
                  onClick={() => {
                    if (
                      selectBet(
                        item.eventId,
                        market.id,
                        mkt.id,
                        market.specifiers ? market.specifiers.join('|') : null,
                      )
                    ) {
                      handleRemoveBet(item.eventId, item.sport.id);
                    } else {
                      addToBetSlip(
                        item.eventId,
                        mkt,
                        market,
                        item.competitors,
                        item.sport.id,
                        market.specifiers,
                      );
                    }
                  }}
                  className={`${
                    selectBet(
                      item.eventId,
                      market.id,
                      mkt.id,
                      market.specifiers ? market.specifiers.join('|') : null,
                    )
                      ? 'bg-green text-white border-green'
                      : ''
                  } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] font-[600] text-black text-[11px] rounded-[4px] md:rounded-[4px]  w-[36px] h-6 md:h-8  sm:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                  key={mkt.id}
                  // className="text-black border text-12 border-black w-[36px] rounded-sm"
                >
                  {market.status == 1 ? (
                    mkt.odds
                  ) : (
                    <span className="text-12">{reactIcons.lock}</span>
                  )}
                </button>
              );
            })}
            {!market &&
              selectMarket == '3 WAY' &&
              [1, 2, 3].map((item) => {
                return (
                  <button
                    className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[36px] h-6 md:h-8  sm:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3"
                    key={item}
                    // className="text-black border text-12 border-black w-[36px] rounded-sm"
                  >
                    -
                  </button>
                );
              })}
            {!market &&
              !(selectMarket == '3 WAY') &&
              [1, 2].map((item) => {
                return (
                  <button
                    className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[36px] h-6 md:h-8  sm:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3"
                    key={item}
                    // className="text-black border text-12 border-black w-[36px] rounded-sm"
                  >
                    -
                  </button>
                );
              })}
          </div>
        </div>
        <div className="flex-grow-0">
          <div className=" border-solid sm:flex  md:justify-center w-12 sm:pl-1 md:pl-0 md:w-16 2xl:w-[72px] text-black">
            <div
              onClick={() => {
                setTab(null);
                navigate(
                  `${item.onlyLive ? `/dashboard/single-bets/${item.eventId}?onlyLive=true` : `/dashboard/single-bets/${item.eventId}`}`,
                  {
                    state: {
                      data: window.scrollY,
                      url: window.location.pathname,
                    },
                  },
                );
              }}
              className="border mr-2  sm:mr-0 w-[40px] h-6 md:h-8 md:min-w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:max-w-fit font-[500] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer"
            >
              <img
                src="/images/bikoicon/moving.png"
                alt="icon"
                className="mx-1"
              />
              <span className="text-[11px] font-[700] md:text-10 2xl:text-12 pr-2">
                {item.openMarkets}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MobileMarketCard.propTypes = {
  openMarket: PropTypes.number,
  item: PropTypes.object,
  sportId: PropTypes.number,
  index: PropTypes.number,
  handleShowDateSection: PropTypes.func,
  handleTodayDate: PropTypes.func,
  tab: PropTypes.number,
  isFromNewDate: PropTypes.bool,
  setTab: PropTypes.number,
  market: PropTypes.object,
  selectMarket: PropTypes.string,
};

export default MobileMarketCard;
