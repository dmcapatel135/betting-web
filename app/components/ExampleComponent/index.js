import React from 'react';
import PropTypes from 'prop-types';
const ExampleComponent = ({ addonBet, addon }) => {
  return (
    <>
      <div className="flex text-black items-start w-full px-1 md:px-3">
        <div className="h-6 md:h-8 2xl:h-[42px] flex justify-center items-center w-36 md:w-48 text-center text-10 md:text-12 bg-gradient-color-1 text-white rounded-[4px] font-[600]">
          <p className="">TUESDAY, MARCH 19TH 2024</p>
        </div>
        <div className="flex-1 flex justify-end gap-2 sm:gap-3 xl2:gap-4">
          <div className="hidden xl:flex flex-col justify-center gap-2 w-[136px] sm:w-[156px] ">
            <h4 className="text-12 break-all md:text-12 text-center font-[800] text-black xl:min-h-[48px]">
              3 WAY
            </h4>
            <div className="flex justify-center gap-2">
              {[1, 'X', 2].map((value) => (
                <button key={value} className="box-bet">
                  <span>{value}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex-col flex justify-center gap-2 w-[90px] sm:w-[106px]">
            <h4 className="text-12 break-all md:text-12 text-center font-[800] text-black xl:min-h-[48px]">
              OVER/UNDER(2.5)
            </h4>
            <div className="flex justify-center gap-2">
              {['Over', 'Under'].map((value) => (
                <button key={value} className="box-bet">
                  <span>{value}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-col hidden xl:flex justify-center gap-2 w-[90px] sm:w-[106px]">
            <h4 className="text-12 break-all md:text-12 text-center font-[800] text-black xl:min-h-[48px]">
              BOTH TEAMS TO SCORE
            </h4>
            <div className="flex justify-center gap-2">
              {['Yes', 'No'].map((value) => (
                <button key={value} className="box-bet">
                  <span>{value}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="box-bet opacity-0">
            <img
              src="/images/bikoicon/moving.png"
              alt="icon"
              className="mx-1"
            />
            <span className="text-10 md:text-10 2xl:text-12 pr-2">62</span>
          </div>
        </div>
      </div>
      <div className="my-2 flex border rounded-[8px] border-[#A3A3A3] text-black items-center w-full p-1 md:p-3">
        <div className="flex gap-1 flex-col w-36 md:w-52 ">
          <div className="flex gap-[2px] items-center">
            <img src="/images/bikoicon/acute.png" alt="icon" />
            <p className="text-10 md:text-10">
              02:30 PM <span className="font-[600]">Tue 03/19</span>
            </p>
          </div>
          <div className="">
            <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
              Real Madrid SRL
            </h2>
            <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
              KRC Genk SRL
            </h2>
          </div>
          <span className="text-[9px]  md:text-10 2xl:text-12 leading-tight">
            Soccer/Simulated Reality League/SRL Club Friendlies
          </span>
        </div>
        <div className="flex-1 flex justify-end gap-2 sm:gap-3 xl2:gap-4">
          <div className="hidden xl:flex justify-center gap-2 w-[136px] sm:w-[156px] ">
            {addonBet && (
              <>
                <button className="bet-btn">
                  <span className="font-[500]">1.35</span>
                </button>
                <button className="bet-btn">
                  <span className="font-[500]">5</span>
                </button>
                <button className="bet-btn">
                  <span className="font-[500]">6.2</span>
                </button>
              </>
            )}
            {addon && (
              <>
                {[...Array(3)].map((_, index) => (
                  <button key={index} className="bet-btn">
                    <span className="font-[500]">-</span>
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="flex justify-center gap-2 w-[90px] sm:w-[106px]">
            {addonBet && (
              <>
                <button className="bet-btn">
                  <span className="font-[500]">1.38</span>
                </button>
                <button className="bet-btn">
                  <span className="font-[500]">2.75</span>
                </button>
              </>
            )}
            {addon && (
              <>
                {[...Array(2)].map((_, index) => (
                  <button key={index} className="bet-btn">
                    <span className="font-[500]">-</span>
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="hidden xl:flex justify-center gap-2 w-[90px] sm:w-[106px]">
            {addonBet && (
              <>
                <button className="bet-btn">
                  <span className="font-[500]">1.38</span>
                </button>
                <button className="bet-btn">
                  <span className="font-[500]">2.75</span>
                </button>
              </>
            )}
            {addon && (
              <>
                {[...Array(2)].map((_, index) => (
                  <button key={index} className="bet-btn">
                    <span className="font-[500]">-</span>
                  </button>
                ))}
              </>
            )}
          </div>
          <div className="bet-btn cursor-pointer">
            <img
              src="/images/bikoicon/moving.png"
              alt="icon"
              className="mx-1"
            />
            <span className="text-10 md:text-10 2xl:text-12 pr-2">62</span>
          </div>
        </div>
      </div>
    </>
  );
};

ExampleComponent.propTypes = {
  addonBet: PropTypes.bool,
  addon: PropTypes.bool,
};
export default ExampleComponent;
