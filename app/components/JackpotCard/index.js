import React from 'react';
import PropTypes from 'prop-types';

function JackpotCard({ setOpenCard }) {
  return (
    <div className="bg-gray-800 border-[1px] border-blue rounded-md py-3">
      <div className="flex text-black">
        <div className="ml-5">
          <h1 className="font-[700] text-16">TSH, 50,000,00</h1>
        </div>
        <div className="flex-1 mx-10">
          <p className="text-14 font-[600]">BIKO WEEKLY JACKPOT</p>
          <span className="text-12 font-[500]">
            PICK 17 GAMES, PRIZES FROM CORRECT 13
          </span>
        </div>
      </div>
      <div className="px-4 my-2">
        <button
          onClick={() => setOpenCard(true)}
          className="w-full text-14  bg-[#BD1842] text-white rounded-md h-8"
        >
          Play for TSH. 1000
        </button>
      </div>
    </div>
  );
}

JackpotCard.propTypes = {
  setOpenCard: PropTypes.bool,
};

export default JackpotCard;
