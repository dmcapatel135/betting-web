import React from 'react';
import PropTypes from 'prop-types';
import { Balance } from '@components';
// import { Link } from 'react-router-dom';
import { isLoggedIn } from '@utils/apiHandlers';

function BetSlip() {
  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px]">
      {isLoggedIn() ? (
        <Balance />
      ) : (
        <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
          <p className="text-12 text-black">Not logged in -</p>
          <div className="flex my-2">
            {/* <Link to="/login"> */}
            <button
              onClick={() => (window.location.href = '/login')}
              className="h-[32px] xxl:h-[48px] w-[60px] xxl:w-[110px] border-[1px] border-[#E7A024] text-12 xxl:text-18 hover:text-white bg-white text-black  hover:bg-gradient-color-2   rounded-[6px]"
            >
              Login
            </button>
            {/* </Link> */}
            {/* <Link to="/join-now"> */}
            <button
              onClick={() => (window.location.href = '/join-now')}
              className="h-[32px] xxl:h-[48px] w-[70px] xxl:w-[110px] text-12 xxl:text-18 bg-white ml-3 text-black  border-[1px] border-[#E7A024] hover:bg-gradient-color-2 hover:text-white rounded-[6px]"
            >
              Join Now
            </button>
            {/* </Link> */}
          </div>
        </div>
      )}
      <div className="flex items-center my-3 px-3">
        <div className="flex items-center">
          <span className="text-12 text-black">Booking code</span>
          <input
            type="text"
            className="w-[150px] mx-3 h-8  border-[1px] text-gray-900 px-2 text-14 outline-none rounded-sm  border-yellow"
          />
        </div>
        <button className="px-3 h-8 bg-gradient-color-2 text-12 rounded-sm">
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
  seletedBet: PropTypes.array,
};
export default BetSlip;
