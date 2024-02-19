import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
// import { Link } from 'react-router-dom';
import { reactIcons } from '@utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';

function BetCard({ item, sportId }) {
  const [bets, setBets] = useState([]);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();
  const [data, setData] = useState({});

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  const addToBetSlip = (eventId, bet, betDetails, competitors, sportId) => {
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId === eventId);
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
          sportId: sportId,
          bet: bet,
          betDetails: betDetails,
          competitors: competitors,
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

  const selectBet = (eventId, marketId, outcomeId) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == eventId &&
        bet.betDetails.id == marketId &&
        bet.bet.id == outcomeId,
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
    <div className="md:min-h-32 max-h-fit flex  items-center border-[1px]  md:px-3 py-1 rounded-[8px] border-[#A3A3A3] text-black">
      <div className="text-12 w-[220px] text-black rounded-[4px] text-left ">
        <div className="flex md:justify-left items-center">
          <img
            src="/images/bikoicon/acute.png"
            // className="w-[20px] h-[16px] md:w-[22px] md:h-[22px]"
          />
          <p className="text-10 ml-1 md:text-12">
            {moment(item?.startTime).format('hh:mm A')}{' '}
            <span className="font-[600]">
              {moment(item?.startTime).format('ddd MM/DD')}
            </span>
          </p>
          <img
            src="/images/bikoicon/vector.png"
            alt="icon"
            className="md:block hidden  ml-1"
          />
        </div>
        <h2 className="text-12 md:text-14 leading-5 font-[700]">
          {item?.competitors[0]?.name || 'N.A'} v/s{' '}
          {item?.competitors[1]?.name || 'N.A'}{' '}
        </h2>
        <span className="text-[9px]  leading-none md:text-10">
          {item?.sport?.name}/{item?.category?.name}/{item?.tournament?.name}
        </span>
      </div>
      {sportId == 1 && (
        <div className=" flex flex-1  justify-between">
          <div className="text-center">
            <div className="flex  items-center justify-between w-44 text-12 text-[#3D3D3D]">
              {data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['1x2'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['1x2'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['1x2'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between  items-center  border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] h-11 py-2 px-3`}
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
              {data['1x2'] == undefined && (
                <div className="flex w-44 justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-2 md:block hidden">
            <div className="flex  w-32 text-12 text-[#3D3D3D]">
              {data['Total']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['Total'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['Total'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['Total'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between h-10 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
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
              {data['Total'] === undefined && (
                <div className="flex justify-between w-28">
                  <button className="bg-[#EAEAEA] flex justify-between w-[52px] h-11  items-center  border-[#A3A3A3] border-[1px] text-black text-12 rounded-md text-center py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center  border-[#A3A3A3] border-[1px] text-black text-12 rounded-md text-center py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex justify-between  w-28 text-12 text-[#3D3D3D]">
              {data['Both teams to score']?.outcomes?.map(
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
                          );
                        }
                      }}
                      className={`${
                        selectBet(
                          item.eventId,
                          data['Both teams to score'].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
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
              {data['Both teams to score'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-[52px] h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId == 2 && (
        <div className="flex  w-[470px]">
          <div className="text-center  flex-2 ">
            <div className="flex justify-between  items-center w-44 text-12 text-[#3D3D3D]">
              {data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['1x2'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['1x2'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['1x2'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
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
              {data['1x2'] === undefined && (
                <div className="flex w-44 justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-[52px] h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId == 12 && (
        <div className="flex w-[470px]">
          <div className="text-center flex-2 ">
            <div className="flex items-center justify-between w-44 text-12 text-[#3D3D3D]">
              {data['1x2']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['1x2'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['1x2'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['1x2'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                  >
                    {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['1x2'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId == 10 && (
        <div className="flex w-[470px]">
          <div className="text-center flex-2 ">
            <div className="flex items-center w-44 text-12 text-[#3D3D3D]">
              {data['Winner']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['Winner'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['Winner'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['Winner'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                  >
                    {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['Winner'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId == 21 && (
        <div className="flex w-[470px]">
          <div className="text-center flex-2 ">
            <div className="flex  items-center justify-between w-32 pl-3  text-12 text-[#3D3D3D]">
              {data['Winner (incl. super over)']?.outcomes?.map(
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
                          );
                        }
                      }}
                      className={`${
                        selectBet(
                          item.eventId,
                          data['Winner (incl. super over)'].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['Winner (incl. super over)'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId == 5 && (
        <div className="flex w-[470px]">
          <div className="text-center flex-2 ">
            <div className="flex justify-between items-center w-32 pl-3 text-12 text-[#3D3D3D]">
              {data['Winner']?.outcomes?.map((innerItem, innerIndex) => {
                return (
                  <button
                    key={innerIndex}
                    disabled={innerItem.active ? false : true}
                    onClick={() => {
                      if (
                        selectBet(item.eventId, data['Winner'].id, innerItem.id)
                      ) {
                        handleRemoveBet(item.eventId, item.sport.id);
                      } else {
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          data['Winner'],
                          item.competitors,
                          item.sport.id,
                        );
                      }
                    }}
                    className={`${
                      selectBet(item.eventId, data['Winner'].id, innerItem.id)
                        ? 'bg-green text-white'
                        : ''
                    } bg-[#EAEAEA] flex justify-between  items-center  border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                  >
                    {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['Winner'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-[52px] h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-5 md:block hidden w-[150px]">
            <div className="flex justify-between pl-8 w-36 text-12 text-[#3D3D3D]">
              {data['1st set - winner']?.outcomes?.map(
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
                          );
                        }
                      }}
                      className={`${
                        selectBet(
                          item.eventId,
                          data['1st set - winner'].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['1st set - winner'] === undefined && (
                <div className="flex justify-between w-36">
                  <button className="bg-[#EAEAEA] flex justify-between w-[52px] h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-[52px] h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex justify-between pl-6  w-32 text-12 text-[#3D3D3D]">
              {data['2nd set - winner']?.outcomes?.map(
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
                          );
                        }
                      }}
                      className={`${
                        selectBet(
                          item.eventId,
                          data['2nd set - winner']?.id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-[52px] py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
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
              {data['2nd set - winner'] === undefined && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3">
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="flex justify-end text-12 w-16 text-black">
          {/* <Link
            to={`/dashboard/single-bets/${item.sport.id}/${item.eventId}/${
              item?.competitors[0]?.name + ' vs ' + item?.competitors[1]?.name
            }`}
          > */}
          {/* <Link to="/dashboard/single"> */}
          <div
            onClick={() =>
              (window.location.href = `/dashboard/single-bets/${
                item.sport.id
              }/${item.eventId}/${
                item?.competitors[0]?.name + ' vs ' + item?.competitors[1]?.name
              }`)
            }
            className="border-[1px]  h-10 min-w-12 max-w-fit px-2 font-[600] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer "
          >
            <img
              src="/images/bikoicon/moving.png"
              alt="icon"
              className="mx-1"
            />
            <span>{item.openMarkets}</span>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

BetCard.propTypes = {
  item: PropTypes.object,
  sportId: PropTypes.number,
  handleSelectBet: PropTypes.func,
  index: PropTypes.number,
};

export default BetCard;
