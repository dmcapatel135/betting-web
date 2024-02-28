import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import Sidebar from '@components/Sidebar';
import { reactIcons } from '@utils/icons';
// import { images } from '@utils/images';

import { Drawer } from '@mui/material';
import { images } from '@utils/images';
import { useAuth } from '@hooks';
import { isLoggedIn } from '@utils/apiHandlers';
import { useSelector } from 'react-redux';
import { SelectImage } from '@components';

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
    path: '/',
  },
  {
    id: 5,
    title: 'JACKPOT',
    icon: '/images/bikoicon/jackpotwhite.png',
    active_icon: '/images/bikoicon/jackpot-active.png',
    path: '/',
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
    path: '/',
  },
];

const menuList = [
  {
    id: 1,
    title: 'MY BETS',
    icon: '/images/bikoicon/ballot.png',
    active_icon: '',
  },
  {
    id: 2,
    title: 'DEPOSIT',
    icon: '/images/bikoicon/deposit.png',
    active_icon: '',
  },
  {
    id: 3,
    title: 'WITHDRAW',
    icon: '/images/bikoicon/withdraw.png',
    active_icon: '',
  },
  {
    id: 4,
    title: 'TRANSACTIONS',
    icon: '/images/bikoicon/transaction.png',
    active_icon: '',
  },
  {
    id: 5,
    title: 'HELP',
    icon: '/images/bikoicon/help.png',
    active_icon: '',
  },
  {
    id: 5,
    title: 'LOGOUT',
    icon: '/images/bikoicon/logout.png',
    active_icon: '',
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

  // const { tab, setTab } = useContext(MyContext);

  // console.log('------select Menu', tab);

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
                placeholder="Search for events and tournaments"
                className="h-[32px] lg:h-[32px] xxl:h-[48px] w-full pl-10 bg-green border-[1px] text-14 border-lightgray rounded-[8px] outline-none"
              />
              <div className="bg-blue">
                <span className="absolute text-white  ay-center left-1 top-3 lg:top-4 text-16 lg:text-[20px]">
                  {reactIcons.search}
                </span>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="lg:col-span-3 md:col-span-4  col-span-6 flex items-center justify-evenly mx-2 md:mx-0">
            {/* <div className="flex justify-between"> */}
            {isLoggedIn() ? (
              <div className="text-white pr-1">
                <span className="text-12 md:text-16 font-[700]">TSH 0</span>
              </div>
            ) : (
              <button
                className="h-[24px] lg:h-[32px] xxl:h-[48px] w-[60px] lg:w-[80px] xxl:w-[110px] border-[1px] font-[400] md:font-[700] text-10 md:text-14 xxl:text-18 bg-darkjunglegreen hover:bg-gradient-color-2 border-lightgray rounded-[8px] order-2 md:order-1"
                onClick={() => {
                  setTab(null);
                  navigate('/login');
                }}
              >
                Login
              </button>
            )}
            {isLoggedIn() ? (
              <button
                onClick={() => {
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
                  navigate('/join-now');
                }}
              >
                Join Now
              </button>
            )}
            {/* <select className="h-[32px] lg:h-[32px] xxl:h-[48px] lg:w-[85px] xxl:w-[110px] text-12 lg:text-14 xxl:text-18 hidden sm:block font-[700] cursor-pointer  bg-darkjunglegreen hover:bg-gradient-color-2 border-[1px] border-lightgray rounded-[8px] md:order-2">
              <option>English</option>
            </select> */}
            <div className=" hidden md:block md:order-2">
              <SelectImage
                optionList={optionList}
                selectValue={selectValue}
                setSelectValue={setSelectValue}
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
                    className="absolute rounded-md bg-white mt-4 w-32 md:w-40 right-5 z-30 shadow-lg"
                    onMouseLeave={() => setOption(!option)}
                  >
                    <div className="text-gray-900 py-1 md:py-3 text-12 md:text-14 font-[400] font-roboto cursor-pointer">
                      <ul className="">
                        <li
                          onClick={() => {
                            setTab(null);
                            navigate('/dashboard/my-bets');
                          }}
                          className="py-1 hover:bg-gradient-color-1 hover:text-white px-3"
                        >
                          My Bets
                        </li>
                        <li
                          onClick={() => {
                            setTab(null);
                            navigate('/dashboard/deposit');
                          }}
                          className="py-1 hover:bg-gradient-color-1 hover:text-white px-3"
                        >
                          Deposit
                        </li>
                        <li
                          onClick={() => {
                            setTab(null);
                            navigate('/dashboard/withdraw');
                          }}
                          className="py-1 hover:bg-gradient-color-1 hover:text-white px-3"
                        >
                          Withdraw
                        </li>
                        <li
                          className="py-1 hover:bg-gradient-color-1 hover:text-white px-3"
                          onClick={() => {
                            setTab(null);
                            navigate('/dashboard/my-transactions');
                          }}
                        >
                          Transactions
                        </li>
                        <li className="py-1 hover:bg-gradient-color-1 hover:text-white px-3">
                          Help
                        </li>
                        <li
                          className="py-1 hover:bg-gradient-color-1 hover:text-white px-3"
                          onClick={() => logout()}
                        >
                          Logout
                        </li>
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
};

export default Navbar;
