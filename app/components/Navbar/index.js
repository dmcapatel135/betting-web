import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '@components/Sidebar';
import { reactIcons } from '@utils/icons';
// import { images } from '@utils/images';

import { Drawer } from '@mui/material';
import { images } from '@utils/images';
import { useAuth } from '@hooks';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { useSelector } from 'react-redux';
import { SelectImage } from '@components';
import { MyContext } from '@components/MyContext/MyContext';
import { formatNumber } from '@utils/constants';

const mobileMenuList = [
  {
    id: 2,
    title: 'HOME',
    icon: '/images/bikoicon/home.png',
    active_icon: '/images/bikoicon/home-active.png',
    path: '/',
  },
  {
    id: 1,
    title: 'MENU',
    icon: '/images/bikoicon/menu_mobile.png',
    active_icon: '/images/bikoicon/menu-icon.png',
    path: '',
  },
  {
    id: 4,
    title: 'LIVE',
    icon: '/images/bikoicon/livenowwhite.png',
    active_icon: '/images/bikoicon/live-now-active.png',
    path: '/dashboard/live-now',
  },
  {
    id: 5,
    title: 'JACKPOT',
    icon: '/images/bikoicon/jackpotwhite.png',
    active_icon: '/images/bikoicon/jackpot-active.png',
    path: '/dashboard/jackpot',
  },
  {
    id: 6,
    title: 'SEARCH',
    icon: '/images/bikoicon/search.png',
    active_icon: '/images/bikoicon/search-active.png',
    path: '/',
  },
  {
    id: 7,
    title: 'SLIP',
    icon: '/images/bikoicon/slip.png',
    active_icon: '/images/bikoicon/slip-active.png',
    path: '/dashboard/bet-slip',
  },
];

const menuList = [
  {
    id: 1,
    title: 'MY BETS',
    icon: reactIcons.bets,
    active_icon: '',
    path: '/dashboard/my-bets',
  },
  {
    id: 2,
    title: 'DEPOSIT',
    icon: reactIcons.deposit,
    active_icon: '',
    path: '/dashboard/deposit',
  },
  {
    id: 3,
    title: 'WITHDRAW',
    icon: reactIcons.withdraw,
    active_icon: '',
    path: '/dashboard/withdraw',
  },
  {
    id: 4,
    title: 'TRANSACTIONS',
    icon: reactIcons.transaction,
    active_icon: '',
    path: '/dashboard/my-transactions',
  },
  {
    id: 5,
    title: 'HELP',
    icon: reactIcons.help,
    active_icon: '',
    path: '/dashboard/how-to-play',
  },
  // {
  //   id: 6,
  //   title: 'DOWNLOAD APP',
  //   icon: reactIcons.android,
  //   active_icon: '',
  //   path: '/dashboard/how-to-play',
  // },
  // {
  //   id: 7,
  //   title: 'NEWS',
  //   icon: reactIcons.news,
  //   active_icon: '',
  //   path: '/dashboard/how-to-play',
  // },
  // {
  //   id: 8,
  //   title: 'MY ACCOUNT',
  //   icon: reactIcons.myAccount,
  //   active_icon: '',
  //   path: '/dashboard/how-to-play',
  // },
  {
    id: 9,
    title: 'LOGOUT',
    icon: reactIcons.logout,
    active_icon: '',
    path: '/',
  },
];

const optionList = [{ name: 'English', icon: '/images/bikoicon/france.png' }];

