import React from 'react';
import PropTypes from 'prop-types';
import { reactIcons } from '@utils/icons';

function BettingInfoCard({ text, bgColor, note, market, slip, odds, only }) {
  return (
    <div>
      <div className="relative flex justify-center items-center border-2 bg-[#DFDBEE] rounded-sm border-green w-full  h-28 mt-3">
        <div
          className={`${bgColor ? 'bg-green text-white py-1  px-2 font-[600]' : 'text-black text-[500] text-center'} w-full`}
        >
          <span className="text-12 ">{text}</span>
          {market && (
            <div>
              <h1 className="text-14 font-[600]">3 WAY</h1>
              <div className="flex justify-between px-8 mt-2    ">
                <button className="border border-black w-14 rounded-[3px]">
                  1
                </button>
                <button className="border border-black w-14 rounded-[3px]">
                  X
                </button>
                <button className="border border-black w-14 rounded-[3px]">
                  2
                </button>
              </div>
            </div>
          )}
          {odds && (
            <div className="px-2">
              <div className="flex">
                <span>Total Odds </span>
                <strong className="mx-3">4.47</strong>
              </div>
              <div className="flex">
                <input type="checkbox" checked />
                <span className="mx-2">Accept any odds change</span>
              </div>
              <div className="flex">
                <span>Stake</span>
                <input
                  type="text"
                  value="100"
                  disabled
                  className="w-16 px-2 text-black border-2 rounded-md mx-3 border-black"
                />
              </div>
            </div>
          )}
          {slip && (
            <div>
              <div className="bg-yellow flex justify-between px-2 items-center">
                <span className="text-black text-16 ml-3">
                  {reactIcons.receipt}
                </span>
                <h1 className="text-14 font-[600]">BETSLIP (JAMVI)</h1>
                <h1>0</h1>
              </div>
              <div className="flex px-2 my-1">
                <p>TOTAL ODDS </p> <strong className="mx-5">1</strong>
              </div>
              <div className="flex px-3">
                <span>Stake</span>
                <input
                  type="number"
                  className="w-16 px-2 mx-5 rounded-md"
                  value={2000}
                />
              </div>
              <p>Wallet</p>
            </div>
          )}
        </div>
        <div className="absolute w-6 h-6 rounded-full top-[-10px] border bg-green border-green -left-[10px] z-30"></div>
        {only && (
          <div className="absolute w-6 h-6 rounded-full bottom-[-10px] border bg-green border-green -left-[10px] z-30"></div>
        )}
      </div>
      <span className="text-12 text-gray-900">{note}</span>
    </div>
  );
}

BettingInfoCard.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.bool,
  note: PropTypes.string,
  market: PropTypes.bool,
  slip: PropTypes.bool,
  odds: PropTypes.bool,
  only: PropTypes.bool,
};

export default BettingInfoCard;
