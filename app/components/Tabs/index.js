import React from 'react';
import PropTypes from 'prop-types';

const TabsName = [
  {
    tabName: 'Soccer',
    id: 1,
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
  {
    tabName: 'BasketBall',
    id: 2,
    icon: '/images/bikoicon/sports_and_outdoors.png',
    active_icon: '/images/bikoicon/basketballwhite.png',
  },
  {
    tabName: 'Boxing',
    id: 3,
    icon: '/images/bikoicon/boxing.png',
    active_icon: '/images/bikoicon/boxingwhite.png',
  },
  {
    tabName: 'Rugby',
    id: 4,
    icon: '/images/bikoicon/rugby.png',
    active_icon: '/images/bikoicon/rugbywhite.png',
  },
  {
    tabName: 'Cricket',
    id: 5,
    icon: '/images/bikoicon/cricket.png',
    active_icon: '/images/bikoicon/cricketwhite.png',
  },
  {
    tabName: 'Other',
    id: 6,
    icon: '/images/bikoicon/other.png',
    active_icon: '/images/bikoicon/sports_soccer.png',
  },
];

function Tabs({ step, setStep }) {
  return (
    <div className="border-[1px] border-bluewhale px-5 md:px-0 md:flex bg-white w-full rounded-lg cursor-pointer  md:h-14 xxl:h-16">
      {TabsName.map((item) => {
        return (
          <div
            key={item.id}
            className={`${
              step === item.id
                ? 'bg-gradient-color-1 text-white'
                : 'bg-white text-black'
            } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-fit rounded-lg`}
            onClick={() => setStep(item.id)}
          >
            <div className="flex  h-12  md:justify-center items-center">
              <img
                src={step === item.id ? item.active_icon : item.icon}
                alt="profile_icon"
              />
              <span className="px-2 text-14 xxl:text-16">{item.tabName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
};

export default Tabs;
