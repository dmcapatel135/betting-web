import React from 'react';

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-astronautblue via-mutedblue to-gainsboro">
      <div className="grid grid-cols-2">
        <div className="flex px-10 col-span-full md:col-span-1  md:justify-center items-center">
          <div className="text-[30px] py-5 md:py-0 md:text-[36px] xl:text-[52px] font-bold">
            <h1 className="py-2 md:py-5">Navigate the</h1>
            <h1 className="py-2 md:py-5">Future of Finance</h1>
            <h1 className="py-2 md:py-5">
              with <span className="text-yellow">Crypto CEX</span>
            </h1>
          </div>
        </div>
        <div className="hidden md:block">
          <img src="/images/hero_section_img.png" alt="hero" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
