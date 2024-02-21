import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MyContext } from '@components/MyContext/MyContext';
import { useParams } from 'react-router-dom';

function Tabs({ popularSports }) {
  const { sId } = useParams();
  const { setSportId } = useContext(MyContext);

  return (
    <div className="border-[1px] border-bluewhale mt-3 px-5 md:px-0 md:flex bg-white w-full rounded-lg cursor-pointer  md:h-14 xxl:h-16">
      {popularSports?.map((item) => {
        return (
          <div
            key={item.id}
            className={`${
              sId == item.id
                ? 'bg-gradient-color-1 text-white'
                : 'bg-white text-black '
            } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-fit rounded-lg`}
            onClick={() => {
              setSportId(item.id);
            }}
          >
            <div className="flex  h-12  md:justify-center items-center">
              <img
                src={sId == item.id ? item.active_icon : item.icon}
                alt="profile_icon"
                className="w-6 h-6"
              />
              <span className="px-2 text-14 lg:text-[15px] xxl:text-16">
                {item.name == 'Basketball' ? 'BasketBall' : item.name}
              </span>
            </div>
          </div>
        );
      })}
      {/* <div
        className={`${
          !step ? 'bg-gradient-color-1 text-white ' : 'bg-white text-black'
        } px-1 xl:px-3 md:mx-3 my-1 w-full md:w-fit rounded-lg relative`}
        onClick={() => setStep(null)}
      >
        <div className="flex  h-12  md:justify-center items-center">
          <span className="px-2 text-14 xxl:text-16">{'Other'}</span>
        </div>
        {!step && (
          <div className="absolute bg-white w-[690px]  -right-3 border-[1px] border-lightgray rounded-md  h-fit z-50">
            <div className="grid grid-cols-12 p-3">
              {allSports?.slice(currentIndex, nextIndex)?.map((item) => {
                return (
                  <div className="col-span-4" key={item.id}>
                    <div className="py-2">
                      <span className="text-black">{item.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end m-5">
              <div className="flex">
                <button
                  onClick={() => {
                    if (currentIndex > 15) {
                      setNextIndex(nextIndex);
                      setCurrentIndex(nextIndex - 15);
                    }
                    console.log('----working', currentIndex, nextIndex);
                  }}
                  className="h-8 w-12 mx-2 px-2 bg-blue rounded-sm"
                >
                  {' '}
                  Prev
                </button>
                <button
                  onClick={() => {
                    if (allSports?.length > nextIndex) {
                      setCurrentIndex(nextIndex);
                      setNextIndex(nextIndex + 15);
                    }
                  }}
                  className="h-8 w-12 px-2 bg-blue rounded-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}

Tabs.propTypes = {
  sportId: PropTypes.number,
  setSportId: PropTypes.number,
  allSports: PropTypes.array,
  popularSports: PropTypes.array,
};

export default Tabs;
