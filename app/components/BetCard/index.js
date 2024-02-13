import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { reactIcons } from '@utils/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';

function BetCard({ item, sportId }) {
  const [bets, setBets] = useState([]);
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const dispatch = useDispatch();

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  const addToBetSlip = (eventId, bet, betDetails, competitors) => {
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId === eventId);
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
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
        bet.eventId === eventId &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeId,
    );

    if (bet) return true;
    else return false;
  };

  return (
    <div className="md:min-h-32 max-h-fit flex justify-around items-center border-[1px] px-2 md:px-0 rounded-[8px] border-[#A3A3A3] text-black">
      <div className="text-12 w-[140px] md:w-[160px] text-black rounded-[4px] text-left ">
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
      {sportId === 1 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-12 h-11 py-2 px-3`}
                    >
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-5 md:block hidden">
            <div className="flex  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Total')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Total',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Total',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between h-10 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Total')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex justify-between  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Both teams to score')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Both teams to score',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Both teams to score',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === 'Both teams to score',
              ).length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 2 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 12 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === '1x2',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 10 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Winner')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 21 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner (incl. super over)')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner (incl. super over)',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner (incl. super over)',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === 'Winner (incl. super over)',
              ).length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 5 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === 'Winner',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Winner')
                .length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-5 md:block hidden">
            <div className="flex  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1st set - winner')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === '1st set - winner',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === '1st set - winner',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === '1st set - winner',
              ).length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex   w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '2nd set - winner')[0]
                ?.outcomes?.map((innerItem, innerIndex) => {
                  return (
                    <button
                      key={innerIndex}
                      disabled={innerItem.active ? false : true}
                      onClick={() =>
                        addToBetSlip(
                          item.eventId,
                          innerItem,
                          item.previewMarkets.filter(
                            (item) => item.name === '2nd set - winner',
                          )[0],
                          item.competitors,
                        )
                      }
                      className={`${
                        selectBet(
                          item.eventId,
                          item.previewMarkets.filter(
                            (item) => item.name === '2nd set - winner',
                          )[0].id,
                          innerItem.id,
                        )
                          ? 'bg-green text-white'
                          : ''
                      } bg-[#EAEAEA] flex justify-between  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3`}
                    >
                      {/* <span className="text-center font-[700] flex-1">
                        {innerItem.name}
                      </span> */}
                      <span className="text-[700]">
                        {innerItem.active ? (
                          innerItem.odds
                        ) : (
                          <span>{reactIcons.lock}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === '2nd set - winner',
              ).length === 0 && (
                <div className="flex justify-between">
                  <button className="bg-[#EAEAEA] flex justify-between w-12 h-11  items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                  <button className="bg-[#EAEAEA] flex justify-between  w-12 h-11 items-center mr-1 border-[#A3A3A3] border-[1px] text-black text-12 rounded-md  py-2 px-3"></button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="flex justify-between text-12 text-black">
          <Link
            to={`/dashboard/single-bets/${item.eventId}/${
              item?.competitors[0]?.name + ' vs ' + item?.competitors[1]?.name
            }`}
          >
            <div className="border-[1px]  h-10 w-12 font-[600] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
              <img
                src="/images/bikoicon/moving.png"
                alt="icon"
                className="mx-1"
              />
              <span>{item.openMarkets}</span>
            </div>
          </Link>
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
