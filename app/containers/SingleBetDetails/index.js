import React, {
  useCallback,
  useEffect,
  // useRef,
  useState,
} from 'react';
import {
  //   BetDetailsContext,
  BetWallet,
  Betslip,
  CompanyContact,
  CustomerCareContact,
  Loading,
  TalkToUs,
} from '@components';
import { reactIcons } from '@utils/icons';
// import ReactSimplyCarousel from 'react-simply-carousel';
import { getReq } from '@utils/apiHandlers';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBetDetailsAction } from '@actions';
// import { images } from '@utils/images';

// import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import { Pagination, Navigation } from 'swiper/modules';

// const TabsName = [
//   { id: 1, title: 'Board', icon: images.board },
//   { id: 2, title: 'Head to head', icon: images.headtohead },
//   { id: 3, title: 'Standing', icon: images.standing },
//   { id: 4, title: 'Linups', icon: images.lineups },
// ];

function SigleBetDetails() {
  const { eventId, sId } = useParams();
  // const [step, setStep] = useState(isMobile ? 'Board' : 'Head to head');
  // const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  // const [allMarketData, setAllMarketData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [marketDataOdds, setMarketDataOdds] = useState();
  const [mergedData, setMergedData] = useState([]);
  const [eventName, setEventName] = useState();
  const selectedBet = useSelector((state) => state.bet.selectedBet);
  const [bets, setBets] = useState([]);
  // const [isMobile, setIsMobile] = useState(false);
  // const [tab, setTab] = useState(1);
  const [loadNum, setLoadNum] = useState();

  const dispatch = useDispatch();
  // const swiperRef = useRef(null) ;

  const getAllMarketData = useCallback(async () => {
    setIsLoading(true);
    setLoadNum(loadNum + 1);
    const response = await getReq(`/events/${eventId}/markets`);
    if (response.status) {
      setIsLoading(false);
      setMergedData(response.data);
    }
    // setAllMarketData(response.data);
  }, [eventId, loadNum]);

  const getEventName = useCallback(async () => {
    const response = await getReq(`/events/${eventId}`);
    console.log(response);
    setEventName(
      `${response?.data?.competitors[0]?.name} -
        ${response?.data?.competitors[1]?.name}`,
    );
  }, [eventId]);

  useEffect(() => {
    getAllMarketData();
  }, [getAllMarketData]);

  useEffect(() => {
    let interval = setInterval(() => {
      getAllMarketData();
    }, 1500);
    getEventName();

    return () => {
      clearInterval(interval);
    };
  }, [getAllMarketData, eventId, getEventName]);

  // const updateState = (newObject) => {
  //   setMarketDataOdds((prevState) => {
  //     return { ...prevState, ...newObject };
  //   });
  // };

  const addToBetSlip = (eventId, bet, betDetails, specifiers) => {
    setBets((prev) => {
      const index = prev.findIndex((item) => item.eventId == parseInt(eventId));
      if (index !== -1) {
        // If eventId already exists, update bet and betDetails
        const updatedBets = [...prev];
        updatedBets[index] = {
          ...updatedBets[index],
          sportId: sId,
          bet: bet,
          betDetails: betDetails,
          eventNames: eventName,
          specifiers: specifiers,
        };
        return updatedBets;
      } else {
        return [
          ...prev,
          {
            eventId: eventId,
            sportId: sId,
            bet: bet,
            betDetails: betDetails,
            eventNames: eventName,
            specifiers: specifiers,
          },
        ];
      }
    });
  };

  useEffect(() => {
    setBets(selectedBet);
  }, [selectedBet]);

  useEffect(() => {
    if (bets.length > 0) {
      dispatch(fetchBetDetailsAction(bets));
    }
  }, [bets, dispatch]);

  const selectBet = (eventId, marketId, outcomeventId, specifiers) => {
    const bet = selectedBet.find(
      (bet) =>
        bet.eventId == parseInt(eventId) &&
        bet.betDetails.id === marketId &&
        bet.bet.id === outcomeventId &&
        bet.specifiers == specifiers,
    );

    if (bet) return true;
    else return false;
  };

  const handleRemoveBet = (eventId) => {
    const updatedBets = selectedBet.filter((item) => item.eventId != eventId);
    dispatch(fetchBetDetailsAction(updatedBets));
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize(); // Check on initial render

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // const handleSlideChange = () => {
  //   // console.log('-----index ', index);
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.slideTo(2);
  //   }
  // };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
        <div className="md:p-5 p-2">
          <div className="h-fit text-black w-full bg-[#b9e6ea]">
            {/* <div className="flex justify-center">
              <span className="text-12 text-gray-900">19 Jan 19:30</span>
            </div> */}
            {/* <div className="flex px-3 justify-between items-center mb-1">
              <div className="flex">
                <img
                  src="/images/bikoicon/cape.png"
                  className="w-10 h-8 mr-1"
                />
                <span className="text-14 text-black">Cape Verde</span>
              </div>
              <div className="flex">
                <span className="text-14 text-black">Mozambique</span>
                <img
                  src="/images/bikoicon/mozambique.png"
                  className="w-10 h-8 ml-1"
                />
              </div>
            </div> */}
            {/* <div className="flex border-t-[1px] border-b-[1px] border-lightgray"> */}
            {/* {TabsName.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={`${
                      step === item.id
                        ? 'border-b-[2px] border-blue   text-gray-900'
                        : ''
                    } px-1 md:px-0 xl:px-3 mx-3  w-fit md:w-56`}
                    onClick={() => setStep(item.id)}
                  >
                    <div className="flex  h-8  md:justify-center items-center">
                      <img src={item.icon} alt="icon" className="w-6 h-4" />
                      <span className="px-2 leading-3 text-12 font-[400]  xxl:text-12">
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })} */}
            {/* {TabsName.map((item) => {
                if (item.title === 'Board' && !isMobile) {
                  return null; // Skip rendering the "Board" tab on non-mobile devices
                }
                return (
                  <div
                    key={item.id}
                    className={`${
                      step == item.title
                        ? 'border-b-[2px] border-blue   text-gray-900'
                        : ''
                    } px-1 md:px-0 xl:px-3 mx-3  w-56`}
                    onClick={() => setStep(item.title)}
                  >
                    <div className="flex flex-1 cursor-pointer h-8 justify-center items-center">
                      <img src={item.icon} alt="icon" className="w-6 h-4" />
                      <span className="px-2 leading-3 md:block hidden text-12 font-[400]  xxl:text-12">
                        {item.title}
                      </span>
                    </div>
                  </div>
                );
              })} */}
            {/* </div> */}
            {/* <div className="flex">
              <div
                className={`w-full  md:w-[50%] bg-[#5c8301] ${
                  isMobile && step == 'Board' ? 'block' : 'md:block hidden'
                } `}
              >
                <Swiper
                  pagination={{
                    type: 'bullets',
                    clickable: true,
                    renderBullet: function (index, className) {
                      return (
                        '<span class="' +
                        className +
                        '" style="background-color: #3F1F63; width:30px; border-radius:2px;margin-top:20px"></span>'
                      );
                    },
                  }}
                  navigation={false}
                  modules={[Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide className="pb-3">
                    <div className="mx-5 w-auto h-44 mb-5  bg-[#b9e6ea] px-2">
                      <div className="">
                        <div className="text-center">
                          <p className="text-gray-900 text-12">
                            WIN PROBABILITY
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-4 border-[#00003c]">
                            <h1 className="text-16 text-[#00003c]">44 %</h1>
                            <span className="text-12 text-[#00003c]">CPV</span>
                          </div>
                          <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                            <h1 className="text-16 text-lightgray">32 %</h1>
                            <span className="text-12 text-lightgray">DRAW</span>
                          </div>
                          <div className="w-[24%] border-b-4 border-red-600">
                            <h1 className="text-16 text-red-600">24 %</h1>
                            <span className="text-12 text-red-600">MOZ</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-center">
                          <p className="text-gray-900 text-12">
                            PREVIOUS MEETINGS
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-2 border-[#00003c]">
                            <h1>2</h1>
                          </div>
                          <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                            <h1>1</h1>
                          </div>
                          <div className="w-[24%] border-b-2 border-red-600">
                            <h1>1</h1>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <img
                              src="/images/bikoicon/cape.png"
                              className="w-4 h-4 mr-1"
                            />
                            <span className="text-gray-900 text-12">WINS</span>
                          </div>
                          <div>
                            <span className="text-gray-900 text-12">DRAW</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-900 text-12">WINS</span>
                            <img
                              src="/images/bikoicon/mozambique.png"
                              className="w-4 h-4 ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="mx-5 h-44 mb-5  bg-[#b9e6ea] px-2">
                      <div className="">
                        <div className="text-center">
                          <p className="text-gray-900 text-12">
                            WIN PROBABILITY
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-4 border-[#00003c]">
                            <h1 className="text-16 text-[#00003c]">44 %</h1>
                            <span className="text-12 text-[#00003c]">CPV</span>
                          </div>
                          <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                            <h1 className="text-16 text-lightgray">32 %</h1>
                            <span className="text-12 text-lightgray">DRAW</span>
                          </div>
                          <div className="w-[24%] border-b-4 border-red-600">
                            <h1 className="text-16 text-red-600">24 %</h1>
                            <span className="text-12 text-red-600">MOZ</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-center">
                          <p className="text-gray-900 text-12">
                            PREVIOUS MEETINGS
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-2 border-[#00003c]">
                            <h1>2</h1>
                          </div>
                          <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                            <h1>1</h1>
                          </div>
                          <div className="w-[24%] border-b-2 border-red-600">
                            <h1>1</h1>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <img
                              src="/images/bikoicon/cape.png"
                              className="w-4 h-4 mr-1"
                            />
                            <span className="text-gray-900 text-12">WINS</span>
                          </div>
                          <div>
                            <span className="text-gray-900 text-12">DRAW</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-900 text-12">WINS</span>
                            <img
                              src="/images/bikoicon/mozambique.png"
                              className="w-4 h-4 ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              {step == 'Head to head' && (
                <div className="flex-1 md:block">
                  <div className="px-3">
                    <div className="flex items-center justify-end border-b-[1px] border-lightgray">
                      <span className="text-14 cursor-pointer text-lightgray">
                        {reactIcons.arrowleft}
                      </span>
                      <span className="text-12">1/3</span>
                      <span
                        onClick={() => handleSlideChange()}
                        className="text-14 text-lightgray cursor-pointer"
                      >
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  </div>
                  <Swiper
                    ref={swiperRef}
                    pagination={{
                      type: 'bullets',
                      clickable: true,
                    }}
                    navigation={false}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      <div className="m-5 ">
                        <div className="">
                          <div className="text-center">
                            <p className="text-gray-900 text-14">
                              WIN PROBABILITY
                            </p>
                          </div>
                          <div className="flex">
                            <div className="w-[44%] border-b-4 border-[#00003c]">
                              <h1>44 %</h1>
                              <span className="text-12">CPV</span>
                            </div>
                            <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                              <h1>32 %</h1>
                              <span className="text-12">DRAW</span>
                            </div>
                            <div className="w-[24%] border-b-4 border-red-600">
                              <h1>24 %</h1>
                              <span className="text-12">MOZ</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-center">
                            <p className="text-gray-900 text-14">
                              PREVIOUS MEETINGS
                            </p>
                          </div>
                          <div className="flex">
                            <div className="w-[44%] border-b-2 border-[#00003c]">
                              <h1>2</h1>
                            </div>
                            <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                              <h1>1</h1>
                            </div>
                            <div className="w-[24%] border-b-2 border-red-600">
                              <h1>1</h1>
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <img
                                src="/images/bikoicon/cape.png"
                                className="w-4 h-4 mr-1"
                              />
                              <span className="text-gray-900 text-12">
                                WINS
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-900 text-12">
                                DRAW
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-900 text-12">
                                WINS
                              </span>
                              <img
                                src="/images/bikoicon/mozambique.png"
                                className="w-4 h-4 ml-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="text-black">2 point</div>
                    </SwiperSlide>
                  </Swiper>
                  <div className="m-5">
                    <div className="">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">WIN PROBABILITY</p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-4 border-[#00003c]">
                          <h1>44 %</h1>
                          <span className="text-12">CPV</span>
                        </div>
                        <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                          <h1>32 %</h1>
                          <span className="text-12">DRAW</span>
                        </div>
                        <div className="w-[24%] border-b-4 border-red-600">
                          <h1>24 %</h1>
                          <span className="text-12">MOZ</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">
                          PREVIOUS MEETINGS
                        </p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-2 border-[#00003c]">
                          <h1>2</h1>
                        </div>
                        <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                          <h1>1</h1>
                        </div>
                        <div className="w-[24%] border-b-2 border-red-600">
                          <h1>1</h1>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            src="/images/bikoicon/cape.png"
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-gray-900 text-12">WINS</span>
                        </div>
                        <div>
                          <span className="text-gray-900 text-12">DRAW</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 text-12">WINS</span>
                          <img
                            src="/images/bikoicon/mozambique.png"
                            className="w-4 h-4 ml-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step == 'Standing' && (
                <div className="flex-1 md:block">
                  <div className="px-3">
                    <div className="flex items-center justify-end border-b-[1px] border-lightgray">
                      <span className="text-14 cursor-pointer text-lightgray">
                        {reactIcons.arrowleft}
                      </span>
                      <span className="text-12">1/3</span>
                      <span className="text-14 text-lightgray cursor-pointer">
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-12">STANDINGS</span>
                  </div>
                  <hr></hr>
                  <div>
                    <p className="text-12">SERIE A</p>
                    <div className="flex border-[1px] mx-2 border-gray-500 w-48">
                      {marketTab.map((item) => {
                        return (
                          <div
                            key={item.id}
                            className={`${
                              tab == item.title
                                ? 'bg-gray-600  text-gray-900'
                                : ''
                            } px-1 md:px-0 xl:px-3   w-16`}
                            onClick={() => setTab(item.title)}
                          >
                            <div className="flex flex-1 cursor-pointer h-8 justify-center items-center">
                              <span className="px-2 leading-3 text-black   md:block hidden text-12 font-[400]  xxl:text-12">
                                {item.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="m-5">
                      <div className="">
                        <div className="text-center">
                          <p className="text-gray-900 text-14">
                            WIN PROBABILITY
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-4 border-[#00003c]">
                            <h1>44 %</h1>
                            <span className="text-12">CPV</span>
                          </div>
                          <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                            <h1>32 %</h1>
                            <span className="text-12">DRAW</span>
                          </div>
                          <div className="w-[24%] border-b-4 border-red-600">
                            <h1>24 %</h1>
                            <span className="text-12">MOZ</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-center">
                          <p className="text-gray-900 text-14">
                            PREVIOUS MEETINGS
                          </p>
                        </div>
                        <div className="flex">
                          <div className="w-[44%] border-b-2 border-[#00003c]">
                            <h1>2</h1>
                          </div>
                          <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                            <h1>1</h1>
                          </div>
                          <div className="w-[24%] border-b-2 border-red-600">
                            <h1>1</h1>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <img
                              src="/images/bikoicon/cape.png"
                              className="w-4 h-4 mr-1"
                            />
                            <span className="text-gray-900 text-12">WINS</span>
                          </div>
                          <div>
                            <span className="text-gray-900 text-12">DRAW</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-900 text-12">WINS</span>
                            <img
                              src="/images/bikoicon/mozambique.png"
                              className="w-4 h-4 ml-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {tab == 'OVERALL' && (
                      <div className="w-full">
                        <table className="text-12 border-[1px] w-full border-black">
                          <thead>
                            <th className="w-8 text-10">POS</th>
                            <th className="w-28 flex justify-between">
                              <sapn className="text-10">TEAM</sapn>
                              <span className="text-10">P</span>
                            </th>
                            <th className="flex justify-between">
                              <sapn className="text-10">W</sapn>
                              <span className="text-10">P</span>
                              <span className="text-10">L</span>
                            </th>
                            <th>POS</th>
                            <th>POS</th>
                          </thead>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {step == 'Linups' && (
                <div className="flex-1 md:block">
                  <div className="px-3">
                    <div className="flex items-center justify-end border-b-[1px] border-lightgray">
                      <span className="text-14 cursor-pointer text-lightgray">
                        {reactIcons.arrowleft}
                      </span>
                      <span className="text-12">1/3</span>
                      <span className="text-14 text-lightgray cursor-pointer">
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  </div>
                  <div className="m-5">
                    <div className="">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">WIN PROBABILITY</p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-4 border-[#00003c]">
                          <h1>44 %</h1>
                          <span className="text-12">CPV</span>
                        </div>
                        <div className="w-[32%] mx-3 border-b-4 border-lightgray">
                          <h1>32 %</h1>
                          <span className="text-12">DRAW</span>
                        </div>
                        <div className="w-[24%] border-b-4 border-red-600">
                          <h1>24 %</h1>
                          <span className="text-12">MOZ</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-center">
                        <p className="text-gray-900 text-14">
                          PREVIOUS MEETINGS
                        </p>
                      </div>
                      <div className="flex">
                        <div className="w-[44%] border-b-2 border-[#00003c]">
                          <h1>2</h1>
                        </div>
                        <div className="w-[32%] mx-3 border-b-2 border-lightgray">
                          <h1>1</h1>
                        </div>
                        <div className="w-[24%] border-b-2 border-red-600">
                          <h1>1</h1>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center">
                          <img
                            src="/images/bikoicon/cape.png"
                            className="w-4 h-4 mr-1"
                          />
                          <span className="text-gray-900 text-12">WINS</span>
                        </div>
                        <div>
                          <span className="text-gray-900 text-12">DRAW</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-900 text-12">WINS</span>
                          <img
                            src="/images/bikoicon/mozambique.png"
                            className="w-4 h-4 ml-1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div> */}
          </div>
          <div>
            <div className="bg-yellow py-1 rounded-md mt-5 px-3">
              <h1 className="text-white text-14 font-[600]">
                {eventName} - ALL MARKETS
              </h1>
            </div>
          </div>
          <div>
            {isLoading && loadNum == 1 && (
              <div>
                <p className="text-black">Loading.....</p>
                <Loading />
              </div>
            )}
            {mergedData?.length > 0 &&
              mergedData?.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="md:my-3 my-1">
                      <div className="text-black">
                        {item.outcomes.length > 0 && (
                          <h1 className="text-12 md:text-14 font-[500] py-2">
                            {item.name}
                          </h1>
                        )}
                      </div>
                      <div className="grid grid-cols-12">
                        {item.outcomes.map((innerItem, innerIndex) => {
                          return (
                            <div
                              key={innerIndex}
                              className={`flex mb-2 ${
                                item.outcomes.length % 2 === 0
                                  ? 'col-span-6'
                                  : 'col-span-4'
                              }`}
                            >
                              <div className="flex-1 mr-2">
                                <button
                                  disabled={innerItem.active ? false : true}
                                  onClick={() => {
                                    if (
                                      selectBet(
                                        eventId,
                                        item.id,
                                        innerItem.id,
                                        innerItem.market.specifiers
                                          ? innerItem?.market.specifiers.join(
                                              '|',
                                            )
                                          : null,
                                      )
                                    ) {
                                      handleRemoveBet(eventId, sId);
                                    } else {
                                      addToBetSlip(
                                        eventId,
                                        innerItem,
                                        item,
                                        innerItem.market.specifiers
                                          ? innerItem?.market?.specifiers?.join(
                                              '|',
                                            )
                                          : null,
                                      );
                                    }
                                  }}
                                  className={`${
                                    selectBet(
                                      eventId,
                                      item.id,
                                      innerItem.id,
                                      innerItem.market.specifiers
                                        ? innerItem?.market?.specifiers.join(
                                            '|',
                                          )
                                        : null,
                                    )
                                      ? 'bg-green text-white'
                                      : ''
                                  } bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-10 md:text-12 rounded-md w-full py-1 md:py-2 px-3`}
                                >
                                  <span className="text-center font-[700] leading-3 flex-1">
                                    {innerItem.name}
                                  </span>
                                  <span className="text-[700]">
                                    {innerItem.active == 1 &&
                                    innerItem?.market?.status == 1 ? (
                                      innerItem.odds
                                    ) : (
                                      <span>{reactIcons.lock}</span>
                                    )}
                                  </span>
                                </button>
                              </div>
                              {/* <div className="flex-1 mr-2">
                              <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                                <span className="text-center font-[700] flex-1">
                                  Draw
                                </span>
                                <span className="font-[700]">2.09</span>
                              </button>
                            </div>
                            <div className="flex-1 mr-2">
                              <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                                <span className="text-center font-[700] flex-1">
                                  Mozambique
                                </span>
                                <span className="font-[700]">2.09</span>
                              </button>
                            </div> */}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* <div className="my-3">
                      <div className="text-black">
                        <h1 className="text-14 font-[500] py-2">
                          DOUBLE CHANCE
                        </h1>
                      </div>
                      <div className="flex">
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Cape Varde
                            </span>
                            <span className="font-[700]">6.53</span>
                          </button>
                        </div>
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Draw
                            </span>
                            <span className="font-[700]">2.09</span>
                          </button>
                        </div>
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] flex-1">
                              Mozambique
                            </span>
                            <span className="font-[700]">2.09</span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                    {/* <div className="my-3">
                      <div className="text-black">
                        <h1 className="text-14 font-[500] py-2">DRAW NO BET</h1>
                      </div>
                      <div className="flex">
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-[700] font-roboto flex-1">
                              Cape Varde
                            </span>
                            <span className="font-[700]">6.53</span>
                          </button>
                        </div>
                
                        <div className="flex-1 mr-2">
                          <button className="bg-[#EAEAEA] flex justify-between  items-center border-[#A3A3A3] border-[1px] text-black text-12 rounded-md w-full py-2 px-3">
                            <span className="text-center font-roboto flex-1 font-[700]">
                              Mozambique
                            </span>
                            <span className="font-[700] font-roboto">2.09</span>
                          </button>
                        </div>
                      </div>
                    </div> */}
                  </div>
                );
              })}
            {/* {mergedData?.length == 0 && !isLoading && (
              <div className="text-center mt-5 text-black">
                <span>No markets found</span>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className="col-span-4 2xl:col-span-3 pt-3 md:block hidden border-l-[1px] px-3 border-gray-700">
        {/* <RightSideSection /> */}
        {bets?.length > 0 ? (
          <BetWallet selectedBet={selectedBet} />
        ) : (
          <Betslip selectedBet={selectedBet} />
        )}
        <CompanyContact />
        <CustomerCareContact />
        <TalkToUs />
      </div>
    </div>
  );
}

export default SigleBetDetails;
