import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from '@utils/constants';

function JackpotCard({
  setOpenCard,
  item,
  index,
  handleGetJackpotFixtures,
  setStakeValue,
}) {
  return (
    <div className="bg-gray-800 border-[1px] border-blue rounded-md p-4">
      <div className="flex gap-10 text-black">
        <h1 className="font-[700] text-14 md:text-16 2xl:text-22">
          TSH {formatNumber(item?.prizePool)}
        </h1>
        <div className="flex-1">
          <p className="text-12 md:text-14 2xl:text-18 font-[600]">
            {item.name || 'BIKO WEEKLY JACKPOT'}
          </p>
          <p className="text-10 md:text-12 2xl:text-16 font-[500] pt-2">
            PICK {item.totalMatches} GAMES, PRIZES FROM CORRECT{' '}
            {item.requisiteWins}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <button
          onClick={() => {
            setOpenCard(item.id);
            handleGetJackpotFixtures(item.id);
            setStakeValue(item.betAmount);
          }}
          className={`w-full text-12 md:text-14 2xl:text-16 h-[42px]  ${
            index % 2 == 0 ? 'bg-[#BD1842]' : 'bg-[#006E8F]'
          } text-white rounded-md `}
        >
          Play for TSH. {item.betAmount}
        </button>
      </div>
    </div>
  );
}

JackpotCard.propTypes = {
  setOpenCard: PropTypes.number,
  item: PropTypes.object,
  index: PropTypes.number,
  handleGetJackpotFixtures: PropTypes.func,
  setStakeValue: PropTypes.number,
};

export default JackpotCard;
