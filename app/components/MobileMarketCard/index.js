import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function MobileMarketCard({ item, market }) {
  const navigate = useNavigate();
  return (
    <div className="border flex items-center  border-lightgray text-black">
      <div className="flex-grow-0 xxl:flex-1 pl-2 py-2]">
        <div className="items-center w-40 md:w-full xxl:w-full xxl:text-center text-[8px] md:text-10 ">
          <div className="flex items-center">
            <img src="/images/bikoicon/acute.png" />
            <p className="text-10 ml-1 md:text-10">
              {moment(item?.startTime).format('hh:mm A')}{' '}
              <span className="font-[600]">
                {moment(item?.startTime).format('ddd MM/DD')}
              </span>
            </p>
            {item.popular && (
              <img
                src="/images/bikoicon/vector.png"
                alt="icon"
                className="md:block hidden  ml-1"
              />
            )}
          </div>
          <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
            {item?.competitors[0]?.name || 'N.A'}
            {/* v/s{' '} */}
          </h2>
          <h2 className="text-10 md:text-14 leading-3 md:leading-5 font-[700]">
            {item?.competitors[1]?.name || 'N.A'}{' '}
          </h2>
          <span className="text-[9px]  leading-none md:text-10">
            {item?.sport?.name}/{item?.category?.name}/{item?.tournament?.name}
          </span>
        </div>
      </div>
      <div className="flex-1 ">
        <div className="flex gap-3 justify-center">
          {market?.outcomes?.map((mkt) => {
            return (
              <button
                key={mkt.id}
                className="text-black border text-12 border-black w-[36px] rounded-sm"
              >
                {mkt.odds}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex-grow-0">
        <div className=" border-solid md:w-16 2xl:w-[72px] text-black">
          <div
            onClick={() => {
              // setTab(null);
              navigate(
                `${item.onlyLive ? `/dashboard/single-bets/${item.eventId}?onlyLive=true` : `/dashboard/single-bets/${item.eventId}`}`,
              );
            }}
            className="border mr-2 w-[40px] h-6 md:h-8 md:min-w-[45px] 2xl:w-[48px] 2xl:h-[36px] 2xl:text-14 md:max-w-fit font-[500] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer"
          >
            <img
              src="/images/bikoicon/moving.png"
              alt="icon"
              className="mx-1"
            />
            <span className="text-10 md:text-10 2xl:text-12 pr-2">
              {item.openMarkets}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

MobileMarketCard.propTypes = {
  openMarket: PropTypes.number,
  item: PropTypes.object,
  market: PropTypes.object,
};

export default MobileMarketCard;
