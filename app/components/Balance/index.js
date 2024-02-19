import React from 'react';
import { Link } from 'react-router-dom';

function Balance() {
  return (
    <div className="flex justify-between border-b-[1px] border-blue items-center px-3">
      <div className="px-3 h-8 flex justify-center items-center rounded-[8px] bg-yellow">
        <Link to="/dashboard/my-bets">
          <p className="text-12 text-white font-[600] cursor-pointer">
            View My Bets
          </p>
        </Link>
      </div>
      <div className="flex my-2">
        <span className="text-black text-14">Your Balance</span>
        <span className="text-black text-16 font-[700]">TSH 102.00</span>
      </div>
    </div>
  );
}

export default Balance;
