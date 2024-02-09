import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

function BetCard({ item, sportId }) {
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
      {sportId === 1 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-5 md:block hidden">
            <div className="flex  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Total')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-fit flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Total')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex justify-between  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Both teams to score')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === 'Both teams to score',
              ).length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 2 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 12 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1x2')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === '1x2')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 10 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Winner')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 21 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner (incl. super over)')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === 'Winner (incl. super over)',
              ).length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {sportId === 5 && (
        <div className="flex justify-between">
          <div className="text-center flex-2 ">
            <div className="flex  items-center w-36 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === 'Winner')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter((item) => item.name === 'Winner')
                .length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center mx-5 md:block hidden">
            <div className="flex  w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '1st set - winner')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === '1st set - winner',
              ).length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="text-center hidden md:block">
            <div className="flex   w-24 text-12 text-[#3D3D3D]">
              {item.previewMarkets
                .filter((item) => item.name === '2nd set - winner')[0]
                ?.outcomes?.map((items) => {
                  return (
                    <div
                      key={items.id}
                      className="border-[1px] mr-1 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] "
                    >
                      {items.odds}
                    </div>
                  );
                })}
              {item.previewMarkets.filter(
                (item) => item.name === '2nd set - winner',
              ).length === 0 && (
                <div className="flex justify-between">
                  <div className="border-[1px] h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                  <div className="border-[1px] ml-2 h-8 w-11 flex justify-center items-center bg-[#EAEAEA] border-[#A3A3A3] cursor-pointer rounded-[4px] ">
                    {/* {items.odds} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="text-center">
        <div className="flex justify-between text-12 text-black">
          <Link
            to={`/dashboard/single-bets/${item.eventId}/${
              item?.competitors[0]?.name + ' vs ' + item?.competitors[1]?.name
            }`}
          >
            <div className="border-[1px]  h-8 w-11 font-[600] flex justify-center items-center text-10 bg-[#EAEAEA] border-[#A3A3A3] rounded-[4px] cursor-pointer ">
              <img
                src="/images/bikoicon/moving.png"
                alt="icon"
                className="mx-1"
              />
              <span>{item.totalMarkets}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

BetCard.propTypes = {
  item: PropTypes.object,
  sportId: PropTypes.number,
};

export default BetCard;
