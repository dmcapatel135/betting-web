import React from 'react';

function ResultJackpotCard() {
  return (
    <div className="border border-blue text-black p-3 rounded-md">
      <div>
        <div className="flex justify-between">
          <div>
            <p>09:04 am Thu 28/03</p>
            <span className="text-12">ID :#157230221 - 30/03 Pick17 - 1x2</span>
          </div>
          <strong>PENDING</strong>
        </div>
        <div className="flex justify-between">
          <div>
            <p className="text-14">TICKETS</p>
            <strong>1</strong>
          </div>
          <div>
            <p className="text-14">Stake</p>
            <strong>Tsh 100</strong>
          </div>
          <div className="text-end">
            <p className="text-14">JACKPOT</p>
            <span>
              {/* MISSED<strong className="text-red-600">10</strong> */}
              <strong>Tsh 200,000,000</strong>
            </span>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}

export default ResultJackpotCard;
