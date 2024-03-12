import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { reactIcons } from '@utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MyContext } from '@components/MyContext/MyContext';

function BetCard({ item, index, sportId }) {
  const [searchParams] = useSearchParams();

  const [bets, setBets] = useState([]);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const { setTab } = useContext(MyContext);
  const navigate = useNavigate();

  console.log('----index ', index);

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
    setData(object);
  }, [item]);
  useEffect(() => {
    updateData();
  }, [updateData]);

  const handleRemoveBet = (eventId) => {
    const updatedBets = selectedBet.filter((item) => item.eventId != eventId);
    dispatch(fetchBetDetailsAction(updatedBets));
  };

  return (
    <div className="border rounded-[8px] border-[#A3A3A3] text-black">
      <div className="flex items-center w-full pr-2">
        <div className="flex-grow-0 xxl:flex-1 pl-2 py-2]">
          <div className="items-center w-40 md:w-48 xxl:w-full xxl:text-center text-[8px] md:text-10 ">
            <div className="flex items-center">
              <img src="/images/bikoicon/acute.png" />
              <p className="text-10 ml-1 md:text-10">
                {moment(item?.startTime).format('hh:mm A')}{' '}
                <span className="font-[600]">
                  {moment(item?.startTime).format('ddd MM/DD')}
                </span>
              </p>
              {item.popular && (
                <img
                  src="/images/bikoicon/vector.png"
                  alt="icon"
                  className="md:block hidden  ml-1"
                />
              )}
            </div>
            <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
              {item?.competitors[0]?.name || 'N.A'}
              {/* v/s{' '} */}
            </h2>
            <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
              {item?.competitors[1]?.name || 'N.A'}{' '}
            </h2>
            <span className="text-[9px]  leading-none md:text-10">
              {item?.sport?.name}/{item?.category?.name}/
              {item?.tournament?.name}
            </span>
          </div>
        </div>
        <div className="flex-1 border-black">
          <div className="flex justify-center md:justify-end gap-4 pr-3 2xl:pr-6">
            {(sportId || searchParams.get('sId')) == 1 && (
              <>
                <div className="  ">
                  <div
                    className={`${
                      data['1x2'] ? '' : ''
                    }  flex mx-auto justify-center gap-2 2xl:min-w-[156px] `}
                  >
                    {data['1x2']?.outcomes?.length > 0 &&
                      data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={innerItem.active ? false : true}
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
                            } bg-[#EAEAEA] flex justify-center   items-center  border-[#A3A3A3] border text-black text-10  rounded-[4px] md:rounded-[4px] w-[40px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {innerItem.active ? (
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
                      <div className="w-32 md:w-36">
                        <div className="flex justify-between">
                          <button className="bg-[#EAEAEA] flex justify-center items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8  py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8 py-2 px-3">
                            -
                          </button>
                          <button className="bg-[#EAEAEA] flex justify-center items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 h-6 md:h-8 py-2 px-3">
                            -
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="  hidden xl:block ">
                  <div
                    className="
                      flex mx-auto justify-center gap-2 max-w-[110px] 2xl:min-w-[110px]"
                  >
                    {data['Total']?.outcomes?.length > 0 &&
                      data['Total']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={innerItem.active ? false : true}
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
                                handleRemoveBet(item.eventId, item.sport.id);
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
                            } bg-[#EAEAEA] flex justify-center md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {innerItem.active ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    {(data['Total']?.outcomes?.length == 0 ||
                      data['Total'] == undefined) && (
                      <>
                        <button className="bg-[#EAEAEA] flex justify-center w-[40px] md:h-8 h-6  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] text-center py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-center  w-[40px] md:h-8 h-6  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] text-center py-2 px-3">
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
                              disabled={innerItem.active ? false : true}
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
                                  handleRemoveBet(item.eventId, item.sport.id);
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
                              } bg-[#EAEAEA] flex justify-center md:h-8 h-6  md:w-[45px] items-center 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] w-full py-2 px-3`}
                            >
                              <span className="font-[500]">
                                {innerItem.active ? (
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
                      <div className="flex justify-between">
                        <button className="bg-[#EAEAEA] flex justify-between w-[45px] md:h-8 h-6  2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-between  md:duration-300 w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:h-8 h-6   items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
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
                   flex  mx-auto md:mx-0 justify-between gap-2 2xl:mx-4"
                >
                  {data['1x2']?.outcomes?.length > 0 &&
                    data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                      return (
                        <button
                          key={innerIndex}
                          disabled={innerItem.active ? false : true}
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
                            {innerItem.active ? (
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
                      <button className="bg-[#EAEAEA] flex justify-center w-[40px] md:h-8 h-6 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  md:w-[45px]  items-center 2xl:mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-center w-[40px] md:h-8 h-6 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center 2xl:mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-center w-[40px] md:h-8 h-6 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center 2xl:mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {(sportId || searchParams.get('sId')) == 10 && (
              <div className="w-32">
                <div
                  className="w-24 md:w-24
                      flex mx-auto justify-between"
                >
                  {data['Winner']?.outcomes?.length > 0 &&
                    data['Winner']?.outcomes?.map((innerItem, innerIndex) => {
                      return (
                        <button
                          key={innerIndex}
                          disabled={innerItem.active ? false : true}
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
                          } bg-[#EAEAEA] flex justify-between  items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                        >
                          <span className="font-[500]">
                            {innerItem.active ? (
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
                      <button className="bg-[#EAEAEA] flex justify-between w-[45px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-between  w-[45px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {(sportId || searchParams.get('sId')) == 12 && (
              <div className="w-36 md:w-40 ">
                <div
                  className="w-32 md:w-36 
                   flex mx-auto md:mx-0 justify-between"
                >
                  {data['1x2']?.outcomes?.length > 0 &&
                    data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                      return (
                        <button
                          key={innerIndex}
                          disabled={innerItem.active ? false : true}
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
                          } bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                        >
                          <span className="font-[500]">
                            {innerItem.active ? (
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
                      <button className="bg-[#EAEAEA] flex justify-between w-[40px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-between  w-[40px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-between  w-[40px] md:h-8 h-6  md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {(sportId || searchParams.get('sId')) == 21 && (
              <div className="w-36">
                <div
                  className="w-24 md:w-24
                      flex mx-auto justify-between"
                >
                  {data['Winner (incl. super over)']?.outcomes?.length > 0 &&
                    data['Winner (incl. super over)']?.outcomes?.map(
                      (innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={innerItem.active ? false : true}
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
                                  data['Winner (incl. super over)'].specifiers,
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
                            } bg-[#EAEAEA] flex justify-between  items-center  border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] md:rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {innerItem.active ? (
                                innerItem.odds
                              ) : (
                                <span>{reactIcons.lock}</span>
                              )}
                            </span>
                          </button>
                        );
                      },
                    )}
                  {(data['Winner (incl. super over)']?.outcomes?.length == 0 ||
                    data['Winner (incl. super over)'] === undefined) && (
                    <>
                      <button className="bg-[#EAEAEA] flex justify-between w-12 md:h-8 h-6  md:w-[45PX] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                      <button className="bg-[#EAEAEA] flex justify-between  w-12 md:h-8 h-6  md:w-[45PX] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                        -
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
            {(sportId || searchParams.get('sId')) == 5 && (
              <>
                <div className="w-32">
                  <div
                    className="w-24 md:w-24
                      flex mx-auto justify-between"
                  >
                    {data['Winner']?.outcomes?.length > 0 &&
                      data['Winner']?.outcomes?.map((innerItem, innerIndex) => {
                        return (
                          <button
                            key={innerIndex}
                            disabled={innerItem.active ? false : true}
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
                                data['Winner'].specifiers
                                  ? data['Winner'].specifiers.join('|')
                                  : null,
                              )
                                ? 'bg-green text-white border-green'
                                : ''
                            } bg-[#EAEAEA] flex justify-between   items-center  border-[#A3A3A3] border-[1px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 text-black text-10  rounded-[4px] md:rounded-[4px] w-[40px] md:h-8 h-6  md:w-[45px] py-2 px-3`}
                          >
                            <span className="font-[500]">
                              {innerItem.active ? (
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
                      <div className="flex justify-between">
                        <button className="bg-[#EAEAEA] flex justify-between w-[52px] md:h-8 h-6 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px]  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-between  w-[52px] md:h-8 h-6 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:w-[45px] items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-32 hidden xl:block ">
                  <div
                    className="w-24 md:w-24
                      flex mx-auto justify-between"
                  >
                    {data['1st set - winner']?.outcomes?.length > 0 &&
                      data['1st set - winner']?.outcomes?.map(
                        (innerItem, innerIndex) => {
                          return (
                            <button
                              key={innerIndex}
                              disabled={innerItem.active ? false : true}
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
                                  handleRemoveBet(item.eventId, item.sport.id);
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
                                    ? data['1st set - winner'].specifiers.join(
                                        '|',
                                      )
                                    : null,
                                )
                                  ? 'bg-green text-white border-green'
                                  : ''
                              } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  w-[40px] h-6 md:h-8  md:w-[45px] py-2 px-3`}
                            >
                              <span className="font-[500]">
                                {innerItem.active ? (
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
                        <button className="bg-[#EAEAEA] flex justify-between w-[52px] md:h-8 h-6  md:w-[45px]  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-between  w-[52px] md:h-8 h-6  md:w-[45px] items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="w-32 hidden xl:block ">
                  <div
                    className="w-24 md:w-24
                      flex mx-auto justify-between"
                  >
                    {data['2nd set - winner']?.outcomes?.length > 0 &&
                      data['2nd set - winner']?.outcomes?.map(
                        (innerItem, innerIndex) => {
                          return (
                            <button
                              key={innerIndex}
                              disabled={innerItem.active ? false : true}
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
                                  handleRemoveBet(item.eventId, item.sport.id);
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
                                    ? data['2nd set - winner'].specifiers.join(
                                        '|',
                                      )
                                    : null,
                                )
                                  ? 'bg-green text-white border-green'
                                  : ''
                              } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px] h-6 md:h-8 md:w-[45px] py-2 px-3`}
                            >
                              <span className="font-[500]">
                                {innerItem.active ? (
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
                        <button className="bg-[#EAEAEA] flex justify-between w-12 md:h-8 h-6  md:w-[45px]  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
                          -
                        </button>
                        <button className="bg-[#EAEAEA] flex justify-between  w-12 md:h-8 h-6  md:w-[45px] items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-10 rounded-[4px]  py-2 px-3">
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
          <div className=" border-solid  w-16 text-black">
            <div
              onClick={() => {
                setTab(null);
                navigate(`/dashboard/single-bets/${item.eventId}`);
              }}
              className="border-[1px]  md:h-8 h-6 mr-2   md:mr-2  w-[40px] md:min-w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:max-w-fit  font-[500] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer "
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
  );
}

BetCard.propTypes = {
  item: PropTypes.object,
  sportId: PropTypes.string,
  handleSelectBet: PropTypes.func,
  index: PropTypes.number,
};

export default BetCard;
