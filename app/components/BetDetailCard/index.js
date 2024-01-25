import React from 'react';

function BetDetailCard() {
  return (
    <div className="border-[1px] border-[#A3A3A3]  shadow-md rounded-[8px]">
      <div className="grid grid-cols-12 p-3">
        <div className="col-span-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Date
              </p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Bet ID
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                2023-12-08 14:36
              </p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                137946
              </p>
            </div>
            <hr className=" w-[1px] h-10 mx-4 border-[1px]"></hr>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Games
              </p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Possible Win TSH
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">1</p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                1.3
              </p>
            </div>
            <hr className=" w-[1px] h-10 ml-4 border-[1px]"></hr>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex justify-around">
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Odds
              </p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                Stake TZS
              </p>
            </div>
            <div>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">
                1.33
              </p>
              <p className="text-gray-900 text-14 xxl:text-16 font-[600]">1</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-[1px] my-1 mx-3"></hr>
      <div className="flex justify-end my-2 px-3">
        <button className="flex bg-lightestgray px-3 mx-1 py-1 text-14 font-[600]  rounded-[8px]">
          <img src="/images/bikoicon/cancel.png" alt="icon" className="mx-2" />
          Cancelled
        </button>
        <button className="flex bg-bluewhalelight text-14 font-[600]  text-white px-3 mx-1 py-1 rounded-[8px]">
          <img
            src="/images/bikoicon/reply_all.png"
            alt="icon"
            className="mx-2"
          />
          Share
        </button>
        <button className="flex bg-green text-14 font-[600] text-white px-3 mx-1 py-1 rounded-[8px]">
          <img src="/images/bikoicon/rebet.png" alt="icon" className="mx-2" />
          Rebet
        </button>
        {/* <button className="flex bg-maroon text-14 font-[600] text-white px-3 mx-1 py-1 rounded-[8px]">
          <img src="/images/bikoicon/lost.png" alt="icon" className="mx-2" />
          LOST
        </button>
        <button className="flex bg-green text-14 font-[600] text-white px-3 mx-1 py-1 rounded-[8px]">
          <img src="/images/bikoicon/won.png" alt="icon" className="mx-2" />
          WON
        </button> */}
      </div>
    </div>
  );
}

export default BetDetailCard;
