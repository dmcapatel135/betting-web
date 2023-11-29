import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
const Slider = () => {
  return (
    <div className="flex items-center relative gap-2 sm:pl-2 xs:px-3 sm:px-5">
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1.3,
          },
          992: {
            slidesPerView: 2.5,
          },
          1280: {
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 3,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: '.dash-right',
          prevEl: '.dash-left',
        }}
        spaceBetween={30}
        loop
        className="mySwiper"
      >
        {Array(20)
          .fill(4)
          .map((_item, index) => (
            <SwiperSlide className="" key={index}>
              <div className="lg:w-[330px] ">
                <div className="h-[212px]  text-gray-500 outline-none border-[1px] bg-lightgray">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    initial={{ scale: 1 }}
                    transition={{
                      duration: 0.8,
                      delayChildren: 0.5,
                    }}
                    // src="/images/icons/facebook.png"
                    className="center-img"
                    alt=""
                  />
                </div>
                <div className="bg-gradient-to-b from-[#7cbbdd] via-[#0e4f77] to-[#00586A] py-6 px-5  card-clip">
                  <h4 className="heading-4 text-white font-bold line-clamp-2">
                    Animoca Brands Partners with Amazon and Polygon for Web3
                    Development Accelerator Program
                  </h4>
                  <div className="flex justify-around pt-5 text-10 text-white">
                    <span>26th November 2022</span>
                    <span>James K Robbin</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <button className="dash-right bg-green disabled:opacity-50 disabled:pointer-events-none w-10 h-10 sm:w-16 sm:h-16 z-10 ay-center right-6 md:right-20 flex-center rounded-full bg-gradient2 p-4">
        <img src="/images/icons/left_arrow.png" className="" alt="" />
      </button>
    </div>
  );
};

export default Slider;
