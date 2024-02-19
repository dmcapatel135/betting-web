import Tabs from '@components/Tabs';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { marketsName, sport, tabsName } from './constants';
import PropTypes from 'prop-types';
import { BetCard, Loading } from '@components';
import { MyContext } from '@components/MyContext/MyContext';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

function SportsMenu() {
  // const [tab, setTab] = useState(2);
  const [allSports, setAllSports] = useState();
  const [popularSports, setPopularSports] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [allFixtures, setAllFixtures] = useState([]);
  const [page, setPage] = useState(1);
  const [dataCount, setDataCount] = useState();
  const [pageSize, setPageSize] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  //const bets = useSelector((state) => state.bet.selectedBet);

  const {
    sportId,
    setSportId,
    selectTournament,
    setSelectTournament,
    tab,
    setTab,
  } = useContext(MyContext);

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
    setAllFixtures([]);
    setPage(1);
  }, [sportId]);

  useEffect(() => {
    getAllSports();
  }, []);

  //get to tournaments according to sports
  const getAllTournaments = useCallback(async () => {
    const response = await getReq(`/sports/${sportId}/tournaments`);
    setAllTournaments(response.data);
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  useEffect(() => {
    console.log('------this useffect is also run ');
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
  }, [sportId, getAllFixtures, tab, selectTournament]);

  console.log('---------page ', page, allFixtures, dataCount);
  const getAllFixtures = useCallback(
    async (query) => {
      setPageSize(10);
      setIsLoading(true);
      const response = await getReq(
        `/sports/${sportId}/fixtures?skip=${page}&take=${pageSize}&${query}`,
      );

      setIsLoading(false);
      setDataCount(response?.data?.count);
      if (response.data.data.length > 0) {
        setAllFixtures((prevState) => [...prevState, ...response.data.data]);
      } else {
        setAllFixtures([...response.data.data]);
        setHasMore(false);
      }
    },
    [sportId, page, pageSize],
  );
  // setInterval(() => {
  //   const today = new Date();
  //   getAllFixtures(today);
  // }, 3000);

  const fetchMoreData = () => {
    setPage(page + 1);
    const today = new Date();
    getAllFixtures(today);
  };

  return (
    <>
      <div className="md:block hidden pr-2">
        <Tabs popularSports={popularSports} allSports={allSports} />
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
                      {item?.name} {item?.category?.name}
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
            <div className="flex-1">
              <select className="w-full my-2 custom-select-drop text-14 font-[600] text-center text-gray-900 h-[32px] bg-white outline-none  rounded-[4px]">
                <option>Market</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="h-20 flex justify-start items-center text-black">
        <div
          className={`h-8 flex items-center text-12 w-[220px] ${
            !(tab === 3) ? 'bg-yellow' : 'bg-white'
          } text-white px-3 rounded-[4px] text-center`}
        >
          {!(tab === 3) && (
            <p>
              {moment(new Date()).format('dddd, MMMM Do YYYY').toUpperCase()}
            </p>
          )}
        </div>
        <div className=" flex justify-between flex-1 pl-3 pr-16">
          {marketsName
            .filter((item) => item.sportId === sportId)[0]
            ?.marketName.map((items, index) => {
              return (
                <div key={index} className="text-center ">
                  <h1 className="text-16 font-[700] md:block hidden mb-2">
                    {items.name === 'Total' ? 'Over/Under(2.5)' : items.name}
                  </h1>
                  <div
                    // key={innerIndex}
                    className={`flex justify-between  text-12 text-[#3D3D3D] ${
                      items.name === '1x2' ? 'w-fit' : 'w-32 mx-3'
                    }`}
                  >
                    {items.option?.map((itemss, innerIndex) => {
                      return (
                        <div
                          key={innerIndex}
                          className="border-[1px] mr-2 flex justify-center items-center h-[40px] md:h-8 w-[52PX] border-[#A3A3A3] rounded-[4px] cursor-pointer "
                        >
                          <strong className="text-gray-900">
                            {itemss || 1}
                          </strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {allFixtures.length > 0 && (
        <div className="mr-3 mb-3">
          <InfiniteScroll
            dataLength={allFixtures.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items to load.</p>}
          >
            {allFixtures &&
              allFixtures?.map((item, index) => {
                return (
                  <div key={index} className="my-3">
                    <BetCard index={index} item={item} sportId={sportId} />
                    {(index + 1) % 13 === 0 && (
                      <div className="text-black my-3">
                        <img src="/images/bikoicon/main.png" alt="main" />
                      </div>
                    )}
                  </div>
                );
              })}
          </InfiniteScroll>
        </div>
      )}
      {isLoading && <Loading />}
      {allFixtures?.length == 0 && (
        <div className="text-center mt-12 text-black">
          <span className="text-black">
            There is no Odds in many markets in this events
          </span>
        </div>
      )}
      {/* {allFixtures?.data?.length > 0 && (
        <div>
          <Pagination
            page={page}
            setPage={setPage}
            dataCount={dataCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
          />
        </div>
      )} */}
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
