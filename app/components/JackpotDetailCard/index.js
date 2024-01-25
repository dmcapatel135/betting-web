import React from 'react';

function JackpotDetailCard() {
  return (
    <div className="bg-white border-[1px] rounded-md border-lightgray border-md px-3">
      <div className="flex justify-between py-2">
        <div className=" flex-1 text-black">
          <p className="text-12 mb-5">11:15 pm Wed 06/12</p>
          <span className="text-10 mt-20 text-gray-900">
            Football/England/Premier League
          </span>
        </div>
        <div className="flex-1 text-14 font-[500] text-center text-black">
          <p>Manchester United </p>
          <p>Chelsa FC</p>
        </div>
        <div className="flex-1 mr-5 flex justify-between items-center">
          <div className="flex justify-center rounded-md items-center bg-gray-800 text-gray-900 text-12 w-12 h-12 border-[1px] border-lightgray">
            <span>2.55</span>
          </div>
          <div className="flex justify-center rounded-md items-center text-gray-900 bg-gray-800 text-12 w-12 h-12 border-[1px] border-lightgray">
            <span>2.55</span>
          </div>
          <div className="flex justify-center items-center rounded-md text-gray-900 bg-gray-800 text-12 w-12 h-12 border-[1px] border-lightgray">
            <span>2.55</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JackpotDetailCard;
