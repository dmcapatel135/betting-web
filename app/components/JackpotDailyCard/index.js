import React from 'react';

function JackpotDailyCard() {
  return (
    <div className="bg-gray-800 border-[1px] border-blue rounded-md py-3">
      <div className="flex text-black">
        <div className="ml-5">
          <h1 className="font-[700] text-16">TSH, 10,000,000</h1>
        </div>
        <div className="flex-1 mx-10">
          <p className="text-14 font-[600]">BIKO DAILY JACKPOT</p>
          <span className="text-12 font-[500]">
            PICK 13 GAMES, PRIZES FROM CORRECT 10
          </span>
        </div>
      </div>
      <div className="px-4 my-2">
        <button className="w-full text-14  bg-[#006E8F] text-white rounded-md h-8">
          Play for TSH. 250
        </button>
      </div>
    </div>
  );
}

export default JackpotDailyCard;
