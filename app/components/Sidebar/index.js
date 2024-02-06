import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { MyContext } from '@components/MyContext/MyContext';

import { reactIcons } from '@utils/icons';

import { navigations, popularCountries } from './constants';
import { MyContext } from '@components/MyContext/MyContext';

function Sidebar({
  isMobileSidebar,
  // allTournaments,
  // setSelectTournament,
  // selectTournament,
}) {
  const [isOpenTournament, setIsOpenTournament] = useState(true);
  const [isOpenpopularCountry, setIsOpenpopularCountry] = useState(false);
  const [isOpenLeague, setIsOpenLeague] = useState(false);
  const [selectMenuName, setSelectMenuName] = useState('HOME');
  const { allTournaments, setSelectTournament, selectTournament, setTab } =
    useContext(MyContext);

  return (
    <div
      className={`pt-3  min-h-screen h-full w-full   md:block bg-white ${
        isMobileSidebar
          ? 'border-r-[1px] border-black  bg-opacity-[0.53] bg-white backdrop-blur-[20px]'
          : 'bg-white border-[1px] border-[#A3A3A3]'
      }`}
    >
      <div className="">
        <div className="flex flex-col items-start  border-b-black gap-5">
          <ul className="grid grid-cols-1 w-full gap-1 md:gap-2 pl-3">
            {navigations.map((item, index) => (
              <div
                key={index}
                className={`${
                  item.title === 'HOME' ? 'md:block hidden' : 'block'
                }`}
              >
                <NavLink
                  key={index}
                  end
                  onClick={() => {
                    setSelectMenuName(item.title);
                    if (index === 1) {
                      setTab(4);
                    } else if (index === 0) {
                      setTab(2);
                    } else if (index === 2) {
                      setTab(3);
                    }
                  }}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 lg:py-2  md:text-12 xxl:text-14 h-10 text-gray-900 font-[500]   cursor-pointer  2xl:text-base ${
                      isActive || selectMenuName === item.title
                        ? 'bg-gradient-color-1 text-white flex rounded-l-md items-center gap-3'
                        : ' hover:bg-primary-yellow  flex items-center gap-3'
                    }`
                  }
                >
                  <img
                    src={
                      selectMenuName === item.title
                        ? item.active_icon
                        : item.icon
                    }
                    className="w-[18px] h-[18px]"
                  />
                  <span className="text-12 "> {item.title}</span>
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
            <h className="text-white text-12 leading-3 lg:leading-none lg:text-14 xxl:text-18">
              TOURNAMENTS
            </h>
            <span className="text-white">
              {isOpenTournament ? reactIcons.arrowup : reactIcons.arrowdown}
            </span>
          </div>
          {isOpenTournament && (
            <div className="pl-2 overflow-y-auto custom-scroll-sm h-64">
              <ul>
                {allTournaments?.map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="flex items-center cursor-pointer text-black "
                      onClick={() => setSelectTournament(item.id)}
                    >
                      {/* <img src={item.icon} alt="i" className="w-3 h-3" /> */}
                      <span
                        className={`text-12 mx-2 ${
                          selectTournament && selectTournament === item.id
                            ? ' bg-yellow w-full '
                            : ''
                        } text-black hover:text-blue rounded-sm pl-2 font-[500]`}
                      >
                        {item.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div className="text-black pl-3">
          <div
            className="flex justify-between items-center cursor-pointer rounded-l-md h-10 px-3 bg-gradient-color-1 my-2"
            onClick={() => {
              setIsOpenTournament(false);
              setIsOpenpopularCountry(!isOpenpopularCountry);
            }}
          >
            <h className="text-white text-12 leading-3 lg:leading-none lg:text-14 xxl:text-18">
              POPULAR COUNTRIES
            </h>
            <span className="text-white">
              {isOpenpopularCountry ? reactIcons.arrowup : reactIcons.arrowdown}
            </span>
          </div>
          {isOpenpopularCountry && (
            <div>
              <ul>
                {popularCountries.map((item) => {
                  return (
                    <div key={item.id} className="px-3">
                      <li
                        className="flex text-black cursor-pointer justify-between items-center"
                        onClick={() => setIsOpenLeague(item.id)}
                      >
                        <div className="flex items-center">
                          <img src={item.icon} alt="i" className="w-3 h-3" />
                          <span className="text-12 mx-2 text-black">
                            {item.country}
                          </span>
                        </div>
                        <span>{reactIcons.arrowdown}</span>
                      </li>
                      {isOpenLeague == item.id &&
                        item?.league_list.map((items) => {
                          return (
                            <div key={items.id} className="px-5">
                              <li className="flex justify-between">
                                <span className="text-10">{items.league}</span>
                                <span className="text-10">{items.total}</span>
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
  selectTournament: PropTypes.string,
  setSelectTournament: PropTypes.string,
  allTournaments: PropTypes.array,
};

export default Sidebar;
