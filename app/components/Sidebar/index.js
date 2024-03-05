import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NavLink, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { MyContext } from '@components/MyContext/MyContext';

import { reactIcons } from '@utils/icons';

import { navigations } from './constants';
import { MyContext } from '@components/MyContext/MyContext';
import { getReq } from '@utils/apiHandlers';

function Sidebar({
  isMobileSidebar,
  // tab,
  setTab,
  setIsOpenMenuList,
  isOpenMenuList,
}) {
  const [isOpenTournament, setIsOpenTournament] = useState(true);
  const [isOpenpopularCountry, setIsOpenpopularCountry] = useState(false);
  const [isOpenLeague, setIsOpenLeague] = useState(false);
  const [searchParams] = useSearchParams(window.location.search);
  const [leagues, setLeagues] = useState([]);

  const {
    allTournaments,
    setSelectTournament,
    categories,
    selectTournament,
    sportId,
  } = useContext(MyContext);

  const getLeagues = useCallback(
    async (query) => {
      const response = await getReq(
        `/sports/${sportId}/tournaments?${query}&haveEvents=true`,
      );
      setLeagues(response.data);
      // console.log('------responset ', response.data);
    },
    [sportId],
  );

  useEffect(() => {
    if (isOpenLeague) getLeagues(isOpenLeague);
  }, [isOpenLeague, getLeagues]);

  return (
    <div
      className={` min-h-screen h-full w-full   md:block bg-white ${
        isMobileSidebar
          ? 'border-r-[1px] border-black  bg-opacity-[0.53] bg-white backdrop-blur-[20px]'
          : 'bg-white border-[1px] border-[#A3A3A3] pt-3'
      }`}
    >
      {isMobileSidebar && (
        <div
          onClick={() => setIsOpenMenuList(!isOpenMenuList)}
          className="text-black flex justify-end text-20"
        >
          {reactIcons.close}
        </div>
      )}
      <div className="">
        <div className="flex flex-col items-start  border-b-black gap-5">
          <ul className="grid grid-cols-1 w-full gap-1 md:gap-2 pl-3">
            {navigations.map((item, index) => (
              <div
                key={index}
                className={`${item.title === 'HOME' ? 'md:block hidden' : ''}`}
              >
                <NavLink
                  key={index}
                  end
                  onClick={() => {
                    setTab(item.id);
                    setSelectTournament(null);
                  }}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 lg:py-2  md:text-16 xxl:text-20 h-10 text-gray-900 font-[500]   cursor-pointer  2xl:text-base ${
                      isActive
                        ? 'bg-gradient-color-1 text-white flex rounded-l-md items-center gap-3'
                        : ' hover:bg-primary-yellow  flex items-center gap-3'
                    }`
                  }
                >
                  {item.title == 'NOW' ? (
                    <div className="bg-blue w-14 px-1 flex items-center  text-white rounded-sm">
                      <span className="w-3 h-3 rounded-full mx-1  bg-white"></span>
                      <span className="text-[13px]">LIVE</span>
                    </div>
                  ) : (
                    <img
                      src={
                        item.path == window.location.pathname
                          ? item.active_icon
                          : item.icon
                      }
                      className="w-[22px] h-[22px]"
                    />
                  )}
                  <span className="text-12 lg:text-[13px] xxl:text-[16px]">
                    {' '}
                    {item.title}
                  </span>
                </NavLink>
              </div>
            ))}
          </ul>
        </div>
        <div className="text-black pl-3">
          <div
            className="flex justify-between items-center cursor-pointer rounded-l-md h-10 px-3 bg-gradient-color-2 my-2"
            onClick={() => {
              setIsOpenTournament(!isOpenTournament);
              setIsOpenpopularCountry(false);
            }}
          >
            <h className="text-white text-14 font-[500] leading-3 lg:leading-none lg:text-14 xxl:text-18">
              TOURNAMENTS
            </h>
            <span className="text-white">
              {isOpenTournament ? reactIcons.arrowup : reactIcons.arrowdown}
            </span>
          </div>
          {isOpenTournament && (
            <div className="pl-2 overflow-y-auto custom-scroll-sm max-h-64 min-h-8">
              <ul>
                {allTournaments?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className={`flex items-center  hover:text-blue justify-between cursor-pointer text-black ${
                        (searchParams.get('eId') || selectTournament) == item.id
                          ? ' bg-yellow font-[600] text-white w-full '
                          : 'text-black'
                      } `}
                      onClick={() => {
                        setSelectTournament(item.id);
                      }}
                    >
                      {/* <img src={item.icon} alt="i" className="w-3 h-3" /> */}
                      <span className="text-12 mx-2  rounded-sm pl-2 font-[500]">
                        {item.name}
                      </span>
                      <span className="text-12 pr-2 font-[500]">
                        {item.events}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {/* {sportId == 1 && ( */}
        <div className="text-black pl-3">
          <div
            className="flex justify-between items-center cursor-pointer rounded-l-md h-10 px-3 bg-gradient-color-1 my-2"
            onClick={() => {
              setIsOpenTournament(false);
              setIsOpenpopularCountry(!isOpenpopularCountry);
            }}
          >
            <h className="text-white text-14 font-[500] leading-3 lg:leading-none lg:text-14 xxl:text-18">
              POPULAR COUNTRIES
            </h>
            <span className="text-white">
              {isOpenpopularCountry ? reactIcons.arrowup : reactIcons.arrowdown}
            </span>
          </div>
          {isOpenpopularCountry && (
            <div className="pl-2 overflow-y-auto custom-scroll-sm max-h-64 min-h-8">
              <ul>
                {categories.map((item) => {
                  return (
                    <div key={item.id} className="px-3">
                      <li
                        className="flex text-black cursor-pointer justify-between items-center"
                        onClick={() => {
                          if (isOpenLeague == item.id) {
                            setIsOpenLeague(null);
                          } else {
                            setIsOpenLeague(item.id);
                          }
                        }}
                      >
                        <div className="flex w-full justify-between items-center">
                          <div>
                            <span>
                              <i
                                className={`fi fi-${
                                  item?.flag ? item?.flag?.toLowerCase() : 'un'
                                }`}
                                // className="fi fi-us"
                              ></i>
                            </span>
                            {/* <img src={item.flag} alt="i" className="w-3 h-3" /> */}
                            <span className="text-10 mx-2 font-[500] text-black">
                              {item.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-12 font-[500]">
                              {item.events}
                            </span>
                            <span className="text-12 pl-2">
                              {reactIcons.arrowdown}
                            </span>
                          </div>
                        </div>
                        {/* <span>{reactIcons.arrowdown}</span> */}
                      </li>
                      {isOpenLeague == item.id &&
                        leagues?.map((items) => {
                          return (
                            <div
                              onClick={() => setSelectTournament(items.id)}
                              key={items.id}
                              className={`px-5 cursor-pointer ${
                                items.id == selectTournament
                                  ? 'bg-yellow text-white'
                                  : 'bg-white'
                              } hover:text-blue`}
                            >
                              <li className="flex justify-between">
                                <span className="text-12 font-[500]">
                                  {items.name}
                                </span>
                                <span className="text-12 font-[500]">
                                  {items.events}
                                </span>
                              </li>
                            </div>
                          );
                        })}
                    </div>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        {/* )} */}
        <div className="text-black pl-3">
          <div className="flex justify-between cursor-pointer items-center rounded-l-md h-10 px-3 bg-gradient-color-2 my-2">
            <h className="text-white  text-12 leading-3 lg:leading-none lg:text-14 xxl:text-18 ">
              OTHER COUNTRIES
            </h>
            <span className="text-white">{reactIcons.arrowdown}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  isMobileSidebar: PropTypes.bool,
  tab: PropTypes.string,
  setTab: PropTypes.string,
  setIsOpenMenuList: PropTypes.bool,
  isOpenMenuList: PropTypes.bool,
};

export default Sidebar;
