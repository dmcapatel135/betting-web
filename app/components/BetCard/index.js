import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

function BetCard({ item }) {
  return (
    <div className="md:min-h-32 max-h-fit flex justify-around items-center border-[1px] px-2 md:px-0 rounded-[8px] border-[#A3A3A3] text-black">
      <div className="text-12 w-[140px] md:w-[160px] text-black rounded-[4px] text-left ">
        <div className="flex md:justify-left items-center">
          <img
            src="/images/bikoicon/acute.png"
            // className="w-[20px] h-[16px] md:w-[22px] md:h-[22px]"
          />
          <p className="text-10 ml-1 md:text-12">
            {moment(item?.startTime).format('hh:mm A')}{' '}
            <span className="font-[600]">
              {moment(item?.startTime).format('ddd MM/DD')}
            </span>
          </p>
          <img
            src="/images/bikoicon/vector.png"
            alt="icon"
            className="md:block hidden  ml-1"
          />
        </div>
        <h2 className="text-12 md:text-14 leading-5 font-[700]">
          {item?.competitors[0]?.name || 'N.A'} v/s{' '}
          {item?.competitors[1]?.name || 'N.A'}{' '}
        </h2>
        <span className="text-[9px]  leading-none md:text-10">
          {item?.sport?.name}/{item?.category?.name}/{item?.tournament?.name}
        </span>
      </div>
      <div className="text-center flex-2">
        <div className="flex justify-between items-center w-36 text-12 text-[#3D3D3D]">
          <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
            2.55
          </div>
          <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
            2.55
          </div>
          <div className="border-[1px]  h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
            2.55
          </div>
        </div>
      </div>
      <div className="text-center md:block hidden">
        <div className="flex justify-between w-24 text-12 text-[#3D3D3D]">
          <div className="border-[1px] h-8 w-11 text-12 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
            2.55
          </div>
          <div className="border-[1px] h-8 w-11 text-12 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
            2.55
          </div>
        </div>
      </div>
      <div className="text-center hidden md:block">
        <div className="flex justify-between  w-24 text-12 text-[#3D3D3D]">
          <div className="border-[1px] h-8 w-11 flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
            2.55
          </div>
          <div className="border-[1px] h-8 flex justify-center items-center w-11 text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
            2.55
          </div>
        </div>
      </div>
      <div className="text-center">
        <div className="flex justify-between text-12 text-black">
          <Link to={`/dashboard/single-bets/${item.eventId}`}>
            <div className="border-[1px]  h-8 w-11 font-[600] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
              <img
                src="/images/bikoicon/moving.png"
                alt="icon"
                className="mx-1"
              />
              <span>87</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

BetCard.propTypes = {
  item: PropTypes.object,
};

export default BetCard;
