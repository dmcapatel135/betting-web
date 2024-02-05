import Tabs from '@components/Tabs';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { sport, tabsName } from './constants';
import PropTypes from 'prop-types';
import { BetCard, Loading, Pagination } from '@components';
import { MyContext } from '@components/MyContext/MyContext';

function SportsMenu() {
  const [tab, setTab] = useState(2);
  const [allSports, setAllSports] = useState();
  const [popularSports, setPopularSports] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [allFixtures, setAllFixtures] = useState();
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const { sportId, setSportId, selectTournament, setSelectTournament } =
    useContext(MyContext);

  // get all sports name
  const getAllSports = async () => {
    const response = await getReq('/sports');
    setAllSports(response?.data);
    const result = response?.data?.filter((obj) => obj.isEnabled === true);

    const mergedArray = sport?.map((obj2) => {
      const matchingObj1 = result?.find((obj1) => obj1.name === obj2.name);
      return { ...obj2, ...matchingObj1 };
    });
    setPopularSports(mergedArray);
  };
  useEffect(() => {
    if (popularSports) {
      setSportId(popularSports[0]?.id);
    }
  }, [popularSports, setSportId]);

  useEffect(() => {
    getAllSports();
  }, []);

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
    const response = await getReq(`/sports/${sportId}/tournaments`);
    setAllTournaments(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  useEffect(() => {
    console.log();
    const today = new Date();
    const upcoming = new Date(today);
    upcoming.setDate(today.getDate() + 1);
    if (tab === 2 && selectTournament) {
      getAllFixtures(`date=${new Date()}&tournamentId=${selectTournament}`);
    } else if (tab === 3 && selectTournament) {
      getAllFixtures(`fromDate=${upcoming}&tournamentId=${selectTournament}`);
    } else if (tab === 4 && selectTournament) {
      getAllFixtures(`onlyLive=${true}&tournamentId=${selectTournament}`);
    } else if (selectTournament) {
      getAllFixtures(`tournamentId=${selectTournament}`);
    } else if (tab === 2) {
      getAllFixtures(`date=${new Date()}`);
    } else if (tab === 3) {
      getAllFixtures(`fromDate=${upcoming}`);
    } else if (tab === 4) {
      getAllFixtures(`onlyLive=${true}`);
    }
  }, [sportId, getAllFixtures, tab, selectTournament, page, pageSize]);

  const getAllFixtures = useCallback(
    async (query) => {
      setIsLoading(true);
      const response = await getReq(
        `/sports/${sportId}/fixtures?skip=${page}&take=${pageSize}&${query}`,
      );
      setIsLoading(false);
      setDataCount(response?.data?.count);
      setAllFixtures(response.data);
    },
    [sportId, page, pageSize],
  );

  return (
    <>
      <div className="md:block hidden pr-2">
        <Tabs
          popularSports={popularSports}
          allSports={allSports}
          // sportId={sportId}
          // setSportId={setSportId}
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
                    ? 'text-white border-b-[3px] border-yellow'
                    : 'text-white  w-36'
                } mx-3 flex-1 flex items-center justify-center text-center`}
                onClick={() => setTab(item.id)}
              >
                {/* {item.img && <img src={item.img} alt="icon" />} */}
                <span
                  className={`text-12 sm:text-12 cursor-pointer lg:text-14 ${
                    item.tabName == 'LIVE NOW' ? 'text-yellow' : 'text-white'
                  }`}
                >
                  {item.tabName}
                </span>
              </div>
            );
          })}
        </div>
        <div className="px-3">
          {/* <select
            value={selectTournament}
            onChange={(e) => {
              setSelectTournament(e.target.value);
            }}
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
          </select> */}
          <div className="flex">
            <div className="flex-1 pr-2">
              <select
                value={selectTournament}
                onChange={(e) => {
                  setSelectTournament(e.target.value);
                }}
                className="w-full pl-2 my-2 custom-select-drop font-[600] text-14 text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]"
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
              {/* <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                <option>Today&apos;s Events</option>
                {liveEvents?.map((item) => {
                  return (
                    <option key={item.id}>
                      {item?.competitors[0]?.abbreviation} v/s{' '}
                      {item?.competitors[1]?.abbreviation}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="flex-1 pr-2">
              <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                <option>Market</option>
              </select>
            </div>
            <div className="flex-1">
              <select
                value={sportId}
                onChange={(e) => {
                  setSportId(e.target.value);
                }}
                className="w-full pl-2 my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]"
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
        {allFixtures &&
          allFixtures?.data?.map((item, index) => {
            return (
              <div key={index}>
                <BetCard item={item} />;
              </div>
            );
          })}
        {isLoading && <Loading />}
        {allFixtures?.data?.length === 0 && (
          <div className="text-center mt-12 text-black">
            <span>No any matches available </span>
          </div>
        )}
      </div>
      {allFixtures?.data?.length > 0 && (
        <div>
          <Pagination
            page={page}
            setPage={setPage}
            dataCount={dataCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      )}
    </>
  );
}

SportsMenu.propTypes = {
  sportId: PropTypes.number,
  setSportId: PropTypes.func,
  tab: PropTypes.number,
  setTab: PropTypes.number,
  selectTournament: PropTypes.string,
  setSelectTournament: PropTypes.string,
};

export default SportsMenu;
