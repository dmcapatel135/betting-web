import {
  BetCard,
  BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  TalkToUs,
} from '@components';
import Tabs from '@components/Tabs';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useEffect, useState } from 'react';

const sport = [
  {
    name: 'Soccer',
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
  {
    name: 'Basketball',
    icon: '/images/bikoicon/sports_and_outdoors.png',
    active_icon: '/images/bikoicon/basketballwhite.png',
  },
  {
    name: 'Boxing',
    icon: '/images/bikoicon/boxing.png',
    active_icon: '/images/bikoicon/boxingwhite.png',
  },
  {
    name: 'Rugby',
    icon: '/images/bikoicon/rugby.png',
    active_icon: '/images/bikoicon/rugbywhite.png',
  },
  {
    name: 'Cricket',
    icon: '/images/bikoicon/cricket.png',
    active_icon: '/images/bikoicon/cricketwhite.png',
  },
  {
    name: 'Tennis',
    icon: '/images/bikoicon/tennis-racket.png',
    active_icon: '/images/bikoicon/tennis-racket.svg',
  },
];

const tabsName = [
  { id: 1, tabName: 'POPULAR MATCHES' },
  { id: 2, tabName: 'TODAY MATCHES' },
  { id: 3, tabName: 'UPCOMING MATCHES' },
  { id: 4, tabName: 'LIVE GAMES' },
];

function Batting() {
  const [step, setStep] = useState('sr:sport:1');
  const [tab, setTab] = useState(1);
  const [value, setValue] = useState(true);
  const [allSports, setAllSports] = useState();
  const [popularSports, setPopularSports] = useState();
  // const [todayEvent, setTodayEvent] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [liveEvents, setLiveEvents] = useState([]);
  const [selectTournament, setSelectTournament] = useState();

  // get all sports name
  const getAllSports = async () => {
    const response = await getReq('/sports');
    setAllSports(response?.data);
    const result = response?.data
      ?.filter(
        (obj) =>
          obj.name === 'Basketball' ||
          obj.name === 'Cricket' ||
          obj.name === 'Soccer' ||
          obj.name === 'Rugby' ||
          obj.name === 'Boxing' ||
          obj.name === 'Tennis',
      )
      .sort((a, b) => {
        const idA = parseInt(a.id.split(':')[2]);
        const idB = parseInt(b.id.split(':')[2]);
        return idA - idB;
      });

    const mergedArray = sport?.map((obj2) => {
      const matchingObj1 = result?.find((obj1) => obj1.name === obj2.name);
      return { ...obj2, ...matchingObj1 };
    });
    setPopularSports(mergedArray);
  };
  useEffect(() => {
    if (popularSports) {
      setStep(popularSports[0]?.id);
    }
  }, [popularSports]);

  useEffect(() => {
    getAllSports();
  }, []);

  // get all live events
  const getLiveEvents = useCallback(async () => {
    const response = await getReq('/sports/events/live');
    response.data?.map((item) => {
      if (item.tournament.id === selectTournament) {
        setLiveEvents((prev) => [...prev, item]);
      }
    });
  }, [selectTournament]);

  useEffect(() => {
    setLiveEvents([]);
    getLiveEvents();
  }, [selectTournament, getLiveEvents, step]);

  // get all events of sports
  // const getAllEvents = useCallback(async () => {
  //   const response = await getReq('/sports/events/pre');
  //   if (step) {
  //     const filteredMatches = response?.data?.filter(
  //       (match) => match.tournament.sport.id === step,
  //     );
  //     setTodayEvent(filteredMatches);
  //   }
  // }, [step]);

  // useEffect(() => {
  //   getAllEvents();
  // }, [step, getAllEvents]);

  //get to tournaments according to sports
  const getAllTournaments = useCallback(async () => {
    const response = await getReq(`/sports/${step}/tournaments`);
    setAllTournaments(response.data);
  }, [step]);

  useEffect(() => {
    getAllTournaments();
  }, [step, getAllTournaments]);

  return (
    <main className="md:pl-5  md:py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-12 md:col-span-8">
          <div className="md:block hidden pr-2">
            <Tabs
              popularSports={popularSports}
              allSports={allSports}
              step={step}
              setStep={setStep}
            />
          </div>
          <div className="my-0 md:my-2  md:mr-2 bg-gradient-color-1 rounded-b-[8px]">
            <img src="/images/bikoicon/main.png" />

            <div className="mt-5  hidden md:flex justify-between px-5">
              {tabsName?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      tab === item.id
                        ? 'text-white border-b-[3px] border-yellow w-28 text-center'
                        : 'text-white'
                    } mx-3`}
                    onClick={() => setTab(item.id)}
                  >
                    <span
                      className={`text-12 sm:text-12 cursor-pointer lg:text-14 ${
                        item.tabName == 'LIVE NOW'
                          ? 'text-yellow'
                          : 'text-white'
                      }`}
                    >
                      {item.tabName}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="px-3">
              <select
                onChange={(e) => setSelectTournament(e.target.value)}
                className="w-full my-2 custom-select-drop font-[600] text-14 text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]"
              >
                <option>Top Leagues & Countries</option>
                {allTournaments?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item?.name} & {item?.category?.name}
                    </option>
                  );
                })}
              </select>
              <div className="flex">
                <div className="flex-1 pr-2">
                  <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                    <option>Today&apos;s Events</option>
                    {liveEvents?.map((item) => {
                      return (
                        <option key={item.id}>
                          {item?.competitors[0]?.abbreviation} v/s{' '}
                          {item?.competitors[1]?.abbreviation}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex-1 pr-2">
                  <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                    <option>Market</option>
                  </select>
                </div>
                <div className="flex-1">
                  <select
                    value={step}
                    className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]"
                  >
                    {popularSports?.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="h-20 flex justify-around items-center text-black">
            <div className="h-8 flex items-center text-12 bg-yellow text-white px-3 rounded-[4px] text-center">
              <p>MONDAY, DECEMBER 11TH 2023</p>
            </div>
            <div className="text-center">
              <h1 className="text-12 font-[700] md:block hidden mb-2">3 WAY</h1>
              <div className="flex justify-between  w-32 text-12 text-[#3D3D3D]">
                <div className="border-[1px] flex justify-center items-center h-[32px] md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  <strong className="text-gray-900">1</strong>
                </div>
                <div className="border-[1px] flex justify-center items-center h-[32px] md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer">
                  <strong className="text-gray-900">X</strong>
                </div>
                <div className="border-[1px] flex justify-center items-center h-[32px]  md:h-6 w-10 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  <strong className="text-gray-900">2</strong>
                </div>
              </div>
            </div>
            <div className="text-center hidden md:block">
              <h1 className="text-12 font-[700] mb-2">OVER/UNDER 2.5</h1>
              <div className="flex justify-between w-28 text-12 ">
                <button className="border-[1px] h-6 w-12 text-12  text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  OVER
                </button>
                <button className="border-[1px] h-6 w-12 text-12 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  UNDER
                </button>
              </div>
            </div>
            <div className="text-center md:block hidden">
              <h1 className="text-12 font-[700] mb-2">BOTH TEAMS TO SCORE</h1>
              <div className="flex justify-between w-28 text-12 ">
                <button className="border-[1px] h-6 w-12 text-10 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer">
                  YES
                </button>
                <button className="border-[1px] h-6 w-12 text-10 text-gray-900 border-[#A3A3A3] rounded-[4px] cursor-pointer ">
                  NO
                </button>
              </div>
            </div>
          </div>
          <div className="px-3 mb-3">
            <BetCard onClick={() => setValue(true)} />
          </div>
        </div>
        <div className="col-span-4 mr-3 ml-1 md:block hidden">
          {value ? <BetWallet /> : <Betslip />}
          <CompanyContact />
          <CustomerCareContact />
          <TalkToUs />
        </div>
      </div>
    </main>
  );
}

export default Batting;
