import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fetchJackpotDetailsAction } from '@actions';
import { useDispatch, useSelector } from 'react-redux';

function JackpotDetailCard({ fixtures }) {
  const selectedJackpot = useSelector((state) => state.jackpot.selectedJackpot);

  const [bets, setBets] = useState([]);

  const dispatch = useDispatch();

  const handleRemoveBet = (eventId, marketId, outcomeventId) => {
    const index = selectedJackpot.findIndex(
      (item) =>
        item.eventId == eventId &&
        item.betDetails.id == marketId &&
        item.bet.id == outcomeventId,
    );

    if (index !== -1) {
      const bets = [...selectedJackpot]; // Create a copy of selectedBet array
      bets.splice(index, 1); // Remove the element at the found index
      dispatch(fetchJackpotDetailsAction(bets)); // Dispatch the updated array
    } else {
      console.log('Bet not found');
    }
  };

  const addToBetSlip = (eventId, bet, betDetails, eventNames) => {
    setBets((prev) => {
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
    });
    // }
  };

  useEffect(() => {
    setBets(selectedJackpot);
  }, [selectedJackpot]);

  useEffect(() => {
    if (bets.length > 0) {
      dispatch(fetchJackpotDetailsAction(bets));
    }
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeventId) => {
    const bet = selectedJackpot.find(
      (bet) =>
        bet.eventId == parseInt(eventId) &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeventId,
    );

    if (bet) return true;
    else return false;
  };

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
          <p>{fixtures?.mappedEvent?.competitors[0].name || 'N.A'}</p>
          <p>{fixtures?.mappedEvent?.competitors[1].name || 'N.A'}</p>
        </div>
        <div className="flex-1 mr-5 flex justify-between items-center">
          {fixtures?.market?.outcomes?.map((item, index) => {
            return (
              <div
                onClick={() => {
                  if (
                    selectBet(
                      fixtures?.mappedEventId,
                      fixtures?.market?.id,
                      item?.id,
                    )
                  ) {
                    console.log('----if condi');
                    handleRemoveBet(
                      fixtures?.mappedEventId,
                      fixtures?.market?.id,
                      item?.id,
                    );
                  } else {
                    console.log('----ekse condi');

                    addToBetSlip(
                      fixtures?.mappedEventId,
                      item,
                      fixtures?.market,
                      fixtures?.mappedEvent?.competitors[0].name +
                        '-' +
                        fixtures?.mappedEvent?.competitors[1].name,
                    );
                  }
                }}
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