const Navbar = ({ tab, setTab }) => {
  const [option, setOption] = useState(false);
  const [isOpenMenuList, setIsOpenMenuList] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const bets = useSelector((state) => state.bet.selectedBet);
  const [selectValue, setSelectValue] = useState();
  const [select, setSelect] = useState(false);
  const [search, setSearch] = useState();
  const [searchData, setSearchData] = useState({});
  const [event, setEvent] = useState();

  const { setSelectTournament, wallet, setSportId } = useContext(MyContext);

  const getSearchEventTournament = async (query) => {
    const response = await getReq(`/search?search=${query}`);
    setSearchData(response.data);
  };

  useEffect(() => {
    if (search?.length > 2) {
      getSearchEventTournament(search);
    } else {
      setSearchData({});
    }
  }, [search]);

  useEffect(() => {
    if (event) {
      navigate(
        `/dashboard/single-bets/${event.id}/${
          event?.competitors[0]?.name + ' vs ' + event?.competitors[1]?.name
        }`,
      );
      setSearchData({});
      setEvent();
      setSearch('');
    }
  }, [navigate, event]);

  return (
    <nav>
      <div className="h-[50px] sm:h-[65px] lg:h-[85px] xxl:h-[110px] bg-gradient-color-1 relative">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-2 md:col-span-3 col-span-6 ">
            <div className="flex items-center h-[48px] md:h-full">
              <img
                src={images.football}
                alt="football"
                className=" sm:w-[100px]  lg:w-[105px] xxl:w-full  sm:h-[65px] lg:h-[85px] xxl:h-full hidden sm:block"
              />
              <img
                src={images.bikoSport}
                alt="logo"
                className="w-[117px]  h-[30px] sm:w-[130px] sm:[h-30px] lg:w-[180px] md:h-[44px] mx-2 cursor-pointer"
                onClick={() => navigate('/')}
              />
            </div>
          </div>
          <div className="lg:col-span-7 md:col-span-5 hidden sm:flex items-center md:px-[50px] lg:pr-[30px] lg:pl-[140px]">
            {/* <div className="flex items-center mx-[150px]"> */}
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for events and tournaments"
                className="h-[32px] lg:h-[32px] xxl:h-[48px] w-full px-10 bg-green border-[1px] text-14 border-lightgray rounded-[8px] outline-none"
              />
              <div className="bg-blue">
                <span className="absolute text-white  ay-center left-1 top-3 lg:top-4 text-16 lg:text-[20px]">
                  {reactIcons.search}
                </span>
              </div>
              {search && (
                <div className="bg-blue">
                  <span
                    onClick={() => {
                      setSearchData({});
                      setSearch('');
                    }}
                    className="absolute text-white  ay-center right-1 cursor-pointer top-3 lg:top-4 text-16 lg:text-[20px]"
                  >
                    {reactIcons.closecircle}
                  </span>
                </div>
              )}
              {Object.values(searchData).length > 0 && (
                <div className="bg-white p-3 text-black w-full top-10 shadow-md rounded-sm max-h-fit min-h-20 absolute z-30">
                  <div>
                    <div className="text-black">
                      <span className="text-blue text-14 font-[600]">
                        EVENTS
                      </span>
                    </div>
                    <div className="overflow-y-auto custom-scroll-sm max-h-40 min-h-8">
                      {searchData.events.map((item) => {
                        return (
                          <li
                            key={item.id}
                            onClick={() => setEvent(item)}
                            className="text-black list-none cursor-pointer  hover:text-blue"
                          >
                            <span className="text-12 font-[400]">
                              {item?.competitors[0]?.name +
                                ' vs ' +
                                item?.competitors[1]?.name}
                            </span>
                          </li>
                        );
                      })}
                    </div>

                    {searchData.events.length == 0 && (
                      <div className="text-center">
                        <span className="text-14 text-black my-2 text-[400]">
                          No events found
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-black">
                      <span className="text-blue text-14 font-[600]">
                        TOURNAMENTS
                      </span>
                    </div>
                    <div className="overflow-y-auto custom-scroll-sm max-h-40 min-h-8">
                      {searchData.tournaments.map((item) => {
                        return (
                          <li
                            key={item.id}
                            onClick={() => {
                              setSelectTournament(item.id);
                              setSportId(item.sport.id);
                              setSearchData({});
                              setSearch('');
                            }}
                            className="text-black list-none cursor-pointer py-1"
                          >
                            <span className="text-12">{item.tournament}</span>
                          </li>
                        );
                      })}
                    </div>
                    {searchData.tournaments.length == 0 && (
                      <div className="text-center">
                        <span className="text-14 text-black font-[400] my-2">
                          No tournaments found
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* </div> */}
          </div>
          <div
            onMouseLeave={() => setSelect(false)}
            className="lg:col-span-3 md:col-span-4  col-span-6 flex items-center justify-evenly mx-2 md:mx-0"
          >
            {/* <div className="flex justify-between"> */}
            {isLoggedIn() ? (
              <div className="text-white pr-1">
                <span className="text-12 md:text-16 font-[700]">
                  TSH {formatNumber(wallet?.amount)}
                </span>
              </div>
            ) : (
              <button
                className="h-[24px] lg:h-[32px] xxl:h-[48px] w-[60px] lg:w-[80px] xxl:w-[110px] border-[1px] font-[400] md:font-[700] text-10 md:text-14 xxl:text-18 bg-darkjunglegreen hover:bg-gradient-color-2 border-lightgray rounded-[8px] order-2 md:order-1"
                onClick={() => {
                  setTab(null);
                  setSelectTournament(null);
                  navigate('/login');
                }}
              >
                Login
              </button>
            )}
            {isLoggedIn() ? (
              <button
                onClick={() => {
                  setSelectTournament(null);
                  setTab(null);
                  navigate('/dashboard/deposit');
                }}
                className="h-[24px] lg:h-[32px] xxl:h-[48px] w-[60px] lg:w-[80px] xxl:w-[110px] border-[1px] font-[400] md:font-[700] text-10 md:text-14 xxl:text-18 bg-darkjunglegreen hover:bg-gradient-color-2 border-lightgray rounded-[8px] order-2 md:order-1"
              >
                Deposit
              </button>
            ) : (
              <button
                className="h-[24px] lg:h-[32px] xxl:h-[48px] w-[60px] lg:w-[80px] xxl:w-[110px] border-[1px] text-10 lg:text-14 font-[400] md:font-[700] xxl:text-18 bg-darkjunglegreen hover:bg-gradient-color-2 border-lightgray rounded-[8px] order-1 md:order-2"
                onClick={() => {
                  setTab(null);
                  setSelectTournament(null);
                  navigate('/join-now');
                }}
              >
                Join Now
              </button>
            )}
            {/* <select className="h-[32px] lg:h-[32px] xxl:h-[48px] lg:w-[85px] xxl:w-[110px] text-12 lg:text-14 xxl:text-18 hidden sm:block font-[700] cursor-pointer  bg-darkjunglegreen hover:bg-gradient-color-2 border-[1px] border-lightgray rounded-[8px] md:order-2">
              <option>English</option>
            </select> */}
            <div className="w-32 hidden md:block md:order-2">
              <SelectImage
                optionList={optionList}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
                select={select}
                setSelect={setSelect}
              />
            </div>

            {/* </div> */}
            {isLoggedIn() && (
              <div className="md:pr-2 sm:block  md:order-4">
                <div onClick={() => setOption(!option)} className="relative">
                  <img
                    src={images.user}
                    alt="menu"
                    className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 "
                  />
                </div>
                {option && (
                  <div
                    className="absolute rounded-md bg-white mt-4 w-32 md:w-48 right-5 z-30 shadow-lg"
                    onMouseLeave={() => setOption(!option)}
                  >
                    <div className="text-gray-900 py-1 md:py-3 text-12 md:text-14 font-[400] font-roboto cursor-pointer">
                      <ul className="">
                        {menuList.map((item) => {
                          return (
                            <li
                              key={item.title}
                              onClick={() => {
                                setTab(null);
                                navigate(`${item.path}`);
                                if (item.title == 'LOGOUT') logout();
                              }}
                              className="py-3 flex  items-cent hover:bg-gradient-color-1 text-blue hover:text-white px-3"
                            >
                              <span className="mr-3  text-20">{item.icon}</span>
                              <span className="text-14 ">{item.title}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <hr className="border-[1px]"></hr>
        <div className="w-full h-[62px] flex items-center bg-gradient-color-1">
          {mobileMenuList.map((item, index) => (
            <NavLink
              key={index}
              end
              onClick={() => {
                setTab(item.id);
                if (item.title == 'MENU') setIsOpenMenuList(!isOpenMenuList);
              }}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-2 lg:py-2 text-12 md:text-12 flex flex-1 justify-center  xxl:text-14 h-10 text-black   cursor-pointer  2xl:text-base ${
                  isActive
                    ? ' text-white flex rounded-l-md items-center gap-3'
                    : ' hover:bg-primary-yellow  flex items-center gap-3'
                }`
              }
            >
              <div className="my-2 text-center">
                <div className="flex justify-center relative">
                  <img
                    src={tab == item.id ? item.active_icon : item.icon}
                    className="w-5 h-5"
                  />
                  {item.title === 'SLIP' && (
                    <div className="w-[14px] h-[14px]  bg-white flex justify-center items-center rounded-full left-4 -top-1 text-black absolute">
                      <span className="text-10">{bets.length}</span>
                    </div>
                  )}
                </div>
                <span
                  className={`${
                    tab == item.id ? 'text-yellow' : 'text-white'
                  } text-10 `}
                >
                  {' '}
                  {item.title}
                </span>
              </div>
            </NavLink>
          ))}
          {isOpenMenuList && (
            <div className="absolute top-[115px] w-[300px] z-50">
              <Sidebar
                tab={tab}
                setTab={setTab}
                isMobileSidebar={true}
                setIsOpenMenuList={setIsOpenMenuList}
                isOpenMenuList={isOpenMenuList}
              />
            </div>
          )}
        </div>
        <hr className="border-[1px]"></hr>
        <div className="col-span-full   block w-full -top-[10px] absolute">
          {isLoggedIn() && openDrawer && (
            <Drawer
              anchor="right"
              PaperProps={{
                style: {
                  width: '300px',
                  // border: '1px solid white',
                  zIndex: 999999,
                  background:
                    'linear-gradient(180deg, rgba(39, 6, 85, 0.80) 0%, rgba(118, 32, 243, 0.81) 100%)',
                  backdropFilter: 'blur(10px)',
                  marginTop: '55px',
                },
              }}
              open={openDrawer}
              onClose={() => setOpenDrawer(false)}
              className=""
            >
              <div className="h-screen">
                {/* <div className="text-end p-2">
                  <span className="text-black" onClick={() => setOption(false)}>
                    {reactIcons.close}
                  </span>
                </div> */}
                {menuList.map((item, index) => (
                  <NavLink
                    key={index}
                    end
                    // onClick={() => setIsDrawerOpen(false)}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 lg:py-2 md:text-12 xxl:text-14 h-10 text-black text-end  ml-[100px] cursor-pointer  2xl:text-base ${
                        isActive
                          ? ' text-white flex rounded-l-md  items-center gap-3'
                          : ' hover:bg-primary-yellow  flex items-center gap-3'
                      }`
                    }
                  >
                    <img src={item.icon} alt="icon" />
                    <span className="font-[700]"> {item.title}</span>
                  </NavLink>
                ))}
              </div>
            </Drawer>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  tab: PropTypes.string,
  setTab: PropTypes.func,
  setSelectTournament: PropTypes.number,
};

export default Navbar;
