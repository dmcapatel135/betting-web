import React from 'react';

function RatingSlider() {
  return (
    <div className="bg-white py-3  h-24 boxshadow-lg rounded-lg relative border-[1px] border-lightestgray ">
      <div className="px-5 flex text-black items-center h-full">
        <marquee direction="left">
          <div className="flex">
            <div className="running-div">
              <div className="flex ">
                <img
                  src="/images/icons/trade_icon.png"
                  alt="icon"
                  className="px-0"
                />
                <div className="w-40 text-right">
                  <div className="flex items-center justify-end">
                    <img src="/images/icons/arrow_drop_down_red.png" />
                    <p className="pl-2">9.06%</p>
                  </div>
                  <h1>XTBTJDS 0.635100</h1>
                </div>
                <div className="border-l-2 border-lightgray h-12 mx-5"></div>
              </div>
            </div>
            <div className="running-div">
              <div className="flex ">
                <img
                  src="/images/icons/trade_icon.png"
                  alt="icon"
                  className="px-0"
                />
                <div className="border-l-2 border-lightgray h-12 mx-10"></div>
              </div>
            </div>
          </div>
        </marquee>
      </div>
    </div>
  );
}

export default RatingSlider;
