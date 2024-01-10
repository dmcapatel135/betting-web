import React from 'react';
import PropTypes from 'prop-types';
import { Balance } from '@components';

function BetSlip({ wallet }) {
  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px]">
      {wallet ? (
        <Balance />
      ) : (
        <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
          <p className="text-12 text-black">Not logged in -</p>
          <div className="flex my-2">
            <button className="lg:h-[32px] xxl:h-[48px] lg:w-[60px] xxl:w-[110px] border-[1px] lg:text-12 xxl:text-18 text-white bg-gradient-color-2   rounded-[6px]">
              Login
            </button>
            <button className="lg:h-[32px] xxl:h-[48px] lg:w-[70px] xxl:w-[110px] lg:text-12 xxl:text-18 bg-white ml-3 text-black  border-[1px] border-[#E7A024] rounded-[6px]">
              Join Now
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center my-3 px-3">
        <div className="flex items-center">
          <span className="text-12 text-black">Booking code</span>
          <input
            type="text"
            className="w-[165px] mx-3 border-[1px] text-gray-900 px-2 text-12 outline-none rounded-sm  border-yellow"
          />
        </div>
        <button className="px-3 bg-gradient-color-2 text-12 rounded-sm">
          Load
        </button>
      </div>
      <div className="text-center">
        <div className="my-5 flex justify-center">
          <img src="/images/bikoicon/betIcon.png" alt="beticon" />
        </div>
        <span className="text-14 font-[600] text-[#BD1842]">
          Betslip is empty
        </span>
      </div>
      <div className="my-5 px-3">
        <button className="py-2 bg-gradient-color-2 w-full rounded-[8px]">
          Learn How To Place Bet
        </button>
      </div>
    </div>
  );
}

BetSlip.propTypes = {
  wallet: PropTypes.string,
};
export default BetSlip;
