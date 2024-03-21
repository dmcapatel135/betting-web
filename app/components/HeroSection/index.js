import { images } from '@utils/images';
import React from 'react';

function HeroSection() {
  return (
    <div className="mb-5 rounded-lg overflow-hidden">
      <img className="w-full" src={images.bannerImg} />
    </div>
  );
}

export default HeroSection;
