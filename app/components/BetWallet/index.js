import React from 'react';
import { Link } from 'react-router-dom';

import Balance from '@components/Balance';

function BetWallet() {
  return (
    <div className="w-full border-[1px] border-blue  rounded-[8px]">
      {/* <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
        <p className="text-12 text-black">Not logged in -</p>
        <div className="flex my-2">
          <button className="lg:h-[32px] xxl:h-[48px] lg:w-[60px] xxl:w-[110px] border-[1px] lg:text-12 xxl:text-18 text-white bg-gradient-color-2   rounded-[6px]">
            Login
          </button>
          <button className="lg:h-[32px] xxl:h-[48px] lg:w-[70px] xxl:w-[110px] lg:text-12 xxl:text-18 bg-white ml-3 text-black  border-[1px] border-[#E7A024] rounded-[6px]">
            Join Now
          </button>
        </div>
      </div> */}

      <Balance />
      <div className="px-3 my-3">
        <div className="flex text-black border-[1px] h-10 w-full rounded-[8px]">
          <div className="w-1/2 flex justify-center bg-gradient-color-1 rounded-l-lg items-center">
            <span className="text-12 text-white">Sport</span>
            <img
              src="/images/bikoicon/icon-football.png"
              alt="icon"
              className="mx-2"
            />
            <span className="text-12 text-white">0</span>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <span className="text-12">Virtual</span>
            <img
              src="/images/bikoicon/icon-virtual-sport.png"
              alt="icon"
              className="mx-2"
            />
            <span className="text-12">0</span>
          </div>
        </div>
        {/* <div className="flex items-center my-3">
          <div className="flex items-center">
            <label className="text-12 text-black">Booking code</label>
            <input
              type="text"
              className="w-[120px] mx-3 border-[1px] rounded-sm  border-yellow"
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
        <div className="my-5">
          <button className="py-2 bg-gradient-color-2 w-full rounded-[8px]">
            Learn How To Place Bet
          </button>
        </div> */}
        <div className="h-12 mt-5 flex items-center bg-yellow rounded-br-[16px]">
          <div className="w-5 h-12 bg-gradient-color-4"></div>
          <span className="text-white text-12 leading-4 px-2">
            Congrats! These legs give you a 3% Win Bonus. Add 1 more for 5%.
            1.25 minimum odds.
          </span>
        </div>
      </div>
      <hr className="border-[1px]"></hr>
      <div className="px-3 my-5">
        <div className="h-10 flex justify-center items-center bg-[#02CBDB] rounded-[8px]">
          <span className="text-14 font-[700]">Booking code Generated</span>
        </div>
      </div>
      <div className="border-t-[1px] border-b-[1px] my-5 border-blue">
        <div className="flex">
          <div className="w-10 border-r-[1px] flex justify-center items-center border-blue">
            <img src="/images/bikoicon/close_small.png" alt="icon" />
          </div>
          <div className="flex justify-between w-full px-3 items-center ">
            <div className="text-gray-900">
              <p className="text-12">Manchester United - Chelsa FC</p>
              <span className="text-12 text-black">1X2 - FT (1)</span>
            </div>
            <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
              <span className="text-14 font-[600]">2.95</span>
            </div>
          </div>
        </div>
        <hr className="border-[1px]"></hr>
        <div className="flex">
          <div className="w-10 border-r-[1px] flex justify-center items-center border-blue">
            <img src="/images/bikoicon/close_small.png" alt="icon" />
          </div>
          <div className="flex justify-between w-full px-3 items-center ">
            <div className="text-gray-900">
              <p className="text-12">Manchester United - Chelsa FC</p>
              <span className="text-12 text-black">1X2 - FT (1)</span>
            </div>
            <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
              <span className="text-14 font-[600]">2.95</span>
            </div>
          </div>
        </div>
        <hr className="border-[1px]"></hr>
        <div className="flex">
          <div className="w-10 border-r-[1px] flex justify-center items-center border-blue">
            <img src="/images/bikoicon/close_small.png" alt="icon" />
          </div>
          <div className="flex justify-between w-full px-3 items-center ">
            <div className="text-gray-900">
              <p className="text-12">Manchester United - Chelsa FC</p>
              <span className="text-12 text-black">1X2 - FT (1)</span>
            </div>
            <div className="flex justify-center items-center rounded-md bg-yellow h-7 w-10">
              <span className="text-14 font-[600]">2.95</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex container_main items-center px-3">
        <input type="checkbox" checked />
        <span className="checkmark !left-[5px]"></span>
        <span className="text-black text-12 ml-4">
          Accept odds change.{' '}
          <Link className="underline hover:text-yellow">Learn More</Link>
        </span>
      </div>
      <div className="px-3">
        <span>Your stake</span>
        <div className="h-10 border-[1px] border-yellow rounded-xl flex justify-between my-2">
          <div className="h-[38px] flex justify-center items-center bg-lightestgray w-16 text-center rounded-l-xl">
            <span className="text-24">-</span>
          </div>
          <div className="h-10 w-24 flex justify-center items-center">
            <span className="text-black text-14">1000</span>
          </div>
          <div className="h-[38px] flex justify-center items-center bg-yellow w-16 rounded-r-xl">
            <span className="text-24">+</span>
          </div>
        </div>
        <span className="text-12 text-gray-900">Min stake is 1000</span>
      </div>
      <div className="px-3">
        <div className="flex justify-between text-black">
          <span className="text-12">Odds:</span>
          <span className="text-12">78.23</span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Bonge Bonus 0% (TZS)</span>
          <span className="text-12">0</span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Tax 10% (TZS)</span>
          <span className="text-12">0</span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Net Amount (TZS)</span>
          <span className="text-12">1000</span>
        </div>
        <div className="flex justify-between text-black">
          <span className="text-12">Possible winnings (TZS)</span>
          <span className="text-12">1000</span>
        </div>
      </div>
      <div className="flex my-3 px-3 ">
        <button className="border-[1px] border-yellow w-28 text-gray-900 text-14 font-[700] rounded-md">
          CLEAR ALL
        </button>
        <button className="border-[1px] h-10 ml-3 border-yellow w-40 bg-yellow text-14 font-[700] rounded-md">
          PLACE BET
        </button>
      </div>
    </div>
  );
}

export default BetWallet;
