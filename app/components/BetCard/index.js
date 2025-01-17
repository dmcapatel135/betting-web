import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { reactIcons } from '@utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MyContext } from '@components/MyContext/MyContext';
import { toast } from 'react-toastify';

function BetCard({ item, sportId, market, selectMarket }) {
  const [searchParams] = useSearchParams();

  const [bets, setBets] = useState([]);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { setTab } = useContext(MyContext);
  const navigate = useNavigate();

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
    if (
      selectedBet.length < 30 ||
      (selectedBet.length == 30 &&
        selectedBet.find((item) => item.eventId == eventId))
    ) {
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
    } else {
      toast.error('You have reached a maximum number of games');
    }
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
    setData(object);
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
      <div
        className={`border hidden lg:block rounded-[8px] ${handleSelectEvent(item.eventId) ? 'bg-[#ececff]' : 'border-[#A3A3A3]'} text-black`}
      >
        <div className="flex items-center w-full md:pr-2">
          <div className="flex-grow-0 2xl:flex-1 pl-2 py-2]">
            <div className="items-center  md:w-[360px] lg:w-48 xl:w-48 2xl:w-[335px] 2xl:text-left text-[8px] md:text-10 ">
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
                    {item?.competitors?.find((item) => item.qualifier == 'Home')
                      ?.name || 'N.A'}{' '}
                    {/* v/s{' '} */}
                  </h2>
                  <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
                    {item?.competitors?.find((item) => item.qualifier == 'Away')
                      ?.name || 'N.A'}{' '}
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
              {/* {moment(subtractMinutes(new Date(), 10)).format(
                'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)',
              ) ==
                moment(item?.startTime).format(
                  'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)',
                ) && (
                <span className="text-red-500">
                  {moment(subtractMinutes(new Date(), 5)).format(
                    'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)',
                  ) ==
                  moment(item?.startTime).format(
                    'ddd MMM DD YYYY HH:mm:ss [GMT]Z (z)',
                  )
                    ? 'Live'
                    : ''}
                </span>
              )} */}
            </div>
          </div>
          <div className="flex-1 border-black">
            <div className="flex justify-end gap-4 pr-3 xl2:pr-5 2xl:pr-6">
              {(sportId || searchParams.get('sId')) == 1 && (
                <>
                  {/* <div className="  "> */}
                  <div
                    className={`${
                      data['1x2'] ? '' : ''
                    }  flex justify-end md:justify-center gap-2 w-full max-w-[156px] `}
                  >
                    {data['1x2']?.outcomes?.length > 0 &&
                      data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={
                              data['1x2'].status == 1 && innerItem.odds
                                ? false
                                : true
                            }
                            onClick={() => {
                              if (
                                selectBet(
                                  item.eventId,
                                  data['1x2'].id,
                                  innerItem.id,
                                  data['1x2'].specifiers
                                    ? data['1x2'].specifiers.join('|')
                                    : null,
                                )
                              ) {
                                handleRemoveBet(item.eventId, item.sport.id);
                              } else {
                                addToBetSlip(
                                  item.eventId,
                                  innerItem,
                                  data['1x2'],
                                  item.competitors,
                                  item.sport.id,
                                  data['1x2'].specifiers,
                                );
                              }
                            }}
                            className={`${
                              selectBet(
                                item.eventId,
                                data['1x2'].id,
                                innerItem.id,
                                data['1x2'].specifiers
                                  ? data['1x2'].specifiers.join('|')
                                  : null,
                              )
                                ? 'bg-green text-white border-green'
                                : ''
                            } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {data['1x2'].status == 1 ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    {(data['1x2']?.outcomes?.length == 0 ||
                      data['1x2'] == undefined) && (
                      <div className="flex mx-auto justify-center gap-2 2xl:min-w-[156px]">
                        <button className="bg-[#EAEAEA] flex justify-center items-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8 py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center items-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8 py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center items-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8 py-2 px-3">
                          -
                        </button>
                      </div>
                    )}
                  </div>
                  {/* </div> */}
                  <div className="hidden xl:block ">
                    <div
                      className="
                      flex mx-auto justify-center gap-2 max-w-[110px] 2xl:min-w-[110px]"
                    >
                      {data['Total']?.outcomes?.length > 0 &&
                        data['Total']?.outcomes?.map(
                          (innerItem, innerIndex) => {
                            return (
                              <button
                                key={innerIndex}
                                disabled={
                                  data['Total'].status == 1 && innerItem.odds
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (
                                    selectBet(
                                      item.eventId,
                                      data['Total'].id,
                                      innerItem.id,
                                      data['Total'].specifiers
                                        ? data['Total'].specifiers.join('|')
                                        : null,
                                    )
                                  ) {
                                    handleRemoveBet(
                                      item.eventId,
                                      item.sport.id,
                                    );
                                  } else {
                                    addToBetSlip(
                                      item.eventId,
                                      innerItem,
                                      data['Total'],
                                      item.competitors,
                                      item.sport.id,
                                      data['Total'].specifiers,
                                    );
                                  }
                                }}
                                className={`${
                                  selectBet(
                                    item.eventId,
                                    data['Total'].id,
                                    innerItem.id,
                                    data['Total'].specifiers
                                      ? data['Total'].specifiers.join('|')
                                      : null,
                                  )
                                    ? 'bg-green text-white border-green'
                                    : ''
                                } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                              >
                                <span className="font-[500]">
                                  {data['Total'].status == 1 ? (
                                    innerItem.odds
                                  ) : (
                                    <span>{reactIcons.lock}</span>
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      {(data['Total']?.outcomes?.length == 0 ||
                        data['Total'] == undefined) && (
                        <>
                          <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                            -
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="hidden xl:block  ">
                    <div
                      // className={`${items.option.length ==} flex justify-between`}
                      className="
                      flex 2xl:px-2 justify-center gap-2 w-full min-w-[110px] 2xl:max-w-[110px]"
                    >
                      {data['Both teams to score']?.outcomes?.length > 0 &&
                        data['Both teams to score']?.outcomes?.map(
                          (innerItem, innerIndex) => {
                            return (
                              <button
                                key={innerIndex}
                                disabled={
                                  data['Both teams to score'].status == 1 &&
                                  innerItem.odds
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (
                                    selectBet(
                                      item.eventId,
                                      data['Both teams to score'].id,
                                      innerItem.id,
                                      data['Both teams to score'].specifiers
                                        ? data[
                                            'Both teams to score'
                                          ].specifiers.join('|')
                                        : null,
                                    )
                                  ) {
                                    handleRemoveBet(
                                      item.eventId,
                                      item.sport.id,
                                    );
                                  } else {
                                    addToBetSlip(
                                      item.eventId,
                                      innerItem,
                                      data['Both teams to score'],
                                      item.competitors,
                                      item.sport.id,
                                      data['Both teams to score'].specifiers,
                                    );
                                  }
                                }}
                                className={`${
                                  selectBet(
                                    item.eventId,
                                    data['Both teams to score'].id,
                                    innerItem.id,
                                    data['Both teams to score'].specifiers
                                      ? data[
                                          'Both teams to score'
                                        ].specifiers.join('|')
                                      : null,
                                  )
                                    ? 'bg-green text-white border-green'
                                    : ''
                                } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                              >
                                <span className="font-[500]">
                                  {data['Both teams to score'].status == 1 ? (
                                    innerItem.odds
                                  ) : (
                                    <span>{reactIcons.lock}</span>
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      {(data['Both teams to score']?.outcomes?.length == 0 ||
                        data['Both teams to score'] === undefined) && (
                        <div className=" flex mx-auto justify-center gap-2 max-w-[110px] 2xl:min-w-[110px]">
                          <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                            -
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
              {(sportId || searchParams.get('sId')) == 2 && (
                <div className=" ">
                  <div
                    className="
                   flex max-w-[156px]  mx-auto md:mx-0 justify-between gap-2 2xl:mx-4"
                  >
                    {data['1x2']?.outcomes?.length > 0 &&
                      data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={
                              data['1x2'].status == 1 && innerItem.odds
                                ? false
                                : true
                            }
                            onClick={() => {
                              if (
                                selectBet(
                                  item.eventId,
                                  data['1x2'].id,
                                  innerItem.id,
                                  data['1x2'].specifiers
                                    ? data['1x2'].specifiers.join('|')
                                    : null,
                                )
                              ) {
                                handleRemoveBet(item.eventId, item.sport.id);
                              } else {
                                addToBetSlip(
                                  item.eventId,
                                  innerItem,
                                  data['1x2'],
                                  item.competitors,
                                  item.sport.id,
                                  data['1x2'].specifiers,
                                );
                              }
                            }}
                            className={`${
                              selectBet(
                                item.eventId,
                                data['1x2'].id,
                                innerItem.id,
                                data['1x2'].specifiers
                                  ? data['1x2'].specifiers.join('|')
                                  : null,
                              )
                                ? 'bg-green text-white border-green'
                                : ''
                            } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {data['1x2'].status == 1 ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    {(data['1x2']?.outcomes?.length == 0 ||
                      data['1x2'] === undefined) && (
                      <>
                        <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3">
                          -
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {(sportId || searchParams.get('sId')) == 10 && (
                <div className="2xl:mx-4">
                  <div
                    className="justify-center gap-2 w-full  2xl:max-w-[156px]
                      flex "
                  >
                    {data['Winner']?.outcomes?.length > 0 &&
                      data['Winner']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={
                              data['Winner']?.status == 1 && innerItem.odds
                                ? false
                                : true
                            }
                            onClick={() => {
                              if (
                                selectBet(
                                  item.eventId,
                                  data['Winner'].id,
                                  innerItem.id,
                                  data['Winner'].specifiers
                                    ? data['Winner'].specifiers.join('|')
                                    : null,
                                )
                              ) {
                                handleRemoveBet(item.eventId, item.sport.id);
                              } else {
                                addToBetSlip(
                                  item.eventId,
                                  innerItem,
                                  data['Winner'],
                                  item.competitors,
                                  item.sport.id,
                                  data['Winner'].specifiers,
                                );
                              }
                            }}
                            className={`${
                              selectBet(
                                item.eventId,
                                data['Winner'].id,
                                innerItem.id,
                                innerItem.specifiers
                                  ? data['Winner'].specifiers.join('|')
                                  : null,
                              )
                                ? 'bg-green text-white border-green'
                                : ''
                            } bg-[#EAEAEA] flex justify-center items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {data['Winner'].status == 1 ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    {(data['Winner']?.outcomes?.length == 0 ||
                      data['Winner'] === undefined) && (
                      <>
                        <button className="bg-[#EAEAEA] flex justify-center w-[45px]   md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center w-[45px]   md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {(sportId || searchParams.get('sId')) == 12 && (
                <div className="2xl:mx-4">
                  <div className="  flex mx-auto justify-center gap-2 w-full 2xl:max-w-[156px]">
                    {data['1x2']?.outcomes?.length > 0 &&
                      data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={
                              data['1x2'].status == 1 && innerItem.odds
                                ? false
                                : true
                            }
                            onClick={() => {
                              if (
                                selectBet(
                                  item.eventId,
                                  data['1x2'].id,
                                  innerItem.id,
                                  data['1x2'].specifiers
                                    ? data['1x2'].specifiers.join('|')
                                    : null,
                                )
                              ) {
                                handleRemoveBet(item.eventId, item.sport.id);
                              } else {
                                addToBetSlip(
                                  item.eventId,
                                  innerItem,
                                  data['1x2'],
                                  item.competitors,
                                  item.sport.id,
                                  data['1x2'].specifiers,
                                );
                              }
                            }}
                            className={`${
                              selectBet(
                                item.eventId,
                                data['1x2'].id,
                                innerItem.id,
                                data['1x2'].specifiers
                                  ? data['1x2'].specifiers.join('|')
                                  : null,
                              )
                                ? 'bg-green text-white border-green'
                                : ''
                            } bg-[#EAEAEA] flex justify-center  items-center border-[#A3A3A3] border-[1px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {data['1x2'].status == 1 ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    {(data['1x2']?.outcomes?.length == 0 ||
                      data['1x2'] === undefined) && (
                      <>
                        <button className="bg-[#EAEAEA] flex justify-center w-[40px]   md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center  w-[40px]   md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center  w-[40px]   md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {(sportId || searchParams.get('sId')) == 21 && (
                <div className="flex justify-center gap-2 2xl:mx-4 max-w-[156px] w-full">
                  <div className="flex w-full gap-2 mx-auto lg:pr-3 xl:pr-0 justify-center lg:justify-end 2xl:justify-center">
                    {data['Winner (incl. super over)']?.outcomes?.length > 0 &&
                      data['Winner (incl. super over)']?.outcomes?.map(
                        (innerItem, innerIndex) => {
                          return (
                            <button
                              key={innerIndex}
                              disabled={
                                data['Winner (incl. super over)'].status == 1 &&
                                innerItem.odds
                                  ? false
                                  : true
                              }
                              onClick={() => {
                                if (
                                  selectBet(
                                    item.eventId,
                                    data['Winner (incl. super over)'].id,
                                    innerItem.id,
                                    data['Winner (incl. super over)'].specifiers
                                      ? data[
                                          'Winner (incl. super over)'
                                        ].specifiers.join('|')
                                      : null,
                                  )
                                ) {
                                  handleRemoveBet(item.eventId, item.sport.id);
                                } else {
                                  addToBetSlip(
                                    item.eventId,
                                    innerItem,
                                    data['Winner (incl. super over)'],
                                    item.competitors,
                                    item.sport.id,
                                    data['Winner (incl. super over)']
                                      .specifiers,
                                  );
                                }
                              }}
                              className={`${
                                selectBet(
                                  item.eventId,
                                  data['Winner (incl. super over)'].id,
                                  innerItem.id,
                                  data['Winner (incl. super over)'].specifiers
                                    ? data[
                                        'Winner (incl. super over)'
                                      ].specifiers.join('|')
                                    : null,
                                )
                                  ? 'bg-green text-white border-green'
                                  : ''
                              } bg-[#EAEAEA] flex justify-center  items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                            >
                              <span className="font-[500]">
                                {data['Winner (incl. super over)'].status ==
                                1 ? (
                                  innerItem.odds
                                ) : (
                                  <span>{reactIcons.lock}</span>
                                )}
                              </span>
                            </button>
                          );
                        },
                      )}
                    {(data['Winner (incl. super over)']?.outcomes?.length ==
                      0 ||
                      data['Winner (incl. super over)'] === undefined) && (
                      <>
                        <button className="bg-[#EAEAEA] flex justify-center w-12   md:w-[45PX] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center  w-12   md:w-[45PX] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
              {(sportId || searchParams.get('sId')) == 5 && (
                <>
                  <div className="">
                    <div
                      className="
                      flex gap-3 mx-auto justify-between"
                    >
                      {data['Winner']?.outcomes?.length > 0 &&
                        data['Winner']?.outcomes?.map(
                          (innerItem, innerIndex) => {
                            return (
                              <button
                                key={innerIndex}
                                disabled={
                                  data['Winner'].status == 1 && innerItem.odds
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (
                                    selectBet(
                                      item.eventId,
                                      data['Winner'].id,
                                      innerItem.id,
                                      data['Winner'].specifiers
                                        ? data['Winner'].specifiers.join('|')
                                        : null,
                                    )
                                  ) {
                                    handleRemoveBet(
                                      item.eventId,
                                      item.sport.id,
                                    );
                                  } else {
                                    addToBetSlip(
                                      item.eventId,
                                      innerItem,
                                      data['Winner'],
                                      item.competitors,
                                      item.sport.id,
                                      data['Winner'].specifiers,
                                    );
                                  }
                                }}
                                className={`${
                                  selectBet(
                                    item.eventId,
                                    data['Winner'].id,
                                    innerItem.id,
                                    data['Winner'].specifiers
                                      ? data['Winner'].specifiers.join('|')
                                      : null,
                                  )
                                    ? 'bg-green text-white border-green'
                                    : ''
                                } bg-[#EAEAEA] flex justify-center items-center text-center border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 py-2 px-3`}
                              >
                                <span className="font-[500]">
                                  {data['Winner'].status == 1 ? (
                                    innerItem.odds
                                  ) : (
                                    <span>{reactIcons.lock}</span>
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      {(data['Winner']?.outcomes?.length == 0 ||
                        data['Winner'] === undefined) && (
                        <div className="flex gap-2 mx-auto justify-between">
                          <button className="bg-[#EAEAEA] flex justify-center w-[52px]  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px]  items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center  w-[52px]  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="hidden xl:block ">
                    <div className="flex mx-auto gap-2 justify-between">
                      {data['1st set - winner']?.outcomes?.length > 0 &&
                        data['1st set - winner']?.outcomes?.map(
                          (innerItem, innerIndex) => {
                            return (
                              <button
                                key={innerIndex}
                                disabled={
                                  data['1st set - winner'].status == 1 &&
                                  innerItem.odds
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (
                                    selectBet(
                                      item.eventId,
                                      data['1st set - winner'].id,
                                      innerItem.id,
                                      data['1st set - winner'].specifiers
                                        ? data[
                                            '1st set - winner'
                                          ].specifiers.join('|')
                                        : null,
                                    )
                                  ) {
                                    handleRemoveBet(
                                      item.eventId,
                                      item.sport.id,
                                    );
                                  } else {
                                    addToBetSlip(
                                      item.eventId,
                                      innerItem,
                                      data['1st set - winner'],
                                      item.competitors,
                                      item.sport.id,
                                      data['1st set - winner'].specifiers,
                                    );
                                  }
                                }}
                                className={`${
                                  selectBet(
                                    item.eventId,
                                    data['1st set - winner'].id,
                                    innerItem.id,
                                    data['1st set - winner'].specifiers
                                      ? data[
                                          '1st set - winner'
                                        ].specifiers.join('|')
                                      : null,
                                  )
                                    ? 'bg-green text-white border-green'
                                    : ''
                                } bg-[#EAEAEA] flex justify-center  items-center 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                              >
                                <span className="font-[500]">
                                  {data['1st set - winner'].status == 1 ? (
                                    innerItem.odds
                                  ) : (
                                    <span>{reactIcons.lock}</span>
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      {(data['1st set - winner']?.outcomes?.length == 0 ||
                        data['1st set - winner'] === undefined) && (
                        <>
                          <button className="bg-[#EAEAEA] flex justify-center w-[52px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  md:w-[45px]  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center  w-[52px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  md:w-[45px] items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div className=" hidden xl:block ">
                    <div
                      className="
                      flex mx-auto gap-2 justify-between"
                    >
                      {data['2nd set - winner']?.outcomes?.length > 0 &&
                        data['2nd set - winner']?.outcomes?.map(
                          (innerItem, innerIndex) => {
                            return (
                              <button
                                key={innerIndex}
                                disabled={
                                  data['2nd set - winner'].status == 1 &&
                                  innerItem.odds
                                    ? false
                                    : true
                                }
                                onClick={() => {
                                  if (
                                    selectBet(
                                      item.eventId,
                                      data['2nd set - winner']?.id,
                                      innerItem.id,
                                      data['2nd set - winner'].specifiers
                                        ? data[
                                            '2nd set - winner'
                                          ].specifiers.join('|')
                                        : null,
                                    )
                                  ) {
                                    handleRemoveBet(
                                      item.eventId,
                                      item.sport.id,
                                    );
                                  } else {
                                    addToBetSlip(
                                      item.eventId,
                                      innerItem,
                                      data['2nd set - winner'],
                                      item.competitors,
                                      item.sport.id,
                                      data['2nd set - winner'].specifiers,
                                    );
                                  }
                                }}
                                className={`${
                                  selectBet(
                                    item.eventId,
                                    data['2nd set - winner']?.id,
                                    innerItem.id,
                                    data['2nd set - winner'].specifiers
                                      ? data[
                                          '2nd set - winner'
                                        ].specifiers.join('|')
                                      : null,
                                  )
                                    ? 'bg-green text-white border-green'
                                    : ''
                                } bg-[#EAEAEA] flex justify-center  items-center 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] h-6 md:h-8 md:w-[45px] py-2 px-3`}
                              >
                                <span className="font-[500]">
                                  {data['2nd set - winner']?.status == 1 ? (
                                    innerItem.odds
                                  ) : (
                                    <span>{reactIcons.lock}</span>
                                  )}
                                </span>
                              </button>
                            );
                          },
                        )}
                      {(data['2nd set - winner']?.outcomes?.length == 0 ||
                        data['2nd set - winner'] === undefined) && (
                        <>
                          <button className="bg-[#EAEAEA] flex justify-center w-12 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  md:w-[45px]  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center  w-12  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                            -
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex-grow-0">
            <div className=" border-solid md:w-16 2xl:w-[72px] text-black">
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
                className="border mr-2 w-[40px] h-6 md:h-8 md:min-w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:max-w-fit font-[500] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer"
              >
                <img
                  src="/images/bikoicon/moving.png"
                  alt="icon"
                  className="mx-1"
                />
                <span className="text-10 md:text-10 2xl:text-12 pr-2">
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
          <div className="items-center w-40 sm:w-80 md:w-52 2xl:w-full 2xl:text-center text-[8px] md:text-10 ">
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
          <div className="flex gap-3 justify-center sm:justify-end">
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
                    <span className="text-16">{reactIcons.lock}</span>
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

BetCard.propTypes = {
  item: PropTypes.object,
  sportId: PropTypes.number,
  handleSelectBet: PropTypes.func,
  index: PropTypes.number,
  market: PropTypes.object,
  selectMarket: PropTypes.string,
};

export default BetCard;
