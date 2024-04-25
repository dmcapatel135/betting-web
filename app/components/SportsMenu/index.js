import Tabs from '@components/Tabs';
import { getReq } from '@utils/apiHandlers';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { marketsName, sport, tabsName } from './constants';
import PropTypes from 'prop-types';
import { BetCard, SkeletonLoader } from '@components';
import { MyContext } from '@components/MyContext/MyContext';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { images } from '@utils/images';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import MobileMarketCard from '@components/MobileMarketCard';

function SportsMenu() {
  const [allSports, setAllSports] = useState();
  const [popularSports, setPopularSports] = useState();
  const [allTournaments, setAllTournaments] = useState();
  const [allFixtures, setAllFixtures] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [queries, setQueries] = useState();
  const [searchParams] = useSearchParams();
  const [selectMarket, setSelectMarket] = useState('3 WAY');
  const [mobileSelectMarketData, setMobileSelectMarketData] = useState([]);
  const navigate = useNavigate();

  const {
    sportId,
    setSportId,
    selectTournament,
    setSelectTournament,
    tab,
    setTab,
    marketData,
    setMarketData,
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
    setPage(0);
  }, [sportId]);

  useEffect(() => {
    getAllSports();
  }, []);

  //get to tournaments according to sports
  const getAllTournaments = useCallback(async () => {
    const response = await getReq(
      `/sports/${sportId}/tournaments?haveActiveEvents=${true}`,
    );
    // if (sportId == 1)
    setAllTournaments(response.data?.filter((item) => item.topLeague == true));
    // else {
    //   setAllTournaments(response.data);
    // }
  }, [sportId]);

  useEffect(() => {
    getAllTournaments();
  }, [sportId, getAllTournaments]);

  // useEffect(() => {
  //   const today = new Date();
  //   getAllFixtures(today.toISOString);
  // }, [getAllFixtures]);

  useEffect(() => {
    setAllFixtures([]);
    setPage(0);
    // let interval = setInterval(() => {
    const date = new Date();
    const dateString = new Date(date);
    dateString.setDate(moment(date.getDate() + 1));
    // let upcoming = moment(
    //   dateString,
    //   'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (India Standard Time)',
    // ).format('YYYY-MM-DD');
    let today = date.toISOString();
    let query = `date=${today}`;
    if (window.location.pathname == '/dashboard/popular' && sportId) {
      query = selectTournament
        ? `tournamentId=${
            selectTournament
              ? selectTournament
              : searchParams.get('eId')
                ? searchParams.get('eId')
                : 1
          }&popular=${true}`
        : `popular=${true}`;
    } else if (window.location.pathname == '/' && sportId) {
      query = selectTournament
        ? `upcoming=${true}&fromDate=${today}&toDate=${moment(today).endOf('date').toISOString()}&tournamentId=${
            selectTournament
              ? selectTournament
              : searchParams.get('eId')
                ? searchParams.get('eId')
                : 1
          }`
        : `upcoming=${true}&fromDate=${today}&toDate=${moment(today).endOf('date').toISOString()}`;
    } else if (window.location.pathname == '/dashboard/upcoming' && sportId) {
      query = selectTournament
        ? `upcoming=${true}&fromDate=${moment(today).toISOString()}&tournamentId=${
            selectTournament
              ? selectTournament
              : searchParams.get('eId')
                ? searchParams.get('eId')
                : 1
          }`
        : `upcoming=${true}&fromDate=${moment(today).toISOString()}`;
    } else if (window.location.pathname == '/dashboard/live-now' && sportId) {
      query = selectTournament
        ? `onlyLive=${true}&tournamentId=${
            selectTournament
              ? selectTournament
              : searchParams.get('eId')
                ? searchParams.get('eId')
                : 1
          }`
        : `onlyLive=${true}`;
    }
    setQueries(query);
    getAllFixtures(query);
    // }, 5000);
  }, [sportId, getAllFixtures, tab, selectTournament, searchParams]);

  const getAllFixtures = useCallback(
    async (query, newPage) => {
      setPageSize(25);
      setIsLoading(true);

      const response = await getReq(
        `/sports/${
          sportId
            ? sportId
            : searchParams.get('sId')
              ? searchParams.get('sId')
              : 1
        }/fixtures?skip=${newPage ? newPage : page}&take=${pageSize}&${query}`,
      );

      setIsLoading(false);
      if (response.data.data.length > 0) {
        setAllFixtures((prevState) => [...prevState, ...response.data.data]);
      } else {
        // setAllFixtures([...response.data.data]);
        setHasMore(false);
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }, 3000);
      }
    },
    [sportId, page, pageSize, searchParams],
  );

  const fetchMoreData = () => {
    const newPage = page + 25;
    setPage(newPage);
    getAllFixtures(queries, newPage);
  };

  useEffect(() => {
    setMarketData([]);
    setSelectMarket('');
    const filteredData = marketsName.find((item) => item.sportId == sportId);
    setMarketData(filteredData);

    setMobileSelectMarketData(filteredData.marketName[0]);
    setSelectMarket(filteredData.marketName[0].name);
  }, [sportId]); //eslint-disable-line

  useEffect(() => {
    setMarketData(marketsName.find((item) => item.sportId == sportId));
    setMobileSelectMarketData(
      marketsName
        .find((item) => item.sportId == sportId)
        .marketName.find((item) => item.name == selectMarket),
    );
    setAllFixtures([...allFixtures]);
  }, [selectMarket]); //eslint-disable-line

  return (
    <>
      <div className="lg:block hidden">
        <Tabs popularSports={popularSports} allSports={allSports} />
      </div>
      <div className="my-0 md:my-2 bg-white rounded-b-[8px]">
        <img className="w-full rounded-lg" src={images.bannerImg} />

        <div className="mt-5 hidden md:flex justify-between px-5">
          {tabsName?.map((item) => {
            return (
              <div
                key={item.id}
                className={`${
                  window.location.pathname == item.path
                    ? 'text-white border-b-[3px] border-yellow'
                    : 'text-white  xl:w-36'
                } mx-3 flex-1 flex items-center justify-center text-center`}
                onClick={() => {
                  setTab(item.id);
                  navigate(`${item.path}`);
                }}
              >
                {/* {item.img && <img src={item.img} alt="icon" />} */}
                <span className="text-12 sm:text-12 cursor-pointer lg:text-12 2xl:text-14 text-blue font-[700]">
                  {item.tabName}
                </span>
              </div>
            );
          })}
        </div>
        <div className="lg:px-3">
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
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <div className="flex-1">
              <select
                value={sportId}
                onChange={(e) => {
                  setSportId(e.target.value);
                }}
                className="w-full pl-2 my-2  custom-select-drop text-12 md:text-14 font-[600] text-center text-white h-[32px] 2xl:h-[42px] bg-[#E79B24] outline-none  rounded-[4px]"
              >
                {popularSports?.map((item) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-white text-black hover:bg-blue"
                    >
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-1">
              <select
                value={selectTournament || 'Top Leagues & Countries'}
                onChange={(e) => {
                  if (e.target.value == 'Top Leagues & Countries')
                    setSelectTournament(null);
                  else setSelectTournament(e.target.value);
                }}
                className="w-full pl-2 my-2 bg-blue custom-select-drop font-[600] text-12 md:text-14 text-center text-white h-[32px] 2xl:h-[42px]  outline-none  rounded-[4px]"
              >
                <option>Top Leagues & Countries</option>
                {allTournaments?.map((item) => {
                  return (
                    <option
                      key={item.id}
                      value={item.id}
                      className="bg-white text-black hover:bg-yellow"
                    >
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
            <div className="flex-1 lg:hidden block">
              <select
                value={selectMarket}
                onChange={(e) => setSelectMarket(e.target.value)}
                className="w-full px-2 my-2 bg-[#E79B24] custom-select-drop text-12 md:text-14 font-[600] text-center text-white  h-[32px]  outline-none  rounded-[4px]"
              >
                {/* <option>Market</option> */}
                {marketData?.marketName?.map((item, index) => {
                  return (
                    <option value={item.name} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex lg:mx-4 py-1 lg:px-2 pl-1 lg:pl-0">
        <div className="flex-grow-0 w-40   mt-9 md:mt-12 xxl:flex-1 pl-0">
          <div
            className={`h-6 md:h-8 2xl:h-[42px] lg:mx-0 flex justify-center items-center w-36 md:w-48 xxl:w-full text-center text-10 md:text-12  ${
              !(tab == 3) ? 'bg-gradient-color-1' : 'bg-white'
            } text-white px-1 rounded-[4px]  font-[600]`}
          >
            {!(tab == 3) && (
              <p className="">
                {moment(new Date()).format('dddd, MMM Do YYYY').toUpperCase()}
              </p>
            )}
          </div>
        </div>
        <div className="flex-1 w-full lg:hidden flex justify-center sm:justify-end ">
          {mobileSelectMarketData && (
            <div className="text-black text-center">
              <h1 className="text-12 font-[500] uppercase">
                {mobileSelectMarketData?.name == 'Total'
                  ? 'OVER/UNDER (2.5)'
                  : mobileSelectMarketData?.name}
              </h1>
              <div className="flex justify-center mt-3 gap-3">
                {mobileSelectMarketData?.option?.map((item) => {
                  return (
                    <div key={item} className="">
                      <button
                        className="border text-10 font-[600] flex justify-center items-center md:h-8 h-6 w-[36px] sm:w-[45px] 2xl:w-[48px] 2xl:h-[36px] border-[#A3A3A3] rounded-[4px] cursor-pointer "
                        // className="border text-12 border-black w-[36px] rounded-sm "
                      >
                        {item}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="flex-grow-0 w-12 md:hidden md:opacity-0">
          <div className=" border-solid  md:w-16 2xl:w-[72px] text-black">
            <button
              onClick={() => {
                var url = new URL(window.location.href);
                url.searchParams.delete('sId');
                url.searchParams.delete('eId');
                navigate(url);
                setSelectTournament(null);
                setSportId(1);
              }}
              type="reset"
              className=" border text-black  border-primary-700 h-[25px] !min-w-[50px] !text-12 !rounded-md hover:bg-primary-700"
            >
              Clear
            </button>
            {/* <div
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
            </div> */}
          </div>
        </div>
        <div className="flex-1 hidden lg:block border-black pr-3 xl:pr-0 xl2:pr-3 2xl:pr-6 mr-2 md:mr-0">
          {allFixtures.length > 0 && (
            <>
              <div className=" sm:flex  justify-end gap-4">
                {marketsName
                  .filter(
                    (item) =>
                      item.sportId == (sportId || searchParams.get('sId')),
                  )[0]
                  ?.marketName.map((items, index) => {
                    return (
                      <div
                        key={index}
                        // className={`${
                        //   index > 0 ? 'hidden lg:block text-center' : ' text-center'
                        // } flex-1 `}
                        className={`${
                          items.name == 'Winner (incl. super over)'
                            ? ''
                            : items?.option?.length == 2
                              ? ''
                              : ''
                        } ${index > 0 ? 'hidden xl:block' : ''} `}
                      >
                        <div
                          className={`flex ${
                            marketsName.filter(
                              (item) => item.sportId == sportId,
                            )[0]?.marketName.length == 1
                              ? 'justify-between  md:justify-end 2xl:mx-4'
                              : 'justify-center'
                          }`}
                        >
                          <div
                            style={{
                              maxWidth: `${index === 0 ? 156 : 110}px`,
                            }}
                            className="w-full"
                          >
                            <div className="w-full flex justify-center">
                              <h1 className="text-12 uppercase md:text-12 lg:text-[10px] flex-center text-center 2xl:text-14 font-[800] md:block text-black  mb-2 xl:h-[48px]">
                                {items.name === 'Total'
                                  ? 'OVER/UNDER(2.5)'
                                  : items.name}
                              </h1>
                            </div>
                            <div
                              // className={`${items.option.length ==} flex justify-between`}
                              className={`${
                                items.option.length == 3 ? '' : ''
                              }  flex ${
                                index == 2 ? '' : 'mx-auto'
                              } justify-center gap-2`}
                            >
                              {items.option?.map((itemss, innerIndex) => {
                                return (
                                  <div
                                    key={innerIndex}
                                    className="border flex justify-center items-center md:h-8 h-6 w-[40px] md:w-[45px] 2xl:w-[48px] 2xl:h-[36px] border-[#A3A3A3] rounded-[4px] cursor-pointer "
                                  >
                                    <span className="text-gray-900  md:text-12 lg:text-12 2xl:text-14 font-[500] text-10">
                                      {itemss || 1}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* <div>
                {marketName.filter((item) => item.sportId == sportId)

                }
              </div> */}
            </>
          )}
        </div>
        <div className="flex-grow-0">
          <div className="  h-5 w-6 hidden md:block md:w-16 text-black">
            <button
              onClick={() => {
                var url = new URL(window.location.href);
                url.searchParams.delete('sId');
                url.searchParams.delete('eId');
                navigate(url);
                setSelectTournament(null);
                setSportId(1);
              }}
              type="reset"
              className=" border text-black ml-2 border-primary-700 h-[33px] !min-w-[60px] !text-12 !rounded-md hover:bg-primary-700"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      {/* <div className="flex my-3 px-2  mr-3 w-full">
        <div className="flex  w-full">
          <div className="flex-grow-0 xxl:flex-1 pl-0">
            <div
              className={`h-6 md:h-8   mx-1  flex items-center w-40 md:w-60 xxl:w-full xxl:text-center text-[8px] md:text-12  ${
                !(tab == 3) ? 'bg-gradient-color-1' : 'bg-white'
              } text-white px-1 rounded-[4px] text-center font-[600]`}
            >
              {!(tab == 3) && (
                <p>
                  {moment(new Date())
                    .format('dddd, MMMM Do YYYY')
                    .toUpperCase()}
                </p>
              )}
            </div>
          </div>
          {marketsName
            .filter((item) => item.sportId == sportId)[0]
            ?.marketName.map((items, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index > 0 ? 'hidden lg:block text-center' : ' text-center'
                  } flex-1 `}
                >
                  <div
                    className={`flex ${
                      marketsName.filter((item) => item.sportId == sportId)[0]
                        ?.marketName.length == 1
                        ? 'justify-between md:justify-end md:mx-4'
                        : 'justify-center'
                    }`}
                  >
                    <div className="mx-auto md:mx-0">
                      <h1 className="text-12 md:text-12 lg:text-[10px] xxl:text-14 font-[800] md:block text-black  mb-2">
                        {items.name === 'Total'
                          ? 'OVER/UNDER(2.5)'
                          : items.name}
                      </h1>
                      <div
                        className={`${
                          items.option.length == 3
                            ? 'w-32 md:w-36'
                            : 'w-24 md:w-24'
                        }  flex ${index == 2 ? '' : 'mx-auto'} justify-between`}
                      >
                        {items.option?.map((itemss, innerIndex) => {
                          return (
                            <div
                              key={innerIndex}
                              className="border-[1px]  flex justify-center items-center  md:h-8 h-6 w-[40px] md:w-[45px] border-[#A3A3A3] rounded-[4px] cursor-pointer "
                            >
                              <span className="text-gray-900  md:text-12 lg:text-12 font-[500] text-10">
                                {itemss || 1}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="flex-shrink p-2 ">
            <div className="w-[50px]"></div>
          </div>
        </div>
      </div> */}
      {allFixtures.length > 0 && (
        <div className="lg:px-2">
          <InfiniteScroll
            dataLength={allFixtures.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<SkeletonLoader />}
            endMessage={<p>No more items to load.</p>}
          >
            {allFixtures &&
              allFixtures?.map((item, index) => {
                let market = selectMarket == '3 WAY' ? '1x2' : selectMarket;
                let mobileMarket = item?.previewMarkets?.find(
                  (mkt) => mkt.name == market,
                );
                return (
                  <>
                    <div key={index} className="my-3 ">
                      <BetCard
                        index={index}
                        item={item}
                        sportId={sportId}
                        market={mobileMarket}
                        selectMarket={selectMarket}
                      />
                      {(index + 1) % 13 === 0 && (
                        <div className="text-black my-3">
                          <img
                            src={images.bannerImg1}
                            alt="main"
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                    {/* <div className="my-3 block sm:hidden">
                      <MobileMarketCard
                        item={item}
                        market={mobileMarket}
                        openMarket={item.openMarkets}
                      />
                    </div> */}
                  </>
                );
              })}
          </InfiniteScroll>
        </div>
      )}
      {isLoading && <SkeletonLoader />}
      {allFixtures?.length == 0 && !isLoading && (
        <div className="text-center flex flex-col items-center gap-1 mt-3 mb-3 text-black">
          <img
            src="/images/bikoicon/nodata.jpg"
            className="w-[150px] md:w-[250px] object-contain"
            alt=""
          />
          <span className="text-black md:text-14 2xl:text-18 font-[500] text-12">
            There are no matches.
          </span>
          <span className="text-black md:text-14 2xl:text-18 font-[500] text-12">
            All Matches are temporarily unavailable. Please refresh this page
            and browse upcoming matches
          </span>
          <span
            className="underline font-[500] text-14 md:text-16 cursor-pointer"
            onClick={() => (window.location.href = '/dashboard/upcoming')}
          >
            Browse Upcoming Matches
          </span>
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
