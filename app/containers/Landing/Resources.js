import React from 'react';
import Slider from '../../components/Slider/Slider';

function Resources() {
  return (
    <div className="bg-white pl-3 md:pl-10 py-10">
      <div className="flex items-center text-black">
        <h1 className="text-[28px] md:text-[40px] font-extrabold">Resources</h1>
        <div className="bg-bluewhale h-12 md:h-16 rounded-l-[32px] ml-5 w-full text-end flex items-center justify-end text-20 text-white">
          <p className="px-2 font-extrabold">View All</p>
        </div>
      </div>
      <div className="mt-10 mx-5">
        <Slider />
      </div>
    </div>
  );
}

export default Resources;
