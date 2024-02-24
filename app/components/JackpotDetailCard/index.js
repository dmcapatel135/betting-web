import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchBetDetailsAction } from '@actions';
import { useDispatch, useSelector } from 'react-redux';

function JackpotDetailCard({ fixtures }) {
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [bets, setBets] = useState([]);

  const dispatch = useDispatch();

  const addToBetSlip = (eventId, bet, betDetails, eventNames) => {
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId == parseInt(eventId));
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
          // sportId: sId,
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
            // sportId: sId,
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
    if (bets.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
    }
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeventId) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == parseInt(eventId) &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeventId,
    );

    if (bet) return true;
    else return false;
  };

  console.log('----fixtures ', fixtures);

  return (
    <div className="bg-white border-[1px] rounded-md border-lightgray border-md px-3">
      <div className="flex justify-between py-2">
        <div className=" flex-1 text-black">
          <p className="text-12 mb-5">
            {/* 11:15 pm Wed 06/12 */}
            {moment(fixtures?.mappedEvent?.startTime).format(
              'hh:mm a ddd MM/DD',
            )}
          </p>
          <span className="text-10 mt-20 text-gray-900">
            {/* Football/England/Premier League */}
            {fixtures?.mappedEvent?.tournament?.category?.sport?.name}/
            {fixtures?.mappedEvent?.tournament?.category?.name}/
            {fixtures?.mappedEvent?.tournament?.name}
          </span>
        </div>
        <div className="flex-1 text-14 font-[500] text-center text-black">
          <p>{fixtures?.mappedEvent?.competitors[0].shortName || 'N.A'}</p>
          <p>{fixtures?.mappedEvent?.competitors[1].shortName || 'N.A'}</p>
        </div>
        <div className="flex-1 mr-5 flex justify-between items-center">
          {fixtures?.market?.outcomes?.map((item, index) => {
            return (
              <div
                onClick={() =>
                  addToBetSlip(
                    fixtures?.mappedEventId,
                    item,
                    fixtures?.market,
                    fixtures?.mappedEvent?.competitors[0].shortName +
                      '-' +
                      fixtures?.mappedEvent?.competitors[1].shortName,
                  )
                }
                key={index}
                className={`flex justify-center rounded-md items-center ${
                  selectBet(
                    fixtures?.mappedEventId,
                    fixtures?.market?.id,
                    item?.id,
                  )
                    ? 'bg-green text-white'
                    : 'bg-gray-800'
                } text-gray-900 text-12 w-12 h-8 border-[1px] cursor-pointer border-lightgray`}
              >
                <span>{item.odds}</span>
              </div>
            );
          })}
          {fixtures?.market == null && (
            <div className="flex justify-between w-full">
              <div
                className="flex justify-center rounded-md items-center 
                bg-gray-800
               text-gray-900 text-12 w-12 h-8 border-[1px] cursor-pointer border-lightgray"
              >
                <span>-</span>
              </div>
              <div
                className="flex justify-center rounded-md items-center 
                bg-gray-800
               text-gray-900 text-12 w-12 h-8 border-[1px] cursor-pointer border-lightgray"
              >
                <span>-</span>
              </div>
              <div
                className="flex justify-center rounded-md items-center 
                bg-gray-800
               text-gray-900 text-12 w-12 h-8 border-[1px] cursor-pointer border-lightgray"
              >
                <span>-</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

JackpotDetailCard.propTypes = {
  fixtures: PropTypes.object,
};

export default JackpotDetailCard;
