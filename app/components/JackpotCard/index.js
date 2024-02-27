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
    <div className="bg-gray-800 border-[1px] border-blue rounded-md py-3">
      <div className="flex text-black">
        <div className="ml-5">
          <h1 className="font-[700] text-14 md:text-16">
            TSH, {formatNumber(item?.prizePool)}
          </h1>
        </div>
        <div className="flex-1 mx-10">
          <p className="text-12 md:text-14 font-[600]">
            {item.name || 'BIKO WEEKLY JACKPOT'}
          </p>
          <span className="text-10 md:text-12 font-[500]">
            PICK {item.totalMatches} GAMES, PRIZES FROM CORRECT{' '}
            {item.requisiteWins}
          </span>
        </div>
      </div>
      <div className="px-4 my-2">
        <button
          onClick={() => {
            setOpenCard(index);
            handleGetJackpotFixtures(item.id);
            setStakeValue(item.betAmount);
          }}
          className={`w-full text-12 md:text-14  ${
            index % 2 == 0 ? 'bg-[#BD1842]' : 'bg-[#006E8F]'
          } text-white rounded-md h-8`}
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
