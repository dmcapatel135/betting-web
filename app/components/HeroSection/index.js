import { images } from '@utils/images';
import React from 'react';

function HeroSection() {
  return (
    <div className="px-5 mb-5">
      <img src={images.bannerImg} />
    </div>
  );
}

export default HeroSection;
