import { images } from '@utils/images';
import React from 'react';

function HeroSection() {
  return (
    <div className="mb-5">
      <img className="w-full" src={images.bannerImg} />
    </div>
  );
}

export default HeroSection;
